"use client";

import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  Libraries,
} from "@react-google-maps/api";
import { useState } from "react";
import { useCustomContext } from "@/app/_context/context";
import RestaurantMarkers from "./RestaurantMarkers";

const container = {
  width: "100%",
  height: "100vh",
};

const MapComponent = () => {
  const { mapRef, currentPosition } = useCustomContext();
  const [libraries] = useState<Libraries>(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: libraries,
  });

  return (
    <>
      {isLoaded ? (
        <div>
          <GoogleMap
            mapContainerStyle={container}
            center={currentPosition}
            zoom={15}
            options={{
              disableDefaultUI: true,
              scaleControl: true,
              zoomControl: true,
              streetViewControl: true,
            }}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            <RestaurantMarkers />
          </GoogleMap>
          {/* todo: ondrag and update current location */}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MapComponent;
