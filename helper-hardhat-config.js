const networkConfig = {
  31337: {
    name: "localhost",
    chainId: 31337,
  },
  5: {
    name: "goerli",
    chainId: 5,
  },
};

const developmentChains = ["localhost", "goerli"];

module.exports = { networkConfig, developmentChains };
