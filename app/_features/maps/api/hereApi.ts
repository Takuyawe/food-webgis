import { Position } from "@/app/_types";
import axios from "axios";
import { drawRouteOnGoogleMap } from "../utils/handleMap";

export const getDirection = async (
  mapRef: any,
  origin: Position,
  destination: Position,
) => {
  const originString = `${origin.lat},${origin.lng}`;
  const destinationString = `${destination.lat},${destination.lng}`;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/direction`,
      {
        params: {
          origin: originString,
          destination: destinationString,
        },
      },
    );
    console.log(response.data);
    if (response.data.routes.length === 0) throw new Error();
    const polylineData = response.data.routes[0].sections[0].polyline;
    console.log(polylineData);
    drawRouteOnGoogleMap(mapRef, polylineData);
  } catch (error) {
    console.log(error);
  }
};
