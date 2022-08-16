import React, { useState } from "react";

export const TransactionContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const saveToStorage = (key, value) => {
    localStorage.setItem(`${key}`, value);
  };

  const getFromStorage = (key) => {
   const value = localStorage.getItem(`${key}`);
   if (value) {
    return value;
   } else return "";
 
  };


  const [checkIn, setCheckIn] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [checkOut, setCheckOut] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [destination, setDestination] = useState(getFromStorage("destination"));
  const [guests, setGuests] = useState(getFromStorage("guests"));
  const [index, setIndex] = useState(Number(getFromStorage("index")));


  return (
    <TransactionContext.Provider
      value={{
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        destination,
        setDestination,
        guests,
        setGuests,
        index,
        setIndex,
        saveToStorage,
        getFromStorage,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
