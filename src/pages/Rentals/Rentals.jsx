import React, { useState, useEffect, useContext } from "react";
import "./Rentals.css";
import { Link } from "react-router-dom";
import aeroLogo from "../../images/aero-logo.png";
import { ConnectButton, Icon, Button } from "web3uikit";
import RentalsMap from "../../components/RentalsMap/RentalsMap";
import { useMoralis } from "react-moralis";
import User from "../../components/User/User";
import Filter from "../../components/filter/Filter";
import { TransactionContext } from "../../components/Context/ContextWrapper";
import Footer from "../../components/Footer/Footer";

const Rentals = () => {
  const [highlight, setHighlight] = useState();
  const { Moralis, account } = useMoralis();
  const { destination, guests } = useContext(TransactionContext);
  const [rentalList, setRentalList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [coOrdinates, setCoOrdinates] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchRentals = async () => {
      const Rentals = await Moralis.Object.extend("RentalTables");
      const query = new Moralis.Query(Rentals);
      console.log(query);
      query.contains("location", destination);
      query.greaterThanOrEqualTo("maxGuests_decimal", Number(guests));
      const result = await query.find();

      // console.log(result);
      setRentalList(result);
      setIsLoading(false);

      let cords = [];
      if (result !== []) {
        result.forEach((e) => {
          cords.push({ lat: e.attributes.lat, lng: e.attributes.long });
        });
        setCoOrdinates(cords);
      }
    };

    fetchRentals();
  }, [destination, guests]);
  console.log("Rental List", rentalList);
  // console.log(coOrdinates);

  return (
    <div className="rentals__page">
      <div className="rentals__filter">
        <div className="filters">
          <div>
            <Link to={"/"}>
              <img className="logo" src={aeroLogo} alt="logo" />
            </Link>
          </div>
          <Filter />

          <div className="lrContainers">
            {account && <User account={account} />}
            <ConnectButton />
          </div>
        </div>
      </div>

      <div className="rentalsContent">
        <div className="rentalsContentL">
          <div className="stays">Stays Available For Your Destination </div>
          {isLoading ? (
            <div className="spinner__div">
              <svg className="spinner" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            </div>
          ) : (rentalList && rentalList.length === 0) ? (
            <div className="no__location">
              <div>
              <i className="bi bi-emoji-frown"></i>
              <p>{`No Location Available In ${destination}`}</p>
              </div>
            </div>
          ) : (
            rentalList &&
            [...rentalList].map((e, i) => {
              //I made a mistake while inputting the data on the smart contract, hence I had to mak up for it with this weird line
              const x = e.attributes.details[0].replaceAll("'", '"');

              return (
                <div key={e.id} style={{ cursor: "pointer" }}>
                  {" "}
                  <div
                    onClick={() => {
                      // console.log(e);
                      setHighlight(i);
                    }}
                    className={highlight === i ? "rentalDivH" : "rentalDiv"}
                  >
                    <img
                      className="rentalImg"
                      src={e.attributes.imgUrl[1]}
                      alt="rentalPhoto"
                    />
                    <div className="rentalInfo">
                      <div className="rentalTitle">{e.attributes.name}</div>
                      <div className="rentalDesc">
                        <div className="rentalLocation">
                          <i className="bi bi-geo-alt"></i>{" "}
                          <span>{e.attributes.location[0]}, </span>
                          <span>{e.attributes.location[1]}</span>
                        </div>
                        <ul
                          style={{
                            listStyle: "none",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <li>
                            <i className="bi bi-door-open"></i>{" "}
                            {JSON.parse(x).rooms} Rooms
                          </li>
                          <li>
                            <i className="bi bi-person"></i>{" "}
                            {JSON.parse(x).guests} Guests
                          </li>
                        </ul>
                      </div>
                      <div className="rentalDesc"></div>
                      <div className="bottomButton">
                        <Link
                          to={`/rentals/${e.attributes.name}`}
                          state={e.attributes}
                          style={{ textDecoration: "none" }}
                        >
                          <Button text="Visit Here" />
                        </Link>
                        <div style={{ display: "flex" }}>
                          <Icon fill="#000" size={15} svg="eth" />{" "}
                          {e.attributes.pricePerDay}/ Day
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              );
            })
          )}
        </div>
        <div className="rentalsContentR">
          {/* {coOrdinates && ( */}
          <RentalsMap location={coOrdinates && coOrdinates[highlight]} />
          {/* )} */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rentals;
