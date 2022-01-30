//https://rinkeby.infura.io/v3/b7a83bda7c7e42459b78f75c280dacf3

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "the new words configured for the polygon account by meta mask extn",
  "https://rinkeby.infura.io/v3/web3urlcreatedbyinfura"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "10000000" });
  console.log(compiledFactory.abi);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
