import React, { useState, useEffect, useContext } from "react";
import "./Rentals.css";
import { Link } from "react-router-dom";
import logo from "../../images/airbnbRed.png";
import { ConnectButton, Icon, Button } from "web3uikit";
import RentalsMap from "../../components/RentalsMap";
import { useMoralis } from "react-moralis";
import User from "../../components/User";
import Filter from "../../components/filter/Filter";
import { TransactionContext } from "../../components/Context/ContextWrapper";

const Rentals = () => {
  const [highlight, setHighlight] = useState();
  const { Moralis, account } = useMoralis();
  const { destination, guests } = useContext(TransactionContext);
  const [rentalList, setRentalList] = useState([]);
  const [coOrdinates, setCoOrdinates] = useState();

  useEffect(() => {
    const fetchRentals = async () => {
      const Rentals = await Moralis.Object.extend("RentalTables");
      const query = new Moralis.Query(Rentals);
      console.log(query);
      query.contains("location", destination);
      query.greaterThanOrEqualTo("maxGuests_decimal", guests);
      const result = await query.find();

      // console.log(destination);
      console.log(result);

      let cords = [];
      result.forEach((e) => {
        cords.push({ lat: e.attributes.lat, lng: e.attributes.long });
      });
      setCoOrdinates(cords);
      setRentalList(result);
    };

    fetchRentals();
  }, [destination, guests]);

  return (
    <div className="rentals__page">
      <div className="rentals__filter">
        <div className="filters">
          <div>
            <Link to={"/"}>
              <img className="logo" src={logo} alt="logo" />
            </Link>
          </div>
          <Filter />

          <div className="lrContainers">
            {account && <User account={account} />}
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* <hr className="line" /> */}

      <div className="rentalsContent">
        <div className="rentalsContentL">
          <div className="stays">Stays Available For Your Destination </div>
          {rentalList !== [] ? (
            rentalList.map((e, i) => {
              //I made a mistake while inputting the data on the smart contract, hence I had to mak up for it with this weird line
              const x = e.attributes.details[0].replaceAll("'", '"');
              // console.log(JSON.parse(x).rooms);

              return (
                <div key={e.id}>
                  {" "}
                  <div
                    onClick={() => {
                      console.log(e);
                    }}
                    className={highlight === i ? "rentalDivH" : "rentalDiv"}
                  >
                    <img
                      className="rentalImg"
                      src={e.attributes.imgUrl}
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
                          {e.attributes.pricePerDay / 100}/ Day
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              );
            })
          ) : (
            <div>No Location Available For {destination}</div>
          )}
        </div>
        <div className="rentalsContentR">
          {coOrdinates && (
            <RentalsMap location={coOrdinates} setHighlight={setHighlight} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
