import { Button } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useCustomContext } from "@/app/_context/context";
import { fetchRestaurantsData } from "../api/yelpApi";

const SearchThisArea = () => {
  const { mapRef, setRestaurantsList } = useCustomContext();

  const handleClick = () => {
    const lat = mapRef.current?.getCenter()?.lat();
    const lng = mapRef.current?.getCenter()?.lng();
    if (!lat || !lng) return;
    fetchRestaurantsData(setRestaurantsList, lat, lng);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="h-12 text-black bg-white hover:bg-gray-100 rounded-3xl"
        onClick={handleClick}
      >
        <SearchRoundedIcon className="mr-2 text-blue-700" />
        Search This Area
      </Button>
    </div>
  );
};

export default SearchThisArea;
