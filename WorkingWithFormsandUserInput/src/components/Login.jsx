import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const email = useRef();
  const password = useRef();

  //giriş düğmesi için oturum açma bileşenine fonksiyon ekliyoruz:
  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailInvalid = enteredEmail.includes('@');

    if (!emailIsInvalid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    console.log("Sending HHTP requerst...");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Giriş Alanı</h2>

      <div className="control-row">
        <div className="control no-margin">
          {/*htmlFor : html'deki for ve label-inpt ilişkilendirmek için kullanılır.*/}
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="controller-error">
            {emailIsInvalid && <p>Lütfen geçerli bir e-posta adresi girin.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Şifre</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Sıfırla</button>
        <button className="button">Giriş</button>
      </p>
    </form>
  );
}
