import React, { useState, useEffect } from "react";
import "./Rentals.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/airbnbRed.png";
import { ConnectButton, Icon, Button } from "web3uikit";
import RentalsMap from "../../components/RentalsMap";
import { useMoralis} from "react-moralis";
import User from "../../components/User";
import Filter from "../../components/filter/Filter";

const Rentals = () => {
  const [highlight, setHighlight] = useState();
  const { state: searchFilters } = useLocation();
  const { Moralis, account } = useMoralis();
  const { destination, guests, checkIn, checkOut } = searchFilters;
  const [rentalList, setRentalList] = useState([]);
  const [coOrdinates, setCoOrdinates] = useState();

  useEffect(() => {
    const fetchRentals = async () => {
      const Rentals = await Moralis.Object.extend("rentalsTable");
      const query = new Moralis.Query(Rentals);
      // console.log(query);
      query.equalTo("city", destination);
      query.greaterThanOrEqualTo("maxGuests_decimal", guests);
      const result = await query.find();
      // console.log(destination);
      // console.log(result);

      let cords = [];
      result.forEach((e) => {
        cords.push({ lat: e.attributes.lat, lng: e.attributes.long });
      });
      setCoOrdinates(cords);
      setRentalList(result);
    };

    fetchRentals();
  }, [searchFilters]);

 
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
              return (
                <div key={e.attributes.name}>
                  
                    {" "}
                    <div
                    onClick={()=> {console.log(e);}}
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
                          {e.attributes.unoDescription}
                        </div>
                        <div className="rentalDesc">
                          {e.attributes.dosDescription}
                        </div>
                        <div className="bottomButton">
                          <Link to={`/rentals/:${e.attributes.name}`} state={[e.attributes, searchFilters]}><Button
                            text="Visit Here"
                            // onClick={() => {
                            //   if (account) {
                            //     bookRental(
                            //       checkIn,
                            //       checkOut,
                            //       e.attributes.uid_decimal.value.$numberDecimal,
                            //       Number(
                            //         e.attributes.pricePerDay_decimal.value
                            //           .$numberDecimal
                            //       )
                            //     );
                            //   } else {
                            //     handleNoAccount();
                            //   }
                            // }}
                          />
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
            <div>No Location Available For Selected Destination</div>
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
