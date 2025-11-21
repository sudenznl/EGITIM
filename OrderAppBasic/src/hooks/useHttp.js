import { useEffect, useState, useCallback } from 'react';

// Bu fonksiyon, genel HTTP isteklerini göndermemizi sağlar.
// Fonksiyon asenkron olarak çalışır ve bir URL ile isteğe özel yapılandırma (config) alır.
async function sendHttpRequest( url, config ) {
  // fetch ile verilen URL ve yapılandırma objesi kullanarak HTTP isteği gönderiyoruz:
  const response = await fetch(url, config);

  // Dönen cevabı JSON formatında çözümle ve resData değişkenine atıyoruz:
  const resData = await response.json();

  // Eğer HTTP cevabı ok değilse hata mesajı döndürüyoruz :
    if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  //veriyi geri döndürüyoruz :
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData); //isteğin döndürdüğü veriyi tutar.
  const [isLoading, setIsLoading] = useState(false); //isteğin şu anda devam edip etmediğini takip eder.// Başlangıçta false çünkü ilk açılışta henüz herhangi bir istek gönderilmez.
  const [error, setError] = useState(); // istekte bir hata oluşursa hatayı saklar.

  function clearData() {
    setData(initialData);
  }

  // sendRequest fonksiyonunu memorize ediyoruz. ani url veya config değişmedikçe aynı fonksiyon referansını korur.
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try 
      {
        const resData = await sendHttpRequest(url, {...config, body: data });
        setData(resData); //data'yı state'e kaydediyoruz.
      } 
      catch (error) 
      {
        setError(error.message || 'Bir şeyler yanlış gitti!');
        console.log({error});
      }
      setIsLoading(false); // İstek tamamlandığı için hata vermesinin bir öenmi yok.
    },
    [url, config]
  ); // Bu fonksiyon sadece url veya config değiştiğinde yeniden oluşturulacak.

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]); // sendRequest/config değişirse effect yeniden çalışır.

  // Hook’un dışarıya sağlayacağı değerler:
  return {
    data, // Sunucudan gelen veri
    isLoading, // Yükleniyor bilgisi
    error, // Hata mesajı
    sendRequest, // Manuel tetiklemek için fonksiyon
    clearData
  };
}
