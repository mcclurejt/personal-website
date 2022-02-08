import React, { createContext, useReducer } from "react";

const initialState = {
  account: { address: "", ens: "" },
  chain: { id: null, name: "" },
  provider: null,
  isConnected: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCOUNT":
      return { ...state, account: action.payload };
    case "SET_CHAIN":
      return { ...state, chain: action.payload };
    case "SET_PROVIDER":
      return { ...state, provider: action.payload };
    case "SET_CONNECTED":
      return { ...state, isConnected: action.payload };
    default:
      console.warn(`unknown action type ${action.type}`);
      return state;
  }
};

const EthereumStateContext = createContext(initialState);
const EthereumDispatchContext = createContext();
const EthereumStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <EthereumDispatchContext.Provider value={dispatch}>
      <EthereumStateContext.Provider value={state}>
        {children}
      </EthereumStateContext.Provider>
    </EthereumDispatchContext.Provider>
  );
};
export { EthereumStateContext, EthereumDispatchContext, EthereumStateProvider };
