"use client";

import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { ListItem } from "@mui/material";
import { fetchWeatherData } from "@/app/_features/maps/api/weatherApi";
import {
  getLocationDetails,
  getPlaceDetails,
  searchRestaurants,
} from "../api/googleMapsApi";
import { useCustomContext } from "@/app/_context/context";
import { fetchRestaurantsData } from "../api/yelpApi";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.

const autocompleteService = { current: null };

// todo:move to types/index.ts
interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

const Geocoding = () => {
  const {
    mapRef,
    setTargetedPlace,
    setRestaurantsList,
    setWeatherData,
    setIsFoodBoxOpen,
    setShowSearchButton,
  } = useCustomContext();
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly PlaceType[]>([]);

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleClick = async (newValue: any, options: any) => {
    if (newValue) {
      console.log("newPlace", newValue);

      const place = await getPlaceDetails(mapRef, newValue.place_id);

      if (place) {
        setTargetedPlace(place);

        const location = getLocationDetails(place);

        if (location) {
          const { lat, lng } = location;
          mapRef.current?.setCenter({ lat, lng });

          // searchRestaurants(mapRef, setRestaurantsList, lat, lng);
          fetchRestaurantsData(setRestaurantsList, lat, lng);
          fetchWeatherData(setWeatherData, lat, lng);
          setIsFoodBoxOpen(true);
          setShowSearchButton(true);
        }
      }
    }
  };

  // rounded propertry
  // rounded-3xl

  return (
    <Autocomplete
      id="google-map-geocoding"
      className="w-96 bg-white"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        handleClick(newValue, options);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select Your Location" fullWidth />
      )}
      renderOption={(props, option, index) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ]),
        );
        // console.log(option.structured_formatting.main_text);

        return (
          <ListItem
            {...props}
            key={`${option.structured_formatting.main_text}-${option.structured_formatting.secondary_text}-${index}`}
          >
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={`${part.text}-${index}`}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        );
      }}
    />
  );
};

export default Geocoding;
