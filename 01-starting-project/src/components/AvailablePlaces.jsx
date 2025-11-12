import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from '../http.js';

// local storege veriyi tarayıca kalıcı olarak saklar. yerel depolama sayesinde eş zamanlı olarak erişebiliriz ve getirdiğimiz verş anında orada olur.
// const places = localStorage.getItem();

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  //useState'i içe aktararak mevcut yerleri state ile yönetebiliriz.
  //başlangıçta sahip olduğumuz mevcut yerler dizisi yerel depolamadan getirilebilir.
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    // effect fonksiyonun içinde await kullanmak için yeni bir fonksiyon oluşturmak daha sağlıklıdır
    // (cleanup ile çakışmaması için):
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message ||
            "Mevcut yerler alınamadı, lütfen daha sonra tekrar deneyin.",
        });
        setIsFetching(false);
      }
    }

    //yukarıda tanımladık burada çağırdık:
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Mevcut yerler getiriliyor..."
      fallbackText="Mevcut bir yere sahip değilsiniz"
      onSelectPlace={onSelectPlace}
    />
  );
}
