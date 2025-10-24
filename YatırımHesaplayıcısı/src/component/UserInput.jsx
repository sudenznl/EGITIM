export default function UserInput({ onChange, userInput }) {

  function handleChange(inputIdentifier, newValue) {
    onChange(inputIdentifier, newValue);
  }

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>İlk Yatırım</label>
          <input
            type="number"
            required
            value={userInput.initialInvestment}
            onChange={(event) =>
              handleChange("initialInvestment", event.target.value)
            }
          />
        </p>
        <p>
          <label>Yıllık Yatırım</label>
          <input
            type="number"
            required
            value={userInput.annualInvestment}
            onChange={(event) =>
              handleChange("annualInvestment", event.target.value)
            }
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Beklenen Getiri</label>
          <input
            type="number"
            required
            value={userInput.expectedReturn}
            onChange={(event) =>
              handleChange("expectedReturn", event.target.value)
            }
          />
        </p>
        <p>
          <label>Süre</label>
          <input
            type="number"
            required
            value={userInput.duration}
            onChange={(event) =>
              handleChange("duration", event.target.value)
            }
          />
        </p>
      </div>
    </section>
  );
}
//required : sadece inputun doldurulması gerektiğini belirtir.