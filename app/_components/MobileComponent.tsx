"use client";

import { useCustomContext } from "../_context/context";
import Geocoding from "../_features/maps/components/Geocoding";
import MapComponent from "../_features/maps/components/MapComponent";
import BottomMenuBar from "./Mobile/BottomMenuBar";
import RestaurantCards from "./Mobile/RestaurantCards";

const MobileComponent = () => {
  const { isFoodBoxOpen } = useCustomContext();

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">
      <div className="flex-grow">
        <MapComponent />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3">
        {isFoodBoxOpen && (
          <div className="relative h-5/6 w-full">
            <RestaurantCards />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/6">
          <BottomMenuBar />
        </div>
      </div>
      <div className="absolute top-4 left-0 right-0 mx-auto">
        <Geocoding />
      </div>
    </div>
  );
};

export default MobileComponent;
