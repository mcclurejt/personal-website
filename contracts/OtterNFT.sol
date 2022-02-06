// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
// We need to import the helper functions from the contract that we copy/pasted.
import {Base64} from "./libraries/Base64.sol";
import "./OtterSVGData.sol";

contract OtterNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    OtterSVGData svg;

    event NewOtterMinted(address sender, uint256 tokenId);

    constructor(address svgContractAddress) ERC721("Otters", "OTTER") {
        svg = OtterSVGData(svgContractAddress);
        console.log("This is my NFT contract. Whoa!");
    }

    function makeAnOtterNFT() public {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        string memory metadata = svg.generateMetadata(newItemId);

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", metadata)
        );

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        console.log(finalTokenUri);

        emit NewOtterMinted(msg.sender, newItemId);
    }
}
