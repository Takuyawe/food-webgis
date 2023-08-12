import { useCustomContext } from "@/app/_context/context";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import {
  getIsOpen,
  getOpenStatusColor,
  getPriceLevel,
  getRating,
} from "@/app/_features/maps/utils/restaurnatCard";
import { getStars } from "@/app/_features/maps/utils/getStars";
import { getDirection } from "@/app/_features/maps/api/hereApi";
import { Position } from "@/app/_types";

const RestaurantDetailCard = () => {
  const {
    mapRef,
    targetedPlace,
    targetedRestaurant,
    setIsDetailBoxOpen,
    setDirectionMode,
  } = useCustomContext();

  if (!targetedRestaurant) return null;

  const handleCancelClick = () => {
    setIsDetailBoxOpen(false);
  };

  const handleDirectionClick = () => {
    setDirectionMode(true);
    setIsDetailBoxOpen(false);
  };

  //   const handleDirectionClick = () => {
  //     const origin = targetedPlace?.geometry?.location?.toJSON() as Position;
  //     const destination = targetedRestaurant.coordinates;
  //     getDirection(mapRef, origin, destination);
  //   };

  return (
    <Box
      bgcolor="#ffffff"
      height="100%"
      width="100%"
      borderRadius="1.5rem"
      display="flex"
      flexDirection="column"
    >
      <div className="relative h-1/5 rounded-t-3xl overflow-hidden">
        <Image
          src={targetedRestaurant.image || "/image_not_available.png"}
          alt={targetedRestaurant.name || "Restaurnat Image"}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-2 right-2">
          <IconButton className="p-0" onClick={handleCancelClick}>
            <CancelRoundedIcon className="text-3xl text-white" />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col justify-around h-3/5 ml-2">
        <Typography variant="subtitle1" color="black">
          {targetedRestaurant.name}
        </Typography>
        <div className="flex">
          {targetedRestaurant.categories.map((category, i) => (
            <Typography
              className="text-gray-700 text-xs"
              key={`${category.alias}-${i}`}
            >
              #{category.title} &nbsp;
            </Typography>
          ))}
        </div>
        <Box display="flex">
          <Typography
            className="text-gray-600 mt-1 mr-1"
            variant="body2"
            color="gray"
          >
            {getRating(targetedRestaurant.rating)}
          </Typography>
          <div>{getStars(targetedRestaurant.rating)}</div>
          <Typography className="text-gray-600 mt-1 ml-1" variant="body2">
            ({targetedRestaurant.reviewCount})
          </Typography>
        </Box>
        <Typography className="text-xs" color="gray">
          Price Level: {getPriceLevel(targetedRestaurant.priceLevel)}
        </Typography>
        <div className="flex">
          <Typography className="text-gray-700 text-xs">
            Opening Status: &nbsp;
          </Typography>
          <Typography
            className="text-xs"
            color={getOpenStatusColor(getIsOpen(targetedRestaurant.isClosed))}
          >
            {getIsOpen(targetedRestaurant.isClosed)}
          </Typography>
        </div>
        <Typography className="text-gray-700 text-xs">
          {targetedRestaurant.displayAddress}
        </Typography>
        <Typography className="text-gray-700 text-xs">
          {targetedRestaurant.displayPhone}
        </Typography>
        <div>
          <a
            href={targetedRestaurant.url}
            className="text-blue-600 hover:text-blue-400 text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Restaurant URL
          </a>
        </div>
      </div>
      <Divider className="border-b-1 my-1" />
      <div className="h-1/6 flex justify-around items-center">
        <div className="flex flex-col items-center">
          <IconButton onClick={handleDirectionClick}>
            <AssistantDirectionIcon className="text-lg text-blue-600 hover:text-blue-500" />
          </IconButton>
          <Typography className="text-blue-700 text-xs">Directions</Typography>
        </div>

        <div className="flex flex-col items-center">
          <IconButton>
            <BookmarkBorderIcon className="text-lg text-blue-600 hover:text-blue-500" />
          </IconButton>
          <Typography className="text-blue-700 text-xs">Save</Typography>
        </div>
        <div className="flex flex-col items-center">
          <IconButton>
            <SearchIcon className="text-lg text-blue-600 hover:text-blue-500" />
          </IconButton>
          <Typography className="text-blue-700 text-xs">Search</Typography>
        </div>
      </div>
    </Box>
  );
};

export default RestaurantDetailCard;
