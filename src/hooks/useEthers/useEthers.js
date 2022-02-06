import { useContext, useEffect, useState, useRef } from "react";
import { EthersStateContext, EthersDispatchContext } from "./store";
import { ethers } from "ethers";

const chains = (chainId) => {
  if (!!Number(chainId) && chainId.length > 9) {
    return "local";
  }
  switch (chainId) {
    case "1":
      return "mainnet";
    case "3":
      return "ropsten";
    case "4":
      return "rinkeby";
    case "5":
      return "goerli";
    case "42":
      return "kovan";
    default:
      return `unknown`;
  }
};

const useEthers = ({ desiredChainId } = { desiredChainId: "4" }) => {
  const state = useContext(EthersStateContext);
  const dispatch = useContext(EthersDispatchContext);
  const _isMounted = useRef(true);
  const _isConnectCalled = useRef(false);
  const [ethereum] = useState(window.ethereum);
  const provider = new ethers.providers.Web3Provider(ethereum);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const connect = async () => {
    console.log("connecting...");
    if (!ethereum) throw Error("wallet is not available.");
    if (!_isMounted.current) throw Error("component is not mounted.");
    if (_isConnectCalled.current) throw Error("connect method already called.");
    _isConnectCalled.current = true;
    // set up the provider
    dispatch({ type: "SET_PROVIDER", payload: provider });
    // set up desired chain
    dispatch({
      type: "SET_DESIRED_CHAIN",
      payload: {
        id: desiredChainId,
        name: chains(desiredChainId),
      },
    });
    // get current chain
    const chainId = await getChain();
    dispatch({
      type: "SET_IS_CORRECT_CHAIN",
      payload: chainId === desiredChainId,
    });
    // only load accounts if on correct chain
    if (chainId === desiredChainId) {
      await getAccount();
    }
    // reload page on chain changed
    ethereum.on("chainChanged", (netId) => {
      if (netId) {
        window.location.reload();
      }
    });
    //reload accounts on account changed
    ethereum.on("accountsChanged", (accounts) => {
      if (!accounts.length) dispatch({ type: "SET_CONNECTED", payload: false });
      (async () => {
        await getAccount();
      })();
    });
    _isConnectCalled.current = false;
  };

  const getAccount = async () => {
    if (!ethereum) throw Error("wallet is not available");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if (!accounts.length) throw Error("no accounts available");
    const ens = await provider.lookupAddress(accounts[0]);
    dispatch({
      type: "SET_ACCOUNT",
      payload: { address: accounts[0], ens },
    });
    dispatch({ type: "SET_CONNECTED", payload: true });
    return accounts[0];
  };

  const getChain = async () => {
    if (!ethereum) throw Error("wallet is not available.");
    const chainId = await ethereum.request({ method: "net_version" });
    dispatch({
      type: "SET_CHAIN",
      payload: { id: chainId, name: chains(chainId) },
    });
    return chainId;
  };

  const switchChain = async () => {
    if (!ethereum) throw Error("wallet is not available.");
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + Number(desiredChainId).toString(16) }],
    });
  };

  return {
    connect,
    switchChain,
    ethersState: { ...state, isAvailable: !!ethereum },
  };
};

export default useEthers;
