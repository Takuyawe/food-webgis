import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { Typography } from "@mui/material";

const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
      <Typography variant="h6" className="text-gray-700">
        Searching restaurants...
      </Typography>
    </div>
  );
};

export default LoadingComponent;
