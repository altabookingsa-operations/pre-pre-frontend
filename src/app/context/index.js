"use client";
import {useReducer, createContext, useEffect } from "react";
import { searchReducer } from "./reducers/searchReducer.js";
import { authReducer } from "./reducers/loginReducer.js";
import cookieInstance from "@/utils/cookieInstance.js";
// initial state
const initialState = {
    searchLoader: false,
    backgroundShow:true,
    user: null,
    mobile: true,
};

// create context
const Context = createContext({});

// combine reducer function
const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers(
      searchReducer,
      authReducer 
    ),
    initialState
  ); // pass more reducers combineReducers(user, blogs, products)
    // 🔥 THIS is where useEffect should go
  useEffect(() => {
    const token = cookieInstance.getStorageObj("authDataTokenNode");

    if (token) {
      dispatch({ type: "SET_USER", payload: token });
    }
  }, []);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
