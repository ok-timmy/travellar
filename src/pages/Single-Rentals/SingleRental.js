import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SingleRental.css";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  Button,
  Card,
  DatePicker,
  Icon,
  Modal,
  useNotification,
} from "web3uikit";
import { TransactionContext } from "../../components/Context/ContextWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper";
import "swiper/swiper-bundle.css";

const SingleRental = () => {
  const dispatch = useNotification();
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const { destination, checkIn, checkOut, guests, setCheckOut, setCheckIn } =
    useContext(TransactionContext);
  const { state: values } = useLocation();
  // console.log(values);
  const [isVisible, setIsVisible] = useState(false);
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


  const x = details[0].replaceAll("'", '"');
  console.log(details);

  //Handle Success Notification
  const handleSuccess = () => {
    dispatch({
      type: "success",
      message: `Great! You have booked ${name}`,
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
      contractAddress: "0x6B7fA1B140E49D0D7cdcC8ddcA66053AbDB31615",
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
        setIsVisible(false);
      },
      onError: (error) => {
        handleError(error.error.message);
      },
    });
  };

  return (
    <>
      <div className="location__page">
        <div className="location__details">
          <div className="location__upper">
            <div>
              <button className="go__back">
                <i class="bi bi-arrow-left"></i> Go Back
              </button>
            </div>
            <div className="location__Name">{name}</div>
            <div className="location__location">
              <i className="bi bi-geo-alt"></i> {location[0]}, {location[1]}
            </div>
            <div className="location__unodescription">
              <span>
                <i className="bi bi-door-open"></i> {JSON.parse(x).rooms} Rooms
              </span>
              <span>
                {" "}
                <i className="bi bi-person"></i> {JSON.parse(x).guests} Guests
              </span>
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
              <div style={{ display: "flex", alignSelf: "center" }}>
                {" "}
                <Icon fill="blue" size={15} svg="eth" /> {pricePerDay / 100}/
                Day
              </div>
              <Button text="Book Now" onClick={() => setIsVisible(true)} />

              <Modal
                onCloseButtonPressed={() => setIsVisible(false)}
                hasFooter={false}
                title={`Confirm Reservation`}
                isVisible={isVisible}
                width="auto"
              >
                <div style={{ width: "20rem" }}>
                  <Card isDisabled title={`Destination: ${name}`}>
                    <div>
                      <img
                        src={imgUrl[0]}
                        alt="Location"
                        width={"180px"}
                        height={"100px"}
                      />
                    </div>
                  </Card>
                  <div style={{ display: "flex" }}>
                    <div className="inputs">
                      Check In
                      <DatePicker
                        id="CheckIn"
                        value={checkIn}
                        onChange={(event) =>
                          setCheckIn(event.date)
                        }
                      />
                    </div>
                    <div className="inputs">
                      Check Out{" "}
                      <DatePicker
                        id="CheckOut"
                        value={checkOut}
                        onChange={(event) =>
                          setCheckOut(event.date)
                        }
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "1rem 0",
                    }}
                  >
                    <div>
                      {guests} {`Guest${guests !== "1" && "s"}`}
                    </div>
                    <Button
                      text="Confirm"
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
              </Modal>
            </div>
          </div>
        </div>
        {/* <div > */}
        <Swiper
          modules={[Navigation, EffectFade]}
          navigation
          effect={"fade"}
          speed={1500}
          slidesPerView={1}
          loop
          className="my__swiper"
        >
          <div className="location__images">
            {imgUrl.map((image_url) => {
              return (
                <SwiperSlide key={image_url} className="swiper__slide">
                  <img src={image_url} alt="" />
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
        {/* </div> */}
      </div>
    </>
  );
};

export default SingleRental;
