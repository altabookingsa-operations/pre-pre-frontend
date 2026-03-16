'use client';
import { useState, useEffect, useReducer, createContext } from 'react';
import { cart } from './reducers/cart';
import { transfer } from './reducers/transfer';
import { transferCart } from './reducers/transferCart';
import { user } from './reducers/user';
import { searchReducer } from './reducers/search.reducers';
import { addServiceDate } from './reducers/addServiceDate';
// initial state
const initialState = {
  cart: [],
  cartForMap: [],
  cartForTempMap: [],
  bookingDates: [],
  user: {},
  search_reducer: {},
  selectedDate: '',
  default_location: '',
  centerLatLng: '',
  inputVal: '',
  hotel_list: [],
  tour_list: [],
};

// create context
const Context = createContext({});

// combine reducer function
const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
    return state;
  };

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers(cart, transfer, transferCart, user, searchReducer, addServiceDate),
    initialState
  ); // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
