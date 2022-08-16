import React, { useEffect, useState } from "react";

function RentalsMap({location}) {
  const [center, setCenter] = useState();
  useEffect(() => {
   if (location){ 
    setCenter({ lat: location.lat, lng: location.lng });}
  }, [location]);

  // console.log(center);

  return (
    <>
        <iframe
          title="map"
          src={`https://maps.google.com/maps?q=${center !== undefined ? Number(center.lat) :0},${center !== undefined? Number(center.lng) :0}&hl=en&z=12&output=embed`}
          width="100%"
          height="99%"
          // style="border:0;"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    </>
  );
}


export default RentalsMap;
