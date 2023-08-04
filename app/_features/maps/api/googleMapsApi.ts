export const searchRestaurants = async (
  mapRef: any,
  setRestaurantsList: (restaurants: google.maps.places.PlaceResult[]) => void,
  lat: number,
  lng: number,
  minPrice?: number,
  maxPrice?: number,
  openNow?: boolean,
) => {
  const service = new google.maps.places.PlacesService(mapRef.current as any);

  const request = {
    location: new google.maps.LatLng(lat, lng),
    radius: 5000, // Search within a 500 meter radius
    type: "restaurant", // Look for places of type 'restaurant'
    language: "en", // English language results
    minPrice: minPrice,
    maxPrice: maxPrice,
    openNow: openNow,
  };

  service.nearbySearch(
    request,
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus,
      pagination: google.maps.places.PlaceSearchPagination | null,
    ) => {
      if (results && status === google.maps.places.PlacesServiceStatus.OK) {
        setRestaurantsList(results);
      }

      // run this to fetch more
      // if (pagination && pagination.hasNextPage) {
      //   pagination.nextPage();
      //   console.log(pagination);
      //   console.log(pagination.hasNextPage);
      // }
    },
  );
};

export const getPlaceDetails = async (
  mapRef: any,
  placeId: string,
): Promise<google.maps.places.PlaceResult | null> => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(mapRef.current as any);
    service.getDetails({ placeId: placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        resolve(place);
      } else {
        resolve(null);
      }
    });
  });
};

export type LatLng = {
  lat: number;
  lng: number;
};

export const getLocationDetails = (
  place: google.maps.places.PlaceResult,
): LatLng | undefined => {
  if (place.geometry && place.geometry.location) {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    return { lat, lng };
  }
};
