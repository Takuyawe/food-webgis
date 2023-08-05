"use client";

import {
  useState,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";

import { Position, WeatherData, RestaurantData } from "@/app/_types/index";

const defaultPosition = {
  lat: 35.182253007459444,
  lng: 136.90534328438358,
};

interface ContextProps {
  mapRef: MutableRefObject<google.maps.Map | null>;
  currentPosition: Position;
  setCurrentPosition: (position: Position) => void;
  restaurantsList: RestaurantData;
  setRestaurantsList: (restaurants: RestaurantData) => void;
  targetedPlace: google.maps.places.PlaceResult;
  setTargetedPlace: (place: google.maps.places.PlaceResult) => void;
  weatherData: WeatherData;
  setWeatherData: (data: WeatherData) => void;
  isFoodBoxOpen: boolean;
  setIsFoodBoxOpen: (isOpen: boolean) => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  const [targetedPlace, setTargetedPlace] = useState<any>(null); // google.maps.places.PlaceResult[
  const [restaurantsList, setRestaurantsList] = useState<RestaurantData>([]);
  const [weatherData, setWeatherData] = useState<WeatherData>([]);
  const [isFoodBoxOpen, setIsFoodBoxOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        mapRef,
        currentPosition,
        setCurrentPosition,
        targetedPlace,
        setTargetedPlace,
        restaurantsList,
        setRestaurantsList,
        weatherData,
        setWeatherData,
        isFoodBoxOpen,
        setIsFoodBoxOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider",
    );
  }
  return context;
};
