import { useState } from "react";
export default function Login() {
  //const [enteredEmail, setEnteredEmail] = useState("");
  //const [enteredPassword, setEnteredPassword] = useState("");
  //bunlar yerine bazı bileşik stateleri kullanarak birçok state anlık görüntüsünün etrafında çalışabiliriz.
  //dolayısıyla burada bir alternatif enteredVales durumuna sahip olmak olacaktır :
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  const emailIsInvalid = 
    didEdit.email && !enteredValues.email.includes('@');

  //giriş düğmesi için oturum açma bileşenine fonksiyon ekliyoruz:
  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredValues);
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit(prevEdit => ({
        ...prevEdit,
        [identifier]: false
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit(prevEdit => ({
        ...prevEdit,
        [identifier]: true
    })); 
  }

  /*function handleEmailChange(event) {
    setEnteredEmail(event.target.value)
  }

  function handlePasswordChange(event) {
      setEnteredPassword(event.target.value)
  }*/

  return (
    <form onSubmit={handleSubmit}>
      <h2>Giriş Alanı</h2>

      <div className="control-row">
        <div className="control no-margin">
          {/*htmlFor : html'deki for ve label-inpt ilişkilendirmek için kullanılır.*/}
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange('email', event.target.value)}
            value={enteredValues.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Sıfırla</button>
        <button type="button" className="button">
          Giriş
        </button>
      </p>
    </form>
  );
}
