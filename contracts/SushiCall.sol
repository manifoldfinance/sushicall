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

    function gasLimit() external view returns (uint256) {
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
}
