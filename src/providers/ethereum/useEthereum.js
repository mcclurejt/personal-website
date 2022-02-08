import { ethers } from "ethers";
import { useContext, useEffect, useState, useRef } from "react";
import { EthereumStateContext, EthereumDispatchContext } from "./store";

const getChainName = (chainId) => {
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

const useEthereum = () => {
  const state = useContext(EthereumStateContext);
  const dispatch = useContext(EthereumDispatchContext);
  const _isMounted = useRef(true);
  const _isConnectCalled = useRef(false);
  const [ethereum] = useState(window.ethereum);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const connect = async () => {
    if (!ethereum) throw Error("wallet is not available.");
    if (!_isMounted.current) throw Error("component is not mounted.");
    if (_isConnectCalled.current) throw Error("connect method already called.");
    _isConnectCalled.current = true;
    // set up the provider
    const provider = new ethers.providers.Web3Provider(ethereum);
    dispatch({ type: "SET_PROVIDER", payload: provider });
    // get chain and accounts
    await getChain();
    await getAccount();
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

  const getChain = async () => {
    if (!ethereum) throw Error("wallet is not available.");
    const chainId = await ethereum.request({ method: "net_version" });
    const chain = { id: chainId, name: getChainName(chainId) };
    dispatch({
      type: "SET_CHAIN",
      payload: chain,
    });
    return chain;
  };

  const getAccount = async () => {
    if (!ethereum) throw Error("wallet is not available");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if (!accounts.length) throw Error("no accounts available");
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const ens = await provider.lookupAddress(accounts[0]);
      const account = { address: accounts[0], ens };
      dispatch({
        type: "SET_ACCOUNT",
        payload: account,
      });
      dispatch({ type: "SET_CONNECTED", payload: true });
      return account;
    } catch (error) {
      console.warn(error);
    }
  };

  const switchChain = async (chainId) => {
    if (!ethereum) throw Error("wallet is not available.");
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + Number(chainId).toString(16) }],
    });
  };

  return {
    connect,
    switchChain,
    ethState: { ...state, isAvailable: !!ethereum },
  };
};

export default useEthereum;
