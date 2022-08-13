import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import "./SingleRental.css";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Button, Icon, useNotification } from "web3uikit";
import { TransactionContext } from "../../components/Context/ContextWrapper";
import Slider from "react-slick";

const SingleRental = () => {
  const dispatch = useNotification();
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const { destination, checkIn, checkOut, guests} = useContext(TransactionContext);
  const { state: values } = useLocation();
  console.log(values);
  const {
    imgUrl,
    location,
    name,
    pricePerDay,
    uid_decimal,
    pricePerDay_decimal,
    details,
    dosDescription,
  } = values;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // slidesToScroll: 1
  }

  const x = details[0].replaceAll("'", '"');
  console.log(details);

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
          ${new Date(checkIn).toLocaleString("default", { month: "short" })}
          ${new Date(checkIn).toLocaleString("default", { day: "2-digit" })}
          - 
           ${new Date(checkOut).toLocaleString("default", { month: "short" })}
           ${new Date(checkOut).toLocaleString("default", { day: "2-digit" })}

        `}</div>
            <div className="each__filter">{guests} Guests</div>
          </div>
        </div>
        <div className="location__details">
          <div className="location__upper">
            <div className="location__Name">{name}</div>
            <div className="location__location">
            <i className="bi bi-geo-alt"></i> {location[0]}, {location[1]}
            </div>
            <div className="location__unodescription">
              <span><i className="bi bi-door-open"></i> {JSON.parse(x).rooms} Rooms</span>
              <span> <i className="bi bi-person"></i> {JSON.parse(x).guests} Guests</span>
            </div>
          </div>
          <div className="location__lower">
            <div className="location__dosdescription">
              {" "}
              {/* I made a mistake while writing the data to the contract, hence I had to Make up for it on the front end, hence this weird line */}
              {dosDescription.split("</p>").map((m, i) => {
                return (
                  <p key={i} className="location__synopsis">
                    {m.slice(3)}
                  </p>
                );
              })}
            </div>

            <div className="book__section">
             <div style={{display: "flex", alignSelf:"center"}}> <Icon fill="blue" size={15} svg="eth" /> {pricePerDay / 100}/ Day</div>
              <Button
                text="Book Here"
                onClick={() => {
                  if (account) {
                    bookRental(
                      checkIn,
                      checkOut,
                      uid_decimal.value.$numberDecimal,
                      Number(pricePerDay_decimal.value.$numberDecimal)
                    );
                  } else {
                    handleNoAccount();
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="location__images">
          {/* <img src={imgUrl} alt="" /> */}
          <Slider
        {...settings}
          >
            {imgUrl.map((image_url)=> {
              return <img src={image_url} alt="" key={image_url}/>
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default SingleRental;
