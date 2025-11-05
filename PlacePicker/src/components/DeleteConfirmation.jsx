import { useState, useEffect } from "react";

import ProgressBar from "./ProgressBar";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log('ZAMANLAYICI SETİ');
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);//burada bir zamanalayıcı ayarlıyoruz, 3sn sonra confirm çalışıyor.
 
    return () => {
      console.log('ZAMANLAYICI TEMİZLENDi');
      clearTimeout(timer);
    }
  }, [onConfirm]);
   //useEffect kullanmamızın sebebi resime basıp HAYIR seçeneğini seçtiğimizde zamanlayıcı çalışmış olduğu için resim siliniyordu.

  return (
    <div id="delete-confirmation">
      <h2>Emin misin?</h2>
      <p>Gerçekten bu yer'i silmek istiyor musun?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          hayır
        </button>
        <button onClick={onConfirm} className="button">
          evet
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
