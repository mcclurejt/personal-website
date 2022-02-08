import React, { useEffect } from "react";
import styled from "styled-components";
import { useEthereum } from "../providers/ethereum";
import { useOtterNFT } from "../hooks/useOtterNFT";
import { Header, Body } from "../components/Text";
import { Button } from "../components/Button";
import { Gallery } from "../components/Gallery";

const DESIRED_CHAIN_ID = "4";
const DESIRED_CHAIN_NAME = "rinkeby";
const CONTRACT_ADDRESS = "0x4EDC0C642f4cb1A7dc118a7BFa9144602130cc37";

const Mint = ({ setCenterContent }) => {
  const {
    connect,
    switchChain,
    ethState: { isAvailable, isConnected, account, chain, provider },
  } = useEthereum();
  const { mintOtter, mintedOtters, isMinting } = useOtterNFT({
    provider,
    contractAddress: CONTRACT_ADDRESS,
    isConnected,
  });
  const numMintedOtters = Object.keys(mintedOtters).length;
  const isCorrectChain = chain.id === DESIRED_CHAIN_ID;

  useEffect(() => {
    if (isAvailable && !isConnected) {
      (async () => {
        try {
          await connect();
        } catch (error) {
          console.warn(error);
        }
      })();
    }
  }, [isAvailable, isConnected]);

  useEffect(() => {
    setCenterContent(renderConnectionStatus());
    return () => setCenterContent(null);
  }, [isAvailable, isConnected, account]);

  const renderSwitchNetworkBanner = () =>
    isAvailable &&
    !isCorrectChain && (
      <SwitchNetworkBanner>
        <div style={{ flex: 1 }} />
        <SwitchNetworkText medium bold>
          Error! Must be on {DESIRED_CHAIN_NAME} network, currently on{" "}
          {chain.name}
        </SwitchNetworkText>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button
            bold
            medium
            invert
            onClick={() => switchChain(DESIRED_CHAIN_ID)}
          >
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
      <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
        {numMintedOtters > 0 && (
          <MintButton
            onClick={isMinting ? null : mintOtter}
            isMinting={isMinting}
            bold
            medium
          >
            {isMinting ? "Minting..." : "Mint"}
          </MintButton>
        )}
      </div>
    </CollectionBar>
  );

  const renderConnectionStatus = () => {
    const { ens, address } = account;
    const notAvailable = "MetaMask not found...";
    const notConnected = "Wallet not connected...";
    const hasENS = !!ens;
    return (
      <ConnectionStatusText small>
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

  const renderMintedOtters = () => (
    <Gallery
      items={Object.keys(mintedOtters)
        .sort((a, b) => a - b)
        .reverse()
        .map((id) => ({
          name: mintedOtters[id].name,
          properties: mintedOtters[id].properties,
          src: mintedOtters[id].image,
        }))}
    />
  );

  return (
    <MintContainer>
      {renderSwitchNetworkBanner()}
      {isConnected && isCorrectChain && renderCollectionBar()}
      {isConnected && isCorrectChain && numMintedOtters === 0 && (
        <MintButton
          onClick={isMinting ? null : mintOtter}
          isMinting={isMinting}
          bold
          medium
          style={{ margin: "1em auto" }}
        >
          {isMinting ? "Minting..." : "Mint"}
        </MintButton>
      )}
      {isConnected && isCorrectChain && renderMintedOtters(mintedOtters)}
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
  padding: 0.25em 0;
  border-radius: 0.5em;
  font-weight: bold;
  color: ${(props) => props.theme.colors.first};
  -webkit-text-stroke: 1px ${(props) => props.theme.colors.foreground};
  white-space: nowrap;
`;

const ConnectionStatusText = styled(Body)`
  color: ${(props) => props.theme.colors.foreground};
  margin: 0 0;
`;

const MintButton = styled(Button)`
  color: ${(props) =>
    props.isMinting
      ? props.theme.colors.background
      : props.theme.colors.foreground};
  cursor: ${(props) => (props.isMinting ? "default" : "cursor")};
  background-color: ${(props) =>
    props.isMinting ? props.theme.colors.foreground : props.theme.colors.third};
  border: 3px solid
    ${(props) =>
      props.isMinting
        ? props.theme.colors.foreground
        : props.theme.colors.foreground};
  padding: 0 2em;
  &:hover {
    color: ${(props) =>
      props.isMinting
        ? props.theme.colors.background
        : props.theme.colors.third};
    background-color: ${(props) =>
      props.isMinting
        ? props.theme.colors.foreground
        : props.theme.colors.background};
    border: 3px solid
      ${(props) =>
        props.isMinting
          ? props.theme.colors.foreground
          : props.theme.colors.third};
  }
`;

export default Mint;
