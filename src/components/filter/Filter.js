import React, { useContext, useState } from "react";
import { DatePicker, Icon, Input, Select } from "web3uikit";
import { Link } from "react-router-dom";
import countries from "../../assets/countries.json";
import "./Filter.css";
import { TransactionContext } from "../Context/ContextWrapper";

const Filter = () => {
  const {
    index,
    setIndex,
    checkIn,
    checkOut,
    guests,
    setDestination,
    setCheckIn,
    setCheckOut,
    setGuests,
  } = useContext(TransactionContext);

  console.log(checkIn, checkOut);

  return (
    <div className="searchFields">
      <div className="inputs">
        Location
        <Select
          defaultOptionIndex={index}
          onChange={(data) => {
            setDestination(data.label);
            setIndex(countries.indexOf({ name: data.label, code: data.id }));
          }}
          options={countries.map((country) => {
            return {
              id: country.code,
              label: country.name,
            };
          })}
        />
      </div>
      <div className="vl" />
      <div className="inputs">
        Check In
        <DatePicker
          id="CheckIn"
          value={checkIn}
          onChange={(event) =>
            setCheckIn(event.date.toISOString().substring(0, 10))
          }
        />
      </div>
      <div className="vl" />
      <div className="inputs">
        Check Out{" "}
        <DatePicker
          id="CheckOut"
          value={checkOut}
          onChange={(event) =>
            setCheckOut(event.date.toISOString().substring(0, 10))
          }
        />
      </div>
      <div className="vl" />
      <div className="inputs">
        Guests{" "}
        <Input
          value={guests}
          width="auto"
          name="AddGuests"
          type="number"
          onChange={(event) => setGuests(Number(event.target.value))}
        />
      </div>
      <Link
        to={"/rentals"}
        // state={{ destination, checkIn, checkOut, guests }}
      >
        <div className="searchButton">
          <Icon svg="search" fill="#fff" size={40} />
        </div>
      </Link>
    </div>
  );
};

export default Filter;
