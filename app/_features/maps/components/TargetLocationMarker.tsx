import { useCustomContext } from "@/app/_context/context";
import { Marker } from "@react-google-maps/api";

const getCoordinates = (location: any) => {
  return {
    lat: location.lat(),
    lng: location.lng(),
  };
};

const TargetLocationMarker = () => {
  const { targetedPlace } = useCustomContext();

  if (!targetedPlace) return null;

  return (
    <Marker
      position={getCoordinates(targetedPlace.geometry?.location)}
      icon="/google-maps.png"
    />
  );
};

export default TargetLocationMarker;
