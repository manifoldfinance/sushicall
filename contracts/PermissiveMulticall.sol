pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;


// SPDX-License-Identifier: GPL-3.0-or-later

/// @title Permissive multicall
contract PermissiveMulticall {
    struct Call {
        address target;
        bytes callData;
    }

    struct CallOutcome {
        bool success;
        bytes data;
    }

    /// @dev Performs multiple calls in the same operation.
    ///      If one of the calls in the list fails, everything does,
    ///      and the operation is reverted. Kept to preserve
    ///      compatibility with Multicall v1.
    /// @param calls An array specifying the required data to perform calls.
    /// @return blockNumber The current block number
    /// @return returnData A bytes array containing each of the performed calls return data.
    function aggregate(Call[] memory calls)
        public
        returns (uint256 blockNumber, bytes[] memory returnData)
    {
        blockNumber = block.number;
        returnData = new bytes[](calls.length);
        for (uint256 i = 0; i < calls.length; i++) {
            (bool success, bytes memory ret) = calls[i].target.call(
                calls[i].callData
            );
            require(success, "CALL_FAILED");
            returnData[i] = ret;
        }
    }

    /// @dev Performs multiple calls in the same operation.
    ///      If one of the calls in the list fails, the `success`
    ///      field in the returned struct array is set to false, and
    ///      the operation continues to the next call in the array.
    /// @param calls An array specifying the required data to perform calls.
    /// @return blockNumber The current block number
    /// @return callOutcomes A `CallOutcome` array containing each of the performed calls return
    ///         data and success specifier.
    function aggregateWithPermissiveness(Call[] memory calls)
        public
        returns (uint256 blockNumber, CallOutcome[] memory callOutcomes)
    {
        blockNumber = block.number;
        callOutcomes = new CallOutcome[](calls.length);
        for (uint256 i = 0; i < calls.length; i++) {
            Call memory call = calls[i];
            (bool success, bytes memory returnData) = call.target.call(
                call.callData
            );
            callOutcomes[i] = CallOutcome({success: success, data: returnData});
        }
    }
}
