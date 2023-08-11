"use client";

import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  Libraries,
} from "@react-google-maps/api";
import { useState } from "react";
import { useCustomContext } from "@/app/_context/context";
import { useMediaQuery } from "react-responsive";
import RestaurantMarkers from "./RestaurantMarkers";
import TargetLocationMarker from "./TargetLocationMarker";
import Direction from "./Direction";

const defaultCenter = {
  lat: 37.7749295,
  lng: -122.4194155,
};

const mobileMapOptions = {
  disableDefaultUI: true,
  scaleControl: true,
};

const desktopMapOptions = {
  disableDefaultUI: true,
  scaleControl: true,
  zoomControl: true,
  streetViewControl: true,
};

const MapComponent = () => {
  const { mapRef, directionMode } = useCustomContext();
  const [libraries] = useState<Libraries>(["places", "geometry"]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: libraries,
  });

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const container = {
    width: "100%",
    height: "100vh",
  };

  return (
    <>
      {isLoaded ? (
        <div>
          <GoogleMap
            mapContainerStyle={container}
            center={defaultCenter}
            zoom={15}
            options={isSmallScreen ? mobileMapOptions : desktopMapOptions}
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
