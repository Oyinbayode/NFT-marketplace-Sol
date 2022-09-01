const { ethers, network } = require("hardhat");
const fs = require("fs");

const frontEndContractsFile =
  "../nft-marketplace-frontend/constants/networkMapping.json";
const frontEndAbiLocation = "../nft-marketplace-frontend/constants/";

module.exports = async function () {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating Front End");
    await updateContractAddresses();
    await updateAbi();
  }
};

async function updateAbi() {
  const nftMarketplace = await ethers.getContract("NftMarketplace");

  fs.writeFileSync(
    `${frontEndAbiLocation}NftMarketplace.json`,
    nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
  );

  const basicNft = await ethers.getContract("BasicNFT");
  fs.writeFileSync(
    `${frontEndAbiLocation}BasicNft.json`,
    basicNft.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const nftMarketplace = await ethers.getContract("NftMarketplace");
  let chainId = network.config.chainId;

  console.log(`Updating Front End with Chain ID: ${chainId}`);
  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractsFile, "utf-8")
  );
  if (network.name == "localhost") {
    chainId = 31337;
    if (chainId in contractAddresses) {
      if (!contractAddresses[chainId]["NftMarketplace"]) {
        contractAddresses[chainId]["NftMarketplace"].push(
          nftMarketplace.address
        );
      }
    } else {
      contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] };
    }
  } else {
    if (chainId in contractAddresses) {
      if (!contractAddresses[chainId]["NftMarketplace"]) {
        contractAddresses[chainId]["NftMarketplace"].push(
          nftMarketplace.address
        );
      }
    } else {
      contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] };
    }
  }

  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}

module.exports.tags = ["all", "frontend"];
