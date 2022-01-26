import React, { useLayoutEffect, useRef, useState } from "react";
import { Controller, Scene } from "react-scrollmagic";
import styled from "styled-components";
import { keyframes } from "styled-components";
import SVG from "react-inlinesvg";
import { Tween, Timeline } from "react-gsap";
import { ethers } from "ethers";
import ArrowDownSVG from "./svg/arrow-down.svg";
import GithubSVG from "./svg/github.svg";
import TwitterSVG from "./svg/twitter.svg";
import DiscordSVG from "./svg/discord.svg";
import LinkedInSVG from "./svg/linkedin.svg";

const Container = styled.div`
  margin: 0;
  width: 100%;
  height: auto;
  background: linear-gradient(45deg, #ff00c7, #00b2ff);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-x: hidden;
`;

const SocialsBar = styled.div`
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const TopBarSVG = styled(SVG)`
  padding: 10px;
  & path {
    fill: ${({ color }) => color};
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-family: "Fredoka One", cursive;
  font-size: 8em;
  width: 100vw;
  text-align: center;
  margin: 0 auto;
  margin-top: 20vh;
  color: #f0f0f0;
`;

const ArrowDown = styled(SVG)`
  margin: 10vw 20vw;
  height: 5vw;
  align-self: center;
  & path {
    fill: ${({ color }) => color};
  }
`;

const Card = styled.div`
  width: 80vw;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  margin: 0 auto;
`;

const CardTextLarge = styled.h2`
  font-family: "Fredoka One", cursive;
  font-size: 4em;
  text-align: center;
`;

const CardTextSmall = styled.h3`
  font-family: "Dongle", cursive;
  font-size: 2em;
  text-align: center;
  color: #484848;
`;

const CardImage = styled.img`
  max-width: 50vh;
  max-height: 400px;
  /* height: 100%; */
  border-radius: 10px;
  margin: auto 0;
`;
const CardTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Pink = styled.span`
  color: #00a743;
`;

const Orange = styled.span`
  color: #e77042;
`;

const Icy = styled.span`
  color: #00bdb2;
`;

function App() {
  const Socials = (
    <SocialsBar>
      <a
        href="https://www.linkedin.com/in/john-mcclure-b1923ab6/"
        target="_blank"
        rel="noreferrer"
      >
        <TopBarSVG src={LinkedInSVG} color="#f0f0f0" />
      </a>
      <a href="https://github.com/mcclurejt" target="_blank" rel="noreferrer">
        <TopBarSVG src={GithubSVG} color="#f0f0f0" />
      </a>
      <a
        href="https://discordapp.com/users/mcclurejt#3268"
        target="_blank"
        rel="noreferrer"
      >
        <TopBarSVG src={DiscordSVG} color="#f0f0f0" />
      </a>
      <a href="https://twitter.com/mcclurejit" target="_blank" rel="noreferrer">
        <TopBarSVG src={TwitterSVG} color="#f0f0f0" />
      </a>
    </SocialsBar>
  );
  return (
    <Container>
      <Controller>
        {Socials}
        {/** JOHN MCCLURE */}
        <TitleContainer>
          <Title>John McClure</Title>
          <ArrowDown src={ArrowDownSVG} color="#f0f0f0" />
        </TitleContainer>
        {/** First Card */}
        <Scene
          duration={1000}
          pin={{ pushFollowers: false }}
          triggerHook={0.25}
        >
          <Tween
            from={{ x: "-80vw", opacity: 0 }}
            to={{ x: "0px", opacity: 1 }}
          >
            <Card>
              <CardImage src="https://i.ibb.co/7CPRzYc/snowboarding.jpg" />
              <CardTextContainer>
                <CardTextLarge>
                  I'm a <Pink>Snowboarder...</Pink>
                </CardTextLarge>
                <CardTextSmall>I like other boards too!</CardTextSmall>
              </CardTextContainer>
            </Card>
          </Tween>
        </Scene>
        {/** Second Card */}
        <Scene
          duration={1000}
          pin={{ pushFollowers: false }}
          triggerHook={0.25}
        >
          <Tween
            from={{ x: "100vw", opacity: 0 }}
            to={{ x: "0px", opacity: 1 }}
          >
            <Card>
              <CardTextContainer>
                <CardTextLarge>
                  I'm a <Orange>Cat Dad...</Orange>
                </CardTextLarge>
                <CardTextSmall>Always seeking purrfection</CardTextSmall>
              </CardTextContainer>
              <CardImage src="https://i.ibb.co/BfJ4rCq/Loomboy.png" />
            </Card>
          </Tween>
        </Scene>
        {/** Third Card */}
        <Scene
          duration={1000}
          pin={{ pushFollowers: false }}
          triggerHook={0.25}
        >
          <Tween
            from={{ x: "-100vw", opacity: 0 }}
            to={{ x: "0px", opacity: 1 }}
          >
            <Card>
              <CardImage src="https://i.ibb.co/wMvs6Qt/hackerman.jpg" />
              <CardTextContainer>
                <CardTextLarge>
                  And a <Icy>Developer!</Icy>
                </CardTextLarge>
                <CardTextSmall>Let's work together!</CardTextSmall>
              </CardTextContainer>
            </Card>
          </Tween>
        </Scene>
        {/** Fourth Card */}
        <MintCard />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {Socials}
      </Controller>
    </Container>
  );
}

const StyledButton = styled.button`
  height: 45px;
  border: 0;
  width: auto;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Dongle", cursive;
  font-size: 2em;
  font-weight: bold;
  color: #f0f0f0;
`;

const GradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const ConnectWalletButton = styled(StyledButton)`
  background: -webkit-linear-gradient(left, #00a743, #35aee2);
  background-size: 200% 200%;
  animation-name: ${GradientAnimation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
  margin: 0 auto;
`;

const MintNFTButton = styled(StyledButton)`
  background: -webkit-linear-gradient(left, #484848, #ff519a);
  background-size: 200% 200%;
  animation-name: ${GradientAnimation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
  margin: 0 auto;
`;

function MintCard() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object");
    }
    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Rinkebey test network
    const rinkebyChainId = "0x4";
    if (chainId !== rinkebyChainId) {
      alert("You are not connected to the Rinkeby Test Network!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      setupEventListener();
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain " + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4";
      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Test Network!");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        console.log("TODO: Setup Event Listener");

        // const connectedContract = new ethers.Contract(
        //   CONTRACT_ADDRESS,
        //   myEpicNft.abi,
        //   signer
        // );

        // // THIS IS THE MAGIC SAUCE.
        // // This will essentially "capture" our event when our contract throws it.
        // // If you're familiar with webhooks, it's very similar to that!
        // connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
        //   console.log(from, tokenId.toNumber());
        //   alert(
        //     `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
        //   );
        // });

        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RenderConnectWalletButton = (
    <ConnectWalletButton onClick={connectWallet}>
      Connect Wallet
    </ConnectWalletButton>
  );

  const RenderMintNFTButton = <MintNFTButton>Mint NFT</MintNFTButton>;

  return (
    <Scene duration={1000} pin={{ pushFollowers: false }} triggerHook={0.25}>
      <Tween from={{ x: "100vw", opacity: 0 }} to={{ x: "0px", opacity: 1 }}>
        <Card>
          <CardTextContainer>
            <CardTextSmall>
              Since you made it this far, want to mint an NFT?
            </CardTextSmall>
            {currentAccount == ""
              ? RenderConnectWalletButton
              : RenderMintNFTButton}
          </CardTextContainer>
        </Card>
      </Tween>
    </Scene>
  );
}
export default App;
