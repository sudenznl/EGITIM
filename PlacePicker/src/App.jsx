import { useRef, useState, useEffect, useCallback } from "react";
import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

  const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id)
  );

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

  // bu yöntemi kullanıdığımızda kullanıcıdam konum almak için izin isteyecek
    // ve bu izin verildiğinde devam edecek ve konumu getirecek.

    //konuma bağlı olan kod bu işlevin içerisinde yürütülmelidir. Çünkü konum asenkron olarak alınır, yani fonksiyon hemen çalışmaz.
    //Konumu almadan önce dışarıda kod çalıştırırsak kullanıcı konumu henüz gelmediği için hata olur/değer undefined olur.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds =JSON.parse(localStorage.getItem('selectedPlaces') || []);
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  const handleRemovePlace = useCallback(
    function handleRemovePlace() {
      setPickedPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
      );
      //setModalIsOpen(false);

      const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
      );
    }, []);

  return (
    <>
      <Modal open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>Gezi Takvimi</h1>
        <p>
          Ziyaret etmek istediğiniz veya ziyaret ettiğiniz yerlerden oluşan 
          kişisel koleksiyonunuzu oluşturun.
        </p>
      </header>

      <main>
        <Places
          title="Ziyaret etmek isterim ..."
          fallbackText={"Aşağıdan ziyaret etmek istediğiniz yerleri seçin."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Mevcut Yerler"
          places={availablePlaces}
          fallbackText="Yerlerin mesafeye göre sırası..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
