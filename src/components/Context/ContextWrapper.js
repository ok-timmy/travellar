import React, { useState } from "react";

export const TransactionContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [checkIn, setCheckIn] = useState(new Date().toISOString().substring(0, 10));
  const [checkOut, setCheckOut] = useState(new Date().toISOString().substring(0, 10));
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState();
  const [index, setIndex] = useState(0);

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
        index, setIndex
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
