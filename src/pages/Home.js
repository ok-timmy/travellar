import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import bg from "../images/frontpagebg.png";
import logo from "../images/airbnb.png";
import { ConnectButton, DatePicker, Icon, Input, Select, Button } from "web3uikit";
import countries from "../assets/countries.json";

const Home = () => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [destination, setDestination] = useState("Victoria Island");
  const [guests, setGuests] = useState(2);

  // console.log(countries);

  return (
    <>
      <div className="container" style={{ backgroundImage: `url(${bg})` }}>
        <div className="containerGradient"></div>
      </div>
      <div className="topBanner">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="tabs">
          <div className="selected">Places to Stay</div>
          <div>Experiences</div>
          <div>Online Experiences</div>
        </div>
        <div className="lrContainers">
          <ConnectButton />
        </div>
      </div>
      <div className="tabContent">
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
                // {
                //   id: "vi",
                //   label: "Victoria Island"
                // },
                // {
                //   id: "ny",
                //   label: " New York",
                // },
                // {
                //   id: "lon",
                //   label: "London",
                // },
                // {
                //   id: "db",
                //   label: "Dubai",
                // },
                // {
                //   id: "la",
                //   label: " Los Angeles",
                // },
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
              <Icon svg="search" fill="#fff" size={24} />
            </div>
          </Link>
        </div>
      </div>

      <div className="randomLocation">
        <div>Feel Adventurous</div>
        <div className="text">
          Let us Decide and discover new places to stay, live, work or just relax.
        </div>
        <Button text="Explore A location"  onClick={()=> console.log(checkOut)} />
      </div>
    </>
  );
};

export default Home;
