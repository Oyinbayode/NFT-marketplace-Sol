const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const chainID = network.config.chainId;

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("------------------------------------------------------");
  const args = [];

  const NftMarketplace = await deploy("NftMarketplace", {
    from: deployer,
    args,
    logs: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`NftMarketplace Deployed At: ${NftMarketplace.address}`);
  if (chainID === 5 && process.env.ETHERSCAN_API_KEY) {
    log("Verifying NftMarketplace...");
    await verify(NftMarketplace.address, args);
  }
};

module.exports.tags = ["all", "NftMarketplace", "main"];
