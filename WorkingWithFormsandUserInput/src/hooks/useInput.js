import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  //const [enteredEmail, setEnteredEmail] = useState("");
  //const [enteredPassword, setEnteredPassword] = useState("");
  //bunlar yerine bazı bileşik stateleri kullanarak birçok state anlık görüntüsünün etrafında çalışabiliriz.
  //dolayısıyla burada bir alternatif enteredVales durumuna sahip olmak olacaktır :
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid
  };
}
