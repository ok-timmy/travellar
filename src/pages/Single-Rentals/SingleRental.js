import React from "react";
import { useLocation } from "react-router-dom";
import "./SingleRental.css";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Icon, useNotification } from "web3uikit";
// import {  } from 'react-bootstrap-icon';
// import {} from "react-bootstrap-icons"

const SingleRental = () => {
  const dispatch = useNotification();
  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const { state: values } = useLocation();
  const { destination, checkIn, checkOut, guests } = values[1];
  console.log(values[0]);
  const {
    imgUrl,
    city,
    name,
    pricePerDay,
    maxGuests,
    unoDescription,
    dosDescription,
  } = values[0];

  //Handle Success Notification
  const handleSuccess = () => {
    dispatch({
      type: "success",
      message: `Great! You have booked ${destination}`,
      title: "Booking Successful",
      position: "topL",
    });
  };

  //Handle Error Notification
  const handleError = (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Booking Failed",
      position: "topL",
    });
    // console.log(`${msg}`);
  };

  //Handle No Account Notification
  const handleNoAccount = () => {
    dispatch({
      type: "error",
      message: "Please Connect An Account",
      title: " Not Connected",
      position: "topL",
    });
  };

  //Book Rental
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
        value: 1,
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
      <div className="location__page">
        <div className="search__details">
          <div className="searchReminder">
            <div className="each__filter">{destination}</div>
            <div className="each__filter">{`
          ${checkIn.toLocaleString("default", { month: "short" })}
          ${checkIn.toLocaleString("default", { day: "2-digit" })}
          - 
          ${checkOut.toLocaleString("default", { month: "short" })}
          ${checkOut.toLocaleString("default", { day: "2-digit" })}

        `}</div>
            <div className="each__filter">{guests} Guests</div>
          </div>
        </div>
        <div className="location__details">
          <div className="location__Name">{name}</div>
          <div className="location__location">{city}</div>
          <div className="location__unodescription">{dosDescription}</div>
          <div className="location__dosdescription">{unoDescription}</div>

          <div className="location__price">
            {" "}
            <div style={{ display: "flex" }}>
              <Icon fill="#000" size={15} svg="eth" /> {pricePerDay / 100}/ Day
            </div>
            <div className="guest__limit">{guests} {`Guest${guests!=="0" && "s"}`}</div>
          </div>
        </div>
        <div className="location__images">
          <img src={imgUrl} alt="" />
        </div>
      </div>
    </>
  );
};

export default SingleRental;
