import { useState } from "react"
import Header from "./component/Header"
import UserInput from "./component/UserInput"
import Result from "./component/Result"

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 1000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = userInput.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  return (
    <> 
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} /> 
      {!inputIsValid && <p className="center">Lütfen sıfırdan büyük bir değer giriniz.</p>}
      {inputIsValid && <Result input={userInput} />}
    </>
  );
}

export default App;
