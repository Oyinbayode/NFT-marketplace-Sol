const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const chainID = network.config.chainId;

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("------------------------------------------------------");
  const args = [];

  const BasicNft = await deploy("BasicNFT", {
    from: deployer,
    args,
    logs: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`BasicNft Deployed At: ${BasicNft.address}`);
  if (chainID === 5 && process.env.ETHERSCAN_API_KEY) {
    log("Verifying BasicNft...");
    await verify(BasicNft.address, args);
  }
};

module.exports.tags = ["all", "BasicNft", "main"];
