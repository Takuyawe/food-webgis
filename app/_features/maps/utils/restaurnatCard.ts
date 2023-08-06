export const getIsOpen = (isClosed: boolean) => {
  return isClosed ? "Closed" : "Open";
};

export const getOpenStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "green";
    case "Closed":
      return "red";
    default:
      return "gray";
  }
};

export const getPriceLevel = (priceLevel: string | undefined) => {
  if (priceLevel) {
    return priceLevel;
  } else {
    return "Unknown";
  }
};

export const getRating = (rating: number | undefined) => {
  return rating ? rating.toFixed(1) : "Unknown";
};

export const priceLevelToNumber = (priceLevel: string) => {
  switch (priceLevel.toLowerCase()) {
    case "$":
      return 1;
    case "$$":
      return 2;
    case "$$$":
      return 3;
    case "$$$$":
      return 4;
    default:
      return 0;
  }
};
