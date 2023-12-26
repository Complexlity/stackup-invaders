import { ethers, getDefaultProvider, Wallet } from "../../libs/ethers-5.6.2.esm.min.js";

window.provider = window.passport.connectEvm();


const connectPassport = async function () {
  window.accounts = await window.provider.request({
    method: "eth_requestAccounts",
  });
  console.log(window.accounts);
  if (window.accounts) {
    await getUserInfo();
  }

};

window.connectPassport = connectPassport

const config = {
  baseConfig: new window.immutable.config.ImmutableConfiguration({
    environment: window.immutable.config.Environment.SANDBOX,
  }),
};

const client = new window.immutable.blockchainData.BlockchainData(config);

const getUserInfo = async function () {
  window.userProfile = await window.passport.getUserInfo();
};


const PRIVATE_KEY =
  "051cc222a0f1997d54e41bcca1e522f85c89e6b5474b94a0313c13f8b0165372";
// const CONTRACT_ADDRESS = "0x99180a00156c90a67a4c722606bcd8d4a47190b3";

const CONTRACT_ABI = [
  "function grantRole(bytes32 role, address account)",
  "function MINTER_ROLE() view returns (bytes32)",
  "function mint(address to, uint256 tokenId)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function hasRole(bytes32 role, address account) view returns (bool)",
  "function totalSupply() view returns (uint256)",
];

async function getData(id) {
  try {
    let nft = document.getElementById("nft");

    const nftDetails = {
      1: {
        image: "assets/images/nft1.webp",
        name: "Level 1 Badge",
        description:
          "This NFT represents your first accomplishment on StackUp Invaders.",
        contractAddress: "0xe20ddd8c26c566b14a604803d4f21970861f7cb4",
      },
      2: {
        image: "assets/images/nft2.webp",
        name: "Level 2 Badge",
        description:
          "This NFT represents your second accomplishment on StackUp Invaders which grants you an upgraded spaceship.",
        contractAddress: "0xcaa6b22b51db8082fc398ad7f779e92be2accb6f",
      },
      3: {
        image: "assets/images/nft3.webp",
        name: "Final Level Badge",
        description:
          "This NFT represents your final accomplishment on StackUp Invaders which grants you an max spaceship with three bullets.",
        contractAddress: "0x3f7c0febf46062e158d45d79585451248e51bf8c",
      },
    };

    const details = nftDetails[id.toString()];

    if (!details) {
      throw new Error("Invalid Token ID");
    }

    nft.innerHTML = `
    <div class="alert alert-success"> Great Score! Claim this NFT, then resume the game.</div>
    <div class="card" >
    <div class="card-body">
      <div class="media">
        <img src='${details.image}' class="mr-3 img-thumbnail" alt="nft" style="width: 30%;">
        <div class="media-body">
          <h5 class="card-title">${details.name}</h5>
          <p class="card-text">'${details.description}'</p>
        </div>
      </div>
    </div>
    <div class="card-body">
      <button id="claim-btn" class="btn btn-success"> Claim</button>
    </div>
  </div>
    `;
    const claimBtn = this.document.getElementById("claim-btn");
    console.log(claimBtn)
    claimBtn.addEventListener('click', async function (event) {
  event.target.classList.add('disabled', 'bg-green-300', '!cursor-not-allowed');
  event.target.textContent = 'Claiming Nft...'
  await mintNft(details.contractAddress)
})
    return details;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

window.getData = getData;


const mintNft = async function (contractAddress) {
  let CONTRACT_ADDRESS = contractAddress
  if (window?.accounts) {
    try {
    const recipientAddress = window.accounts[0]

      const provider = getDefaultProvider("https://rpc.testnet.immutable.com");

      const wallet = new Wallet(PRIVATE_KEY, provider);


      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        wallet
      );

      console.log("getting next token id")
      const TOKEN_ID = await getNextTokenId(contract);
      console.log({TOKEN_ID})

        const gasOverrides = {
          maxPriorityFeePerGas: 100e9, // 100 Gwei
          maxFeePerGas: 150e9,
          gasLimit: 200000,
        };


      console.log("Minting now")
        const populatedTransaction = await contract.populateTransaction.mint(recipientAddress, TOKEN_ID, gasOverrides);
        console.log({populatedTransaction})
      console.log('Awaiting transaction')
      const result = await wallet.sendTransaction(populatedTransaction);
      console.log("NFT minted successfully!", result);
      let nft = document.getElementById("nft");
      nft.innerHTML = `
            <div class="alert alert-success">
              NFT minted successfully!
              <a target="_blank" href="https://explorer.testnet.immutable.com/tx/${result.hash}"><button class="m-2 btn btn-primary">
              View Transaction
              </button></a>
            </div>`;

      } catch (error) {
        console.log(error)
      console.error("Error minting the first NFT:", error);
    }
  } else {
    console.log("No provider found.");
  }
};
window.mintNft = mintNft

async function getNextTokenId(contract) {
  try {
    const totalSupply = await contract.totalSupply();
    return totalSupply.toNumber() + 1;
  } catch (error) {
    console.error("Error getting next token ID:", error);
    return null;
  }
}


const upgradeNft = async function () {
  const upgradeEvent = new CustomEvent("upgradeSpaceship");
  window.dispatchEvent(upgradeEvent);
  nft.innerHTML += `
            <div class="alert alert-success">
              Your spaceship has been upgraded! At this stage, there is no NFT.
            </div>`;
};

