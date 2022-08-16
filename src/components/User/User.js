import React, { useEffect, useState } from "react";
import {Card, Icon, Modal} from "web3uikit"
import {useMoralis} from "react-moralis";

function User({account}) {
  const [isVisible, setIsVisible] = useState(false);
  const [userRentals, setUserRentals] = useState();
  const {Moralis} = useMoralis();

   useEffect(() => {
    const fetchUserRentals = async() => {
      const Rentals = Moralis.Object.extend("BookedDates");
      const query = new Moralis.Query(Rentals);
      // console.log(query);
      query.equalTo("booker", account);
      const result = await query.find();
      // console.log(result);

      setUserRentals(result);
    }

    fetchUserRentals();
   }, [isVisible])
   console.log(userRentals);

  return (
    <>
      <div onClick={()=> {setIsVisible(true)}} style={{cursor:"pointer"}}>
        <Icon svg="user" size={24} fill="#000" />
      </div>

      <Modal
      onCloseButtonPressed={()=> setIsVisible(false)}
      hasFooter={false}
      title="Your Confirmed Bookings"
      isVisible={isVisible}
      >
        <div style={{display: "flex", justifyContent: "flex-start", flexWrap: "wrap", gap:"10px"}}>
          {
            userRentals &&
              userRentals.map((e)=> {
                return  <div key={e.id} style={{width: "200px"}}>
                  <Card
                  isDisabled
                  title={e.attributes.city}
                  description={`${e.attributes.datesBooked[0]} for ${e.attributes.datesBooked.length} Days`}
                  >
                    <div>
                      <img src={e.attributes.imgUrl[1]} alt="Location" width={"180px"}/>
                    </div>

                  </Card>
                </div>
              })}
        </div>

      </Modal>
    </>
  );
}

export default User;
