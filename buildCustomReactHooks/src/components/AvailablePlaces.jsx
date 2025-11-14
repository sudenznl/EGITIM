import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

//burada bir veri alma işlevi olarak kullanılması gereken fetchSortedPlaces işlevidir.
async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();
  //bu react'a özgü değil, standart bir js özelliğidir ve söz vermeyen bir özelliği ve API'i sözde dayalı bir özelliğe dönüştürmek içi standart bir js modeli ve  yaklaşımıdır.
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  //mevcut yerleri getir ve boş diziyi başlangıç değeri olarak geçiyoruz.
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
    setFetchedData: setAvailablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
