import { useState } from 'react';
import Places from './Places.jsx';
import { use } from 'react';

// local storege veriyi tarayıca kalıcı olarak saklar. yerel depolama sayesinde eş zamanlı olarak erişebiliriz ve getirdiğimiz verş anında orada olur.
const places = localStorage.getItem();

export default function AvailablePlaces({ onSelectPlace }) {
  //useState'i içe aktararak mevcut yerleri state ile yönetebiliriz.
  //başlangıçta sahip olduğumuz mevcut yerler dizisi yerel depolamadan getirilebilir.
  const [availablePlaces, setAvailablePlaces] = useState([]);

  fetch('http://localhost:3000/places').then((response) => {
    return response.json()
  })
  .then((resData) => {
    setAvailablePlaces(resData.places);
  });

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
