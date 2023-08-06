import { useState, useCallback, Fragment } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { useCustomContext } from "@/app/_context/context";

const Direction = () => {
  const { mapRef, targetedPlace, targetedRestaurant } = useCustomContext();
  const [currentDirection, setCurrentDirection] =
    useState<google.maps.DirectionsResult | null>(null);

  const currentPosition = targetedPlace?.geometry?.location?.toJSON();
  const destination = targetedRestaurant?.coordinates;

  console.log("currentPosition", currentPosition);
  console.log("destination", destination);

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus,
    ) => {
      if (status === google.maps.DirectionsStatus.OK) {
        if (
          currentDirection === null ||
          (result !== null &&
            result.geocoded_waypoints?.length !==
              currentDirection.geocoded_waypoints?.length)
        ) {
          console.log("Route changed or first time route fetched");
          setCurrentDirection(result);
        } else {
          console.log("Route not changed");
        }
      }
    },
    [currentDirection],
  );

  console.log("currentDirection", currentDirection);

  if (!currentPosition || !destination) return null;

  return (
    <Fragment>
      <DirectionsService
        options={{
          origin: currentPosition,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          //   optimizeWaypoints: true,
          //   waypoints: transitPoints,
        }}
        callback={directionsCallback}
      />
      {currentDirection !== null && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
          }}
        />
      )}
    </Fragment>
  );
};

export default Direction;
