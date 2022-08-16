import React from "react";
import "./Home.css";
import lensfix from "../../images/lensfix.jpg";
import maldives from "../../images/maldives.jpg";
import santorini from "../../images/santorini.jpg";
import crypto2 from "../../images/crypto2.png";
import aeroLogo from "../../images/aero-logo.png";
import { ConnectButton } from "web3uikit";
import Filter from "../../components/filter/Filter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper";
import "swiper/swiper-bundle.css";
import Footer from "../../components/Footer/Footer";
import User from "../../components/User/User";
import { useMoralis } from "react-moralis";

const Home = () => {
  const { account } = useMoralis();

  return (
    <div className="home__page">
      <div className="header">
        <div>
          <img className="logo" src={aeroLogo} alt="logo" />
        </div>

        <div className="lrContainers">
        {account && <User account={account} />}
          <ConnectButton />
        </div>
      </div>
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
          <SwiperSlide className="swiper__slide">
            <img src={maldives} alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper__slide">
            <img src={lensfix} alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper__slide">
            <img src={santorini} alt="" />
          </SwiperSlide>
        </div>
      </Swiper>

      <div>
        <div className="explore__div">
          <p className="explore__header">Explore Locations</p>
         <div> <Filter /> </div>
        </div>
      </div>

      <div className="features__div">
        <div className="feature__div">
          <i className="bi bi-airplane"></i>
          <div>
            <h2>Exclusive Trips</h2>
            <p>
              Enjoy Exclusive First Class trips to any destination of your
              choice
            </p>
          </div>
        </div>
        <div className="feature__div">
          <i className="bi bi-clock"></i>
          <div>
            <h2>Fast Bookings</h2>
            <p>
              Enjoy Exclusive First Class trips to any destination of your
              choice
            </p>
          </div>
        </div>
        <div className="feature__div">
          <i className="bi bi-geo-alt"></i>
          <div>
            <h2>Top Locations</h2>
            <p>
              Enjoy Exclusive First Class trips to any destination of your
              choice
            </p>
          </div>
        </div>
      </div>

      <div className="crypto__section">
        <div className="crypto__description">
          <p className="crypto__header">Pay In Ethereum</p>
          <p>Accepts Cryptocurrency Payment</p>
          {/* <ul>
            <li>Seamless Payment</li>
            <li>Payment in Ethereum, Matic and BNB</li>
            <li></li>
          </ul> */}
        </div>
        <div className="crypto__image">
          <img src={crypto2} alt="" />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
