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
    <div className="h-full flex flex-col">
      <div className="relative flex-grow w-full">
        <div className="flex flex-wrap items-center m-2">
          {foodCategoryList.map((foodCategory) => (
            <Button
              className="h-5 max-w-xs m-1 rounded-md text-black	bg-white hover:bg-blue-100"
              variant="outlined"
              key={foodCategory}
            >
              {foodCategory}
            </Button>
          ))}
        </div>
      </div>
      <Divider className="border-b-2 my-1" />
      <div className="relative h-1/5 w-full">
        <div className="flex justify-around items-center mx-4">
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
    </div>
  );
};

export default FilterComponent;
