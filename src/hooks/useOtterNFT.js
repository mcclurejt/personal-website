import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import OtterNFT from "../utils/OtterNFT.json";

export const useOtterNFT = ({ provider, contractAddress, isConnected }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintedOtters, _setMinted] = useState({});
  const mintedOttersRef = useRef(mintedOtters);
  const setMinted = (items) => {
    mintedOttersRef.current = items;
    _setMinted(items);
  };

  useEffect(() => {
    if (isConnected) {
      (async () => {
        try {
          await listen();
        } catch (error) {
          console.warn(error);
        }
      })();
      return unlisten;
    }
  }, [isConnected]);

  const mintOtter = async () => {
    try {
      if (isConnected) {
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          OtterNFT.abi,
          signer
        );
        let nftTxn = await connectedContract.makeAnOtterNFT();
        setIsMinting(true);
        await nftTxn.wait();
        setIsMinting(false);
      } else {
        console.warn("wallet not connected!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listen = async () => {
    try {
      if (isConnected) {
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          OtterNFT.abi,
          signer
        );
        connectedContract.on("NewOtterMinted", async (from, tokenId) => {
          const uri = await connectedContract.tokenURI(Number(tokenId));
          const json = atob(uri.substring(29));
          const data = JSON.parse(json);
          setMinted({
            ...mintedOttersRef.current,
            [Number(tokenId)]: data,
          });
        });
      } else {
        console.warn("wallet not connected!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unlisten = async () => {
    try {
      if (isConnected) {
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contractAddress,
          OtterNFT.abi,
          signer
        );
        connectedContract.removeAllListeners(["NewOtterMinted"]);
      } else {
        console.warn("wallet not connected!");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    mintOtter,
    mintedOtters,
    isMinting,
  };
};
