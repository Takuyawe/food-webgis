import { useCustomContext } from "@/app/_context/context";

const TargetLocationMarker = () => {
  const { targetedPlace } = useCustomContext();

  return <div>TargetLocationMarker</div>;
};

export default TargetLocationMarker;
