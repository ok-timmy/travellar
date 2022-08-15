import React, { useEffect, useState } from "react";
import { 
  // Map, 
  // Marker, 
  GoogleApiWrapper } from "google-maps-react";

function RentalsMap({ location, google, setHighlight }) {
  console.log(location);
  const [center, setCenter] = useState();
  useEffect(() => {
    var arr = Object.keys(location);
    var getLat = (key) => location[key]["lat"];
    var avgLat = arr.reduce((a, c) => a + Number(getLat(c)), 0) / arr.length;

    var getLng = (key) => location[key]["lng"];
    var avgLng = arr.reduce((a, c) => a + Number(getLng(c)), 0) / arr.length;

    setCenter({ lat: avgLat, lng: avgLng });
  }, [location]);

  return (
    <>
      {center && (
        // <Map
        //   google={google}
        //   containerStyle={{
        //     width: "50vw",
        //     height: "calc(100vh -135px)",
        //   }}
        //   center={center}
        //   initialCenter={location[0]}
        //   zoom={13}
        //   disableDefaultUI={true}
        // >
        //   {location.map((coords, i) => {
        //     // return <Marker key={i} position={coords} onClick={() => setHighlight(i)} />
        //     return (
        //       );
        //     })}
        // </Map>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186585.46662873027!2d-79.22812166783059!3d43.054097959569035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d3445eec824db9%3A0x46d2c56156bda288!2sNiagara%20Falls%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sng!4v1660382336177!5m2!1sen!2sng"
          width="600"
          height="450"
          // style="border:0;"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAhLGd--WJUmpOA_TTkLU0anManjRrCTG8",
})(RentalsMap);
