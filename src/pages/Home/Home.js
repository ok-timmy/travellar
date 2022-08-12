import React from "react";
import "./Home.css";
import bg from "../../images/frontpagebg2.png";
import logo from "../../images/airbnbRed.png";
import { ConnectButton,  Button } from "web3uikit";
import Filter from "../../components/filter/Filter";

const Home = () => {
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
       
        <Filter/>
      </div>

      <div className="randomLocation">
        <div>Feel Adventurous</div>
        <div className="text">
          Let us Decide and discover new places to stay, live, work or just relax.
        </div>
        <Button text="Explore A location" />
      </div>
    </>
  );
};

export default Home;
