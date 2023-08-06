"use client";

import { Button, Divider } from "@mui/material";
import { useState } from "react";

const foodCategoryList = [
  "curry",
  "ramen",
  "sushi",
  "Teriyaki",
  "soba",
  "udon",
  "sashimi",
  "sake",
  "sukiyaki",
  "tempura",
  "bread",
  "pasta",
];

const PriceList = ["$", "$$", "$$$", "$$$$"];

// const DistanceList = ["~1km", "~5km", "~10km", "~25km"];

const FilterComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedDistance, setSelectedDistance] = useState<string>("");

  return (
    <div>
      <Divider className="border-b-2 my-2" />
      <div className="relative h-3/5 w-full">
        <div className="flex flex-wrap items-center mx-8">
          {foodCategoryList.map((foodCategory) => (
            <Button
              className="h-5 max-w-xs m-2 rounded-md text-black	bg-white hover:bg-blue-100"
              variant="outlined"
              key={foodCategory}
            >
              {foodCategory}
            </Button>
          ))}
        </div>
      </div>
      <Divider className="border-b-2 my-2" />
      <div className="relative h-1/5 w-full">
        <div className="flex justify-around items-center mx-8">
          {PriceList.map((Price) => (
            <Button
              className="h-5 max-w-xs m-2 rounded-md text-black	bg-white hover:bg-blue-100"
              variant="outlined"
              key={Price}
            >
              {Price}
            </Button>
          ))}
        </div>
      </div>
      <Divider className="border-b-2 my-2" />
      {/* <div className="relative h-1/5 w-full">
        <div className="flex justify-around items-center mx-8">
          {DistanceList.map((Distance) => (
            <Button
              className="h-5 max-w-xs m-2 rounded-md text-black	bg-white hover:bg-blue-100"
              variant="outlined"
              key={Distance}
            >
              {Distance}
            </Button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default FilterComponent;
