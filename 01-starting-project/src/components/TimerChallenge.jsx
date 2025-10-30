import { useState } from "react";

//let timer;

export default function TimerChallenge({ title, targetTime }) {
    const [timerStarted, setTimerStarted] = useState(false);//zamanlayıcımız.
    const [timeExpired, setTimeExpired] = useState(false);

  function handleStart() {
       timer = setTimeout(() => {
       setTimeExpired(true);
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop(){
    clearTimeout(timer);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timeExpired && <p>You lost</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running... ' : 'Timer inactive'}
      </p>
    </section>
  );
}
