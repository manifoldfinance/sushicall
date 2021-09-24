/// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

/**
* @contract sushiTokenLoader
* @since v0.0.0
* @version v0.0.0
* @security <contact>
*/


/**
@summary Sushi Token Loader 

@note Returns information about the ERC20 tokens belonging to the pair on the corresponding position parameters
@param [2i] & [2i + 1]

@note Returned value is an array of structs
@returns {address} address: token contract address
@returns {string} name: name of the token, when not present defaults to an empty string
@returns {string} symbol: symbol of the token, when not present defaults to an empty string
@returns {uint8} decimals: number of decimals in ERC20, when not present is set to 0 (always the case for ERC721)
@returns {uint256} totalSupply: the total token supply, when not present defaults to 0
*/

abstract contract SushiTarget {
    function symbol() public virtual view returns (string memory);

    function token0() public virtual view returns (address);

    function token1() public virtual view returns (address);
}

// target contract interface - selection of used ERC20
abstract contract Target {
    function name() public virtual view returns (string memory);

    function symbol() public virtual view returns (string memory);

    function decimals() public virtual view returns (uint8);

    function totalSupply() public virtual view returns (uint256);
}



contract sushiTokenLoader {

    struct TokenInfo {
        address addr;
        string name;
        string symbol;
        uint8 decimals;
        uint256 totalSupply;
    }

    function loadTokens(address[] calldata tokens) external view returns (TokenInfo[] memory tokenInfo) {
        tokenInfo = new TokenInfo[](2 * tokens.length);

        for (uint256 i = 0; i < tokens.length; i++) {
            SushiTarget sushiToken = SushiTarget(tokens[i]);
            (bool success, bytes memory returnData) = tokens[i].staticcall(abi.encodeWithSelector(sushiToken.symbol.selector));

            // keccak256(bytes("SLP")) = 0xe0136b3661826a483734248681e4f59ae66bc6065ceb43fdd469ecb22c21d745
            if (success && returnData.length != 0 && keccak256(abi.decode(returnData, (bytes))) == 0xe0136b3661826a483734248681e4f59ae66bc6065ceb43fdd469ecb22c21d745) {
                address token0Address = sushiToken.token0();
                address token1Address = sushiToken.token1();
                Target token0 = Target(token0Address);
                Target token1 = Target(token1Address);

                tokenInfo[2 * i] = TokenInfo(token0Address, token0.name(), token0.symbol(), token0.decimals(), token0.totalSupply());
                tokenInfo[2 * i + 1] = TokenInfo(token1Address, token1.name(), token1.symbol(), token1.decimals(), token1.totalSupply());
            }
        }

        return tokenInfo;
    }

}
