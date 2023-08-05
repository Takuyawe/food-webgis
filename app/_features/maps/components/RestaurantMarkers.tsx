import { useCustomContext } from "@/app/_context/context";
import { Marker, MarkerClusterer } from "@react-google-maps/api";
import { Fragment } from "react";

const options = {
  gridSize: 50,
  maxZoom: 15,
};

const MarkersComponent = () => {
  const { restaurantsList } = useCustomContext();

  const getLocation = (restaurant: google.maps.places.PlaceResult) => {
    let lat = restaurant.geometry?.location?.lat();
    let lng = restaurant.geometry?.location?.lng();

    if (lat === undefined || lng === undefined) {
      lat = 0;
      lng = 0;
    }

    return { lat, lng };
  };

  console.log(restaurantsList);

  // todo: filter restaurants

  return (
    <MarkerClusterer options={options} zoomOnClick>
      {(clusterer) => (
        <Fragment>
          {restaurantsList.map((restaurant) => (
            <Marker
              position={getLocation(restaurant)}
              clusterer={clusterer}
              key={restaurant.id}
              //   label={"名古屋城"}
              icon="/restaurant.png"
            />
          ))}
        </Fragment>
      )}
    </MarkerClusterer>
  );
};

export default MarkersComponent;
