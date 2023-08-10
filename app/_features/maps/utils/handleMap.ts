import { MutableRefObject } from "react";

export const drawRouteOnGoogleMap = (
  mapRef: MutableRefObject<google.maps.Map>,
  polylineData: any,
) => {
  const polyline = new google.maps.Polyline({
    path: google.maps.geometry.encoding.decodePath(polylineData),
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 20,
  });

  polyline.setMap(mapRef.current);

  //   const bounds = new google.maps.LatLngBounds();
  //   polyline.getPath().forEach((location) => bounds.extend(location));
  //   mapRef.current.fitBounds(bounds);
};
