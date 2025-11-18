import { useActionState } from "react";

import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from "../util/validation";

export default function Signup() {
  //formData formda gönderilen tüm değerleri içeriyor:
  function signupAction(prevFormState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const role = formData.get("role");
    const terms = formData.get("terms");
    const acquisitionChannel = formData.getAll("acquisition");

    let errors = [];

    if (isEmail(email)) 
    {
      errors.push("Geçersiz mil adresi kullanıyorsunuz");
    }

    if (!isNotEmpty(password) || !hasMinLength(password, 6)) 
    {
      errors.push("En az 6 karakterli bir şifre oluşturunuz");
    }

    if (!isEqualToOtherValue(password, confirmPassword)) 
    {
      errors.push("Şifreler eşleşmiyor, şifreler aynı olmalı");
    }

    if (isNotEmpty(firstName) || !isNotEmpty(lastName)) 
    {
      errors.push("Lütfen isim ve soy isim alanlarını boş bırakmayınız");
    }

    if (!isNotEmpty(role)) 
    {
      errors.push("Lütfen bir rol seçiniz");
    }

    if (!terms) 
    {
      errors.push("Hizmet Şartları ve Koşullarını kabul etmelisiniz");
    }

    if (acquisitionChannel.length === 0) 
    {
      errors.push("Bizi nereden duyduğunuzu söylemelisiniz");
    }


    if (errors.length > 0) {
      return { errors };
    }

    return { errors: null };
  }

  //useActionState, ilk parametre olarak verilen signupAction fonksiyonunu izler.
  //onun sonucuna göre formun durumunu (formState) otomatik günceller.
  //pending : formun gönderilip gönderilmediğine bağlı olarak true/false döndürür.(kullanmayacağız, şuan için ihtiyacımız yok)
  const [formState, formAction, pending] = useActionState(signupAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <h2>Hoş Geldiniz!</h2>
      <p>Başlamadan önce biraz bilgilerinize ihtiyacımız var </p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Şifre</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Şifre Başarılı</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">İsim</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Soy İsim</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">Rolünüz Ne?</label>
        <select id="role" name="role">
          <option value="student">Öğrenci</option>
          <option value="teacher">Öğretmen</option>
          <option value="employee">Çalışan</option>
          <option value="founder">Kurucu</option>
          <option value="other">Diğer</option>
        </select>
      </div>

      <fieldset>
        <legend>Bizi nereden duydun?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Arkadaş tarafından yönlendirildi</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Diğer</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />
          Hizmet Koşullarını ve Şartları kabul ediyorum.
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Sıfırla
        </button>
        <button className="button">Giriş Yap</button>
      </p>
    </form>
  );
}
