import { useState } from 'react';
import { log } from '../../log.js';

export default function ConfigureCounter({ onSet }) {
  log('<ConfigureCounter />',1); //görselleştimek için bunu kullanıyorum. ve 1. seviye olmalı. çünkü buradaki uygulama bileşenin bir seviye altında.  

  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
}
