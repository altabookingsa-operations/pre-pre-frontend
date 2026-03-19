"use client";
import {useReducer, createContext } from "react";
import { searchReducer } from "./reducers/searchReducer.js";
// initial state
const initialState = {
    searchLoader: false,
    backgroundShow:true
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
      searchReducer
    ),
    initialState
  ); // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
