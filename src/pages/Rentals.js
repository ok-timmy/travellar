import React, { useState } from "react";
import "./Rentals.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/airbnbRed.png";
import { ConnectButton, Icon, Button } from "web3uikit";
import RentalsMap from "../components/RentalsMap";

const Rentals = () => {
  const [highlight, setHighlight] = useState()
  const { state: searchFilters } = useLocation();
  const { destination, guests, checkIn, checkOut } = searchFilters;
  const rentalList = [
    {
      attributes: {
        city: "New York",
        unoDescription: "3 Guests • 2 Beds • 2 Rooms",
        dosDescription: "Wifi • Kitchen • Living Area",
        imgUrl:
          "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",
        lat: "40.716862",
        long: "-73.999005",
        name: "Apartment in China Town",
        pricePerDay: "3",
      },
    },
  ];

  const cords = [];
  rentalList.forEach((e)=> {
    cords.push({lat: e.attributes.lat, lng: e.attributes.long});
  })

  return (
    <>
      <div className="topBanner">
        <div>
          <Link to={"/"}>
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="searchReminder">
          <div className="filter">{destination}</div>
          <div className="vl" />
          <div className="filter">{`
          ${checkIn.toLocaleString("default", { month: "short" })}
          ${checkIn.toLocaleString("default", { day: "2-digit" })}
          - 
          ${checkOut.toLocaleString("default", { month: "short" })}
          ${checkOut.toLocaleString("default", { day: "2-digit" })}

        `}</div>
          <div className="vl" />
          <div className="filter">{guests} Guests</div>
          <div className="searchFilterIcon">
            <Icon fill="#fff" size={20} svg="search" />
          </div>
        </div>
        <div className="lrContainers">
          <ConnectButton />
        </div>
      </div>

      <hr className="line" />

      <div className="rentalsContent">
        <div className="rentalsContentL">
          Stays Available For Your Destination
          {rentalList &&
            rentalList.map((e, i) => {
              return (
                <div key={e.attributes.name}>
                  <hr className="line2" />
                  <div className={highlight === i ? "rentalDivH" : "rentalDiv"}>
                    <img
                      className="rentalImg"
                      src={e.attributes.imgUrl}
                      alt="rentalPhoto"
                    />
                    <div className="rentalInfo">
                      <div className="rentalTitle">{e.attributes.name}</div>
                      <div className="rentalDesc">
                        {e.attributes.unoDescription}
                      </div>
                      <div className="rentalDesc">
                        {e.attributes.dosDescription}
                      </div>
                      <div className="bottomButton">
                        <Button text="Stay Here"/>
                        <div>
                          <Icon fill="#000" size={15} svg="matic"/> {e.attributes.pricePerDay}/ Day
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="rentalsContentR">
          <RentalsMap location={cords} setHighlight={setHighlight}/>
        </div>
      </div>
    </>
  );
};

export default Rentals;
