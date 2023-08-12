import { Fragment, useEffect, useState } from "react";
import WeatherBox from "@/app/_features/maps/components/WeatherBox";
import FilterComponent from "./FilterComponent";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton } from "@mui/material";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface Props {
  component: string;
}

const SlideMenu = (props: Props) => {
  const [showBox, setShowBox] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<{
    left: number;
    right: number;
    top: number;
    bottom: number;
  }>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    setBounds({ left: 0, right: window.innerWidth - 45, top: 0, bottom: 0 });
  }, []);

  const handleStop = () => {
    if (boxPosition.x < 200) {
      setShowBox(false);
      setBoxPosition({ x: 0, y: 0 });
    }
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setBoxPosition({
      x: data.x,
      y: data.y,
    });

    if (data.x < 200) {
      setShowBox(true);
    }
  };

  return (
    <Draggable
      axis="x"
      bounds={bounds}
      onStop={handleStop}
      onDrag={handleDrag}
      position={boxPosition}
    >
      <div
        className={`absolute ${
          props.component === "weather" ? "top-20 h-36" : "top-36 h-44"
        } left-0 ${showBox ? "w-full z-10" : "w-12"} flex`}
      >
        <div className="relative top-0 h-1/3 w-12 bg-white flex justify-center items-center rounded-r-full">
          <IconButton>
            {props.component === "weather" ? (
              <WbSunnyIcon className="text-gray-700" />
            ) : (
              <FilterListIcon className="text-gray-700" />
            )}
          </IconButton>
        </div>
        <div
          className={`${
            showBox ? "block" : "hidden"
          } relative top-0 -left-full h-full w-full bg-white`}
        >
          {props.component === "weather" ? <WeatherBox /> : <FilterComponent />}
        </div>
      </div>
    </Draggable>
  );
};

export default SlideMenu;
