/// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.7;
pragma abicoder v2;

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░//

// @function getBytes  //
function getBytes(
    uint256 gasLimit,
    uint256 sizeLimit,
    address addr,
    bytes memory data
) view returns (uint256 status, bytes memory result) {
    assembly {
        // @param Allocate a new slot for the output //
        result := mload(0x40)
        // @note Initialize the output as length 0 (in case things go wrong) //
        mstore(result, 0)
        mstore(0x40, add(result, 32))
        // @dev Call the target address with the data, limiting gas usage //
        status := staticcall(gasLimit, addr, add(data, 32), mload(data), 0, 0)
        // @return returns or revert is a reasonable length //
        if lt(returndatasize(), sizeLimit) {
            // @dev Allocate enough space to store the ceil_32(len_32(result) + result) //
            mstore(
                0x40,
                add(
                    result,
                    and(add(add(returndatasize(), 0x20), 0x1f), not(0x1f))
                )
            )
            // @note Place the length of the result value into the output //
            mstore(result, returndatasize())
            // @note Copy the result value into the output //
            returndatacopy(add(result, 32), 0, returndatasize())
        }
    }
}

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░//

contract SushiCall {
    struct Call {
        address target;
        uint256 gasLimit;
        bytes callData;
    }

    struct Result {
        bool success;
        uint256 gasUsed;
        bytes returnData;
    }

  struct Output {
      bool success;
      bytes data;
    }

    //░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░//

    // @function getCurrentBlockTimestamp  //
    function getCurrentBlockTimestamp()
        public
        view
        returns (uint256 timestamp)
    {
        timestamp = block.timestamp;
    }

    // @function getEthBalance  //
    function getEthBalance(address addr) public view returns (uint256 balance) {
        balance = addr.balance;
    }

    function sushicall(Call[] memory calls)
        public
        returns (uint256 blockNumber, Result[] memory returnData)
    {
        blockNumber = block.number;
        returnData = new Result[](calls.length);
        for (uint256 i = 0; i < calls.length; i++) {
            (address target, uint256 gasLimit, bytes memory callData) = (
                calls[i].target,
                calls[i].gasLimit,
                calls[i].callData
            );

            uint256 gasLeftBefore = gasleft();

            (bool success, bytes memory ret) = target.call{ gas: gasLimit }(
                callData
            );
            uint256 gasUsed = gasLeftBefore - gasleft();
            returnData[i] = Result(success, gasUsed, ret);
        }
    }

    //░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░//
    // @note this is confusing with `gasLimit` on line 78 
    function gaslimit() external view returns (uint256) {
        return block.gaslimit;
    }

    function gasLeft() external view returns (uint256) {
        return gasleft();
    }

    function gasBase() public view returns (uint256 ret) {
        assembly {
            ret := basefee()
        }
    }


  /**
   * @notice Get the Ether balance for all addresses specified
   * @param addresses The addresses to get the Ether balance for
   * @return results The Ether balance for all addresses in the same order as specified
   */
  function etherBalances(address[] calldata addresses) external view returns (Output[] memory results) {
    results = new Output[](addresses.length);

    for (uint256 i = 0; i < addresses.length; i++) {
      results[i] = Output(true, abi.encode(addresses[i].balance));
    }
  }

  /**
   * @notice Get the ERC-20 token balance of `token` for all addresses specified
   * @dev This does not check if the `token` address specified is actually an ERC-20 token
   * @param addresses The addresses to get the token balance for
   * @param token The address of the ERC-20 token contract
   * @return results The token balance for all addresses in the same order as specified
   */
  function tokenBalances(address[] calldata addresses, address token) external view returns (Output[] memory results) {
    results = new Output[](addresses.length);

    for (uint256 i = 0; i < addresses.length; i++) {
      bytes memory data = abi.encodeWithSignature("balanceOf(address)", addresses[i]);
      results[i] = staticCall(token, data, 20000);
    }
  }

  /**
   * @notice Get the ERC-20 token balance from multiple contracts for a single owner
   * @param owner The address of the token owner
   * @param contracts The addresses of the ERC-20 token contracts
   * @return results The token balances in the same order as the addresses specified
   */
  function tokensBalance(address owner, address[] calldata contracts) external view returns (Output[] memory results) {
    results = new Output[](contracts.length);

    bytes memory data = abi.encodeWithSignature("balanceOf(address)", owner);
    for (uint256 i = 0; i < contracts.length; i++) {
      results[i] = staticCall(contracts[i], data, 20000);
    }
  }

  /**
   * @notice Call multiple contracts with the provided arbitrary data
   * @param contracts The contracts to call
   * @param data The data to call the contracts with
   * @return results The raw result of the contract calls
   */
  function call(address[] calldata contracts, bytes[] calldata data) external view returns (Output[] memory results) {
    return call(contracts, data, gasleft());
  }

  /**
   * @notice Call multiple contracts with the provided arbitrary data
   * @param contracts The contracts to call
   * @param data The data to call the contracts with
   * @param gas The amount of gas to call the contracts with
   * @return results The raw result of the contract calls
   */
  function call(
    address[] calldata contracts,
    bytes[] calldata data,
    uint256 gas
  ) public view returns (Output[] memory results) {
    require(contracts.length == data.length, "Length must be equal");
    results = new Output[](contracts.length);

    for (uint256 i = 0; i < contracts.length; i++) {
      results[i] = staticCall(contracts[i], data[i], gas);
    }
  }

  /**
   * @notice Static call a contract with the provided data
   * @param target The address of the contract to call
   * @param data The data to call the contract with
   * @param gas The amount of gas to forward to the call
   * @return result The result of the contract call
   */
  function staticCall(
    address target,
    bytes memory data,
    uint256 gas
  ) private view returns (Output memory) {
    uint256 size = codeSize(target);

    if (size > 0) {
      (bool success, bytes memory result) = target.staticcall{ gas: gas }(data);
      if (success) {
        return Output(success, result);
      }
    }

    return Output(false, "");
  }

  /**
   * @notice Get code size of address
   * @param _address The address to get code size from
   * @return size Unsigned 256-bits integer
   */
  function codeSize(address _address) private view returns (uint256 size) {
    // solhint-disable-next-line no-inline-assembly
    assembly {
      size := extcodesize(_address)
    }
  }
}
