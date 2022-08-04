import React, { useState, useEffect } from "react";
import "./Rentals.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/airbnbRed.png";
import { ConnectButton, Icon, Button, useNotification } from "web3uikit";
import RentalsMap from "../components/RentalsMap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import User from "../components/User";

const Rentals = () => {
  const [highlight, setHighlight] = useState();
  const { state: searchFilters } = useLocation();
  const { Moralis, account } = useMoralis();
  const { destination, guests, checkIn, checkOut } = searchFilters;
  const [rentalList, setRentalList] = useState([]);
  const [coOrdinates, setCoOrdinates] = useState();
  const dispatch = useNotification();
  const contractProcessor = useWeb3ExecuteFunction();

  useEffect(() => {
    const fetchRentals = async () => {
      const Rentals = await Moralis.Object.extend("rentalsTable");
      const query = new Moralis.Query(Rentals);
      console.log(query);
      query.equalTo("city", destination);
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
  }, [searchFilters]);

  const handleSuccess = () => {
    dispatch({
      type: "success",
      message: `Great! You have booked ${destination}`,
      title: "Booking Successful",
      position: "topL",
    });
  };

  const handleError = (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Booking Failed",
      position: "topL",
    });
    // console.log(`${msg}`);
  };

  const handleNoAccount = () => {
    dispatch({
      type: "error",
      message: "Please Connect An Account",
      title: " Not Connected",
      position: "topL"
    })
  }

  const bookRental = async (start, end, id, dayPrice) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt).toISOString().slice(0, 10));
    }

    let options = {
      contractAddress: "0xD408375D3bc438752FD32b3e4f24b35D057630B1",
      functionName: "addDatesBooked",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "string[]",
              name: "newBookings",
              type: "string[]",
            },
          ],
          name: "addDatesBooked",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        id: id,
        newBookings: arr,
        value: 1
      },
      msgValue: Number(Moralis.Units.ETH(dayPrice * arr.length)),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
         handleSuccess();
      },
      onError: (error) => {
       handleError(error.error.message);
      },
    });
  };


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
          {account && <User account={account}/>}
          <ConnectButton />
        </div>
      </div>

      <hr className="line" />

      <div className="rentalsContent">
        <div className="rentalsContentL">
          Stays Available For Your Destination
          {rentalList !== [] ?
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
                        <Button
                          text="Visit Here"
                          onClick={() =>{
                            if(account){
                            bookRental(
                              checkIn,
                              checkOut,
                              e.attributes.uid_decimal.value.$numberDecimal,
                              Number(
                                e.attributes.pricePerDay_decimal.value
                                  .$numberDecimal
                              )
                            )}
                            else {
                              handleNoAccount();
                            }}
                          }
                        />
                        <div style={{ display: "flex" }}>
                          <Icon fill="#000" size={15} svg="eth" />{" "}
                          {e.attributes.pricePerDay / 100}/ Day
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) :  (<div>No Location Available For Selected Destination</div>) }
        </div>
        <div className="rentalsContentR">
          {coOrdinates && (
            <RentalsMap location={coOrdinates} setHighlight={setHighlight} />
          )}
        </div>
      </div>
    </>
  );
};

export default Rentals;
