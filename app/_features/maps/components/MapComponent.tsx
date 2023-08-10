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
import TargetLocationMarker from "./TargetLocationMarker";
import Direction from "./Direction";

const container = {
  width: "100%",
  height: "100vh",
};

const defaultCenter = {
  lat: 37.7749295,
  lng: -122.4194155,
};

const MapComponent = () => {
  const { mapRef, directionMode } = useCustomContext();
  const [libraries] = useState<Libraries>(["places", "geometry"]);

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
            center={defaultCenter}
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
            <TargetLocationMarker />
            {directionMode && <Direction />}
          </GoogleMap>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MapComponent;
