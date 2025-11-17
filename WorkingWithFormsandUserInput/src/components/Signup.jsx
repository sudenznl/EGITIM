import { useState } from "react";

export default function Signup() {
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const acquisitionChannel = fd.getAll("acquisition");
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;

    if (data.password !== data["confirm-password"]) {
      //- geçersiz yaptığı için paranteze almamız gerekiyor.
      setPasswordsAreNotEqual(true);
      return;
    }

    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hoş Geldiniz!</h2>
      <p>Başlamak için bizimle bilgilerinizi paylaşın</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Şifre Başarılı</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />

          <div className="controller-error">
            {passwordsAreNotEqual && <p>şifre eşleşmeli !</p>}
          </div>

        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">İsim</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name">Soy İsim</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">Rolüünüzü seçiniz</label>
        <select id="role" name="role" required>
          <option value="student">Öğrenci</option>
          <option value="teacher">Öğretmen</option>
          <option value="employee">Çalışan</option>
          <option value="founder">Kurucu</option>
          <option value="other">Diğer</option>
        </select>
      </div>

      <fieldset>
        <legend>Hizmetimizi Nasıl Buldunuz?</legend>
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
          <label htmlFor="friend">Arkadaşım tarafınfan referans edildi</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Diğer</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required
          />
          Hizmet Şartlarını ve Koşulları kabul ediyorum.
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Sıfırla
        </button>
        <button type="submit" className="button">
          Giriş Yap
        </button>
      </p>
    </form>
  );
}
