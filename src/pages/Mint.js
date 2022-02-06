import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import OtterNFT from "../utils/OtterNFT.json";
import { useEthers } from "../hooks/useEthers";
import { Header, Body } from "../components/Text";
import { Button } from "../components/Button";
import { Gallery } from "../components/Gallery";

const CONTRACT_ADDRESS = "0x4EDC0C642f4cb1A7dc118a7BFa9144602130cc37";

const Mint = () => {
  const { connect, switchChain, ethersState } = useEthers();
  const [isMinting, setIsMinting] = useState(false);
  const [mintedOtters, _setMintedOtters] = useState({});

  const mintedOttersRef = useRef(mintedOtters);
  const setMintedOtters = (otters) => {
    mintedOttersRef.current = otters;
    _setMintedOtters(otters);
  };

  useEffect(() => {
    if (ethersState.isAvailable && !ethersState.isConnected) {
      (async () => {
        try {
          await connect();
        } catch (error) {
          console.warn(error);
        }
      })();
    } else if (ethersState.isConnected) {
      (async () => {
        try {
          await listenOtter();
        } catch (error) {
          console.warn(error);
        }
      })();
      return unlistenOtter;
    }
  }, [ethersState.isAvailable, ethersState.isConnected]);

  /* Actions **/

  const mintOtter = async () => {
    try {
      const { provider } = ethersState;
      if (provider) {
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          OtterNFT.abi,
          signer
        );
        let nftTxn = await connectedContract.makeAnOtterNFT();
        setIsMinting(true);
        await nftTxn.wait();
        setIsMinting(false);
      } else {
        console.warn("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* Listeners **/

  const listenOtter = async () => {
    try {
      const { provider } = ethersState;
      if (provider) {
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          OtterNFT.abi,
          signer
        );
        connectedContract.on("NewOtterMinted", async (from, tokenId) => {
          const uri = await connectedContract.tokenURI(Number(tokenId));
          const json = atob(uri.substring(29));
          const data = JSON.parse(json);
          setMintedOtters({
            ...mintedOttersRef.current,
            [Number(tokenId)]: data,
          });
        });
      } else {
        console.warn("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unlistenOtter = async () => {
    try {
      const { provider } = ethersState;
      if (provider) {
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          OtterNFT.abi,
          signer
        );
        connectedContract.removeAllListeners(["NewOtterMinted"]);
      } else {
        console.warn("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  /* Render Methods **/

  const renderSwitchNetworkBanner = () =>
    ethersState.chain.id !== ethersState.desiredChain.id && (
      <SwitchNetworkBanner>
        <div style={{ flex: 1 }} />
        <SwitchNetworkText medium bold>
          Error! Must be on {ethersState.desiredChain.name} network, currently
          on {ethersState.chain.name}
        </SwitchNetworkText>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button bold medium onClick={switchChain}>
            Switch Network
          </Button>
        </div>
      </SwitchNetworkBanner>
    );

  const renderCollectionBar = () => (
    <CollectionBar>
      <div style={{ display: "flex", flex: 1 }}></div>
      <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
        <Collection large>Odd Otters</Collection>
      </div>
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
        {renderConnectionStatus()}
      </div>
    </CollectionBar>
  );

  const renderConnectionStatus = () => {
    const { isAvailable, isConnected, account } = ethersState;
    const { ens, address } = account;
    const notAvailable = "MetaMask not found...";
    const notConnected = "Wallet not connected...";
    const hasENS = !!ens;
    return (
      <ConnectionStatusText medium>
        {!isAvailable && notAvailable}
        {isAvailable && !isConnected && notConnected}
        {isAvailable && isConnected && "Connected: "}
        {isAvailable && isConnected && (
          <b>
            {hasENS
              ? ens
              : "0x" +
                address.substring(2, 5).toUpperCase() +
                "..." +
                address.substring(address.length - 4).toUpperCase()}
          </b>
        )}
      </ConnectionStatusText>
    );
  };

  const renderMintedOtters = () => {
    const galleryItems = Object.keys(mintedOtters)
      .sort((a, b) => a - b)
      .reverse()
      .map((id) => {
        return {
          name: mintedOtters[id].name,
          properties: mintedOtters[id].properties,
          src: mintedOtters[id].image,
        };
      });
    return mintedOtters.length !== 0 && Gallery(galleryItems);
  };

  return (
    <MintContainer>
      {renderSwitchNetworkBanner()}
      {ethersState.isConnected &&
        ethersState.isCorrectChain &&
        renderCollectionBar()}
      {ethersState.isConnected &&
        ethersState.isCorrectChain &&
        renderMintedOtters(mintedOtters)}
      {ethersState.isConnected && ethersState.isCorrectChain && (
        <MintButton
          onClick={isMinting ? null : mintOtter}
          isMinting={isMinting}
          bold
          medium
        >
          {isMinting ? "Minting..." : "Mint"}
        </MintButton>
      )}
    </MintContainer>
  );
};

const MintContainer = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SwitchNetworkBanner = styled.div`
  margin: 0;
  padding: 0.5em;
  background-color: ${(props) => props.theme.colors.error};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SwitchNetworkText = styled(Body)`
  color: ${(props) => props.theme.colors.background};
`;

const CollectionBar = styled.div`
  margin: 0;
  padding: 0 0.5em;
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Collection = styled(Header)`
  margin: 0;
  height: 100%;
  padding: 0 0.5em;
  border-radius: 0.5em;
  font-weight: bold;
  color: ${(props) => props.theme.colors.first};
  -webkit-text-stroke: 1px ${(props) => props.theme.colors.foreground};
`;

const ConnectionStatusText = styled(Body)`
  color: ${(props) => props.theme.colors.foreground};
  margin: 0 0;
`;

const MintButton = styled(Button)`
  color: ${(props) =>
    props.isMinting ? props.theme.colors.background : props.theme.colors.third};
  margin: auto;
  cursor: ${(props) => (props.isMinting ? "default" : "cursor")};
  background-color: ${(props) =>
    props.isMinting ? props.theme.colors.foreground : "transparent"};
  border: 3px solid
    ${(props) =>
      props.isMinting
        ? props.theme.colors.foreground
        : props.theme.colors.third};
  padding: 0.1em 2em;
  transition-property: background-color;
  transition-property: color;
  transition-duration: 0.25s;
  &:hover {
    color: ${(props) => props.theme.colors.background};
    background-color: ${(props) =>
      props.isMinting
        ? props.theme.colors.foreground
        : props.theme.colors.third};
  }
`;

export default Mint;
