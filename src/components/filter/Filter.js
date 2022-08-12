import React, { useState } from 'react';
import {  DatePicker, Icon, Input, Select } from "web3uikit";
import { Link } from "react-router-dom";
import countries from "../../assets/countries.json";
import "./Filter.css"

const Filter = () => {

    
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(2);


  return (
    <div className="searchFields">
    <div className="inputs">
      Location
      <Select
        defaultOptionIndex={0}
        onChange={(data) => setDestination(data.label)}
        options={
          countries.map((country)=> {
          return {
            id: country.code,
            label: country.name
          }
          })
        }
      />
    </div>
    <div className="vl" />
    <div className="inputs">
      Check In
      <DatePicker
        id="CheckIn"
        onChange={(event) => setCheckIn(event.date)}
      />
    </div>
    <div className="vl" />
    <div className="inputs">
      Check Out{" "}
      <DatePicker
        id="CheckOut"
        onChange={(event) => setCheckOut(event.date)}
      />
    </div>
    <div className="vl" />
    <div className="inputs">
      Guests{" "}
      <Input
        value={2}
        width="auto"
        name="AddGuests"
        type="number"
        onChange={(event) => setGuests(Number(event.target.value))}
      />
    </div>
    <Link
      to={"/rentals"}
      state={{ destination, checkIn, checkOut, guests }}
    >
      <div className="searchButton">
        <Icon svg="search" fill="#fff" size={40}/>
      </div>
    </Link>
  </div>
  )
}

export default Filter