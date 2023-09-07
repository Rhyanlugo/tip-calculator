import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [service, setService] = useState(0);
  const [friendService, setFriendService] = useState(0);

  const tip = bill * ((service + friendService) / 2 / 100);

  function handleReset() {
    setBill("");
    setService(0);
    setFriendService(0);
  }

  return (
    <div className="center">
      <h1 style={{ textAlign: "center" }}>Tip Calculator</h1>
      <Bill bill={bill} onSetBill={setBill} />
      <Service service={service} onSetService={setService}>
        How did you like the service?{" "}
      </Service>
      <Service service={friendService} onSetService={setFriendService}>
        How did your friend like the service?{" "}
      </Service>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Button onClickHandle={handleReset}>Reset</Button>
        </>
      )}
    </div>
  );
}

function Bill({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill? </label>
      <input
        type="text"
        placeholder="Bill Value"
        pattern="[0-9]*"
        value={bill}
        onChange={(evnt) =>
          onSetBill((input) => (evnt.target.validity.valid ? Number(evnt.target.value) : input))
        }
      />
    </div>
  );
}

function Service({ service, onSetService, children }) {
  return (
    <div>
      <label>{children}</label>
      <select value={service} onChange={(evnt) => onSetService(Number(evnt.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h2>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h2>
  );
}

function Button({ onClickHandle, children }) {
  return <button onClick={onClickHandle}>{children}</button>;
}
