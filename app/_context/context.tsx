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

import {
  Position,
  WeatherData,
  Restaurant,
  RestaurantData,
} from "@/app/_types/index";

const defaultPosition = {
  lat: 35.182253007459444,
  lng: 136.90534328438358,
};

interface ContextProps {
  mapRef: MutableRefObject<google.maps.Map | null>;
  restaurantsList: RestaurantData;
  setRestaurantsList: (restaurants: RestaurantData) => void;
  targetedPlace: google.maps.places.PlaceResult | null;
  setTargetedPlace: (place: google.maps.places.PlaceResult) => void;
  weatherData: WeatherData;
  setWeatherData: (data: WeatherData) => void;
  isFoodBoxOpen: boolean;
  setIsFoodBoxOpen: (isOpen: boolean) => void;
  targetedRestaurant: Restaurant | null;
  setTargetedRestaurant: (restaurant: Restaurant) => void;
  isDetailBoxOpen: boolean;
  setIsDetailBoxOpen: (isOpen: boolean) => void;
  showSearchButton: boolean;
  setShowSearchButton: (show: boolean) => void;
  directionMode: boolean;
  setDirectionMode: (mode: boolean) => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [targetedPlace, setTargetedPlace] =
    useState<google.maps.places.PlaceResult | null>(null); // google.maps.places.PlaceResult[
  const [restaurantsList, setRestaurantsList] = useState<RestaurantData>([]);
  const [weatherData, setWeatherData] = useState<WeatherData>([]);
  const [isFoodBoxOpen, setIsFoodBoxOpen] = useState(false);
  const [targetedRestaurant, setTargetedRestaurant] =
    useState<Restaurant | null>(null);
  const [isDetailBoxOpen, setIsDetailBoxOpen] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [directionMode, setDirectionMode] = useState(false);

  return (
    <Context.Provider
      value={{
        mapRef,
        targetedPlace,
        setTargetedPlace,
        restaurantsList,
        setRestaurantsList,
        weatherData,
        setWeatherData,
        isFoodBoxOpen,
        setIsFoodBoxOpen,
        targetedRestaurant,
        setTargetedRestaurant,
        isDetailBoxOpen,
        setIsDetailBoxOpen,
        showSearchButton,
        setShowSearchButton,
        directionMode,
        setDirectionMode,
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
