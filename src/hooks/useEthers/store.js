import React, { createContext, useReducer } from "react";

const actionToState = {
  SET_ACCOUNT: "account",
  SET_CHAIN: "chain",
  SET_DESIRED_CHAIN: "desiredChain",
  SET_IS_CORRECT_CHAIN: "isCorrectChain",
  SET_CONNECTED: "isConnected",
  SET_PROVIDER: "provider",
};
const initialState = {
  account: { address: null, ens: "" },
  chain: { id: null, name: "" },
  desiredChain: { id: null, name: "" },
  isCorrectChain: false,
  isConnected: false,
  provider: null,
};
const reducer = (state, action) => {
  const stateName = actionToState[action.type];
  if (!stateName) {
    console.warn(`unknown action type ${action.type}`);
    return state;
  }
  return { ...state, [stateName]: action.payload };
};
const EthersStateContext = createContext(initialState);
const EthersDispatchContext = createContext();
const EthersStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <EthersDispatchContext.Provider value={dispatch}>
      <EthersStateContext.Provider value={state}>
        {children}
      </EthersStateContext.Provider>
    </EthersDispatchContext.Provider>
  );
};
export {
  actionToState,
  EthersStateContext,
  EthersDispatchContext,
  EthersStateProvider,
};
