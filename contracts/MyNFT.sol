// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KittyCards is ERC721("KittyCards", "KIT"), Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint256 public supply = 160;
    uint256 public nftPrice = 700000000000000;
    mapping(address => bool) public minted;
    string public baseURI = "https://api.coolcatsnft.com/cat/";

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function updateURI(string memory _URI) external onlyOwner {
        baseURI = _URI;
    }

    function mintNFT() external payable nonReentrant {
        require(msg.value == nftPrice, "Incorrect payment amount");
        (bool sent,) = owner().call{value: msg.value}("");
        require(sent, "Unable to pay ethers to owner");
        require(minted[msg.sender] == false, "Minted already");
        _tokenIdCounter.increment();
        uint256 currentId = _tokenIdCounter.current();
        require(currentId <= supply, "Total supply reached");
        minted[msg.sender] = true;
        _safeMint(msg.sender, currentId);
    }
}