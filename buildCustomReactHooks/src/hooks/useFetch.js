import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  //burada bir http isteği gönderiliyor ve bazı yükleme durumlarını ve potansiyal olarak hata durumu yönetiliyor :
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try 
      {
        const places = await fetchFn();
        setFetchedData(places);
      } 
      catch (error) 
      {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  //burada bir nesne seçiyorum ve bu farklı durumları anahtar değer çiftleri olarak ekliyorum.
  //böylece isFetching, data ve error değerlerine sahip oluyorum.
  //bu yüzden bu üç durum (state) değerini özel hook'umda bir nesnede gruplandırmış olarak döndürüyorum
  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
