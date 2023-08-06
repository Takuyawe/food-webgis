import { useCustomContext } from "@/app/_context/context";
import { Marker, MarkerClusterer } from "@react-google-maps/api";
import { Fragment } from "react";
import { Restaurant } from "@/app/_types";
import { Position } from "@/app/_types";

const options = {
  gridSize: 50,
  maxZoom: 15,
};

const adjustCoordinates = (coordinates: Position) => {
  const adjustedLat = coordinates.lat - 0.0005;
  const adjustedLng = coordinates.lng - 0.0015;
  return {
    lat: adjustedLat,
    lng: adjustedLng,
  };
};

const MarkersComponent = () => {
  const {
    mapRef,
    restaurantsList,
    setTargetedRestaurant,
    setIsDetailBoxOpen,
    setDirectionMode,
  } = useCustomContext();

  console.log(restaurantsList);

  console.log("map", mapRef.current);

  const handleClick = (restaurant: Restaurant) => {
    return () => {
      setDirectionMode(false);
      setTargetedRestaurant(restaurant);
      mapRef.current?.setZoom(18);
      mapRef.current?.setCenter(adjustCoordinates(restaurant.coordinates));
      setIsDetailBoxOpen(true);
    };
  };

  // todo: filter restaurants

  return (
    <MarkerClusterer options={options} zoomOnClick>
      {(clusterer) => (
        <Fragment>
          {restaurantsList.map((restaurant: Restaurant) => (
            <Marker
              position={restaurant.coordinates}
              clusterer={clusterer}
              key={restaurant.id}
              //   label={"名古屋城"}
              icon="/restaurant.png"
              // animation={google.maps.Animation.BOUNCE}
              onClick={handleClick(restaurant)}
            />
          ))}
        </Fragment>
      )}
    </MarkerClusterer>
  );
};

export default MarkersComponent;
