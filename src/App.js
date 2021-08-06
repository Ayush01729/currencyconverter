import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=5b60c8f5657061c4d2148a01babdf385";

function App() {
  const [currencyoptions, setCurrencyoptions] = useState([]);
  const [fromcurrency, setFromcurrency] = useState();
  const [tocurrency, setTocurrency] = useState();
  const [exchangerate, setExchangerate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountinfromcurrency, setAmountinfromcurrency] = useState(true);
  // console.log(currencyoptions);
  // console.log(exchangerate);

  let toamount, fromamount;
  if (amountinfromcurrency) {
    fromamount = amount;
    toamount = amount * exchangerate;
  } else {
    toamount = amount;
    fromamount = amount / exchangerate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstcurrency = Object.keys(data.rates)[0];
        setCurrencyoptions([data.base, ...Object.keys(data.rates)]);
        setFromcurrency(data.base);
        setTocurrency(firstcurrency);
        setExchangerate(data.rates[firstcurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromcurrency != null && tocurrency != null) {
      fetch(`${BASE_URL}&base=${fromcurrency}&symbols=${tocurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangerate(data.rates[tocurrency]));
    }
  }, [fromcurrency, tocurrency]);

  function handlefromamountchange(e) {
    setAmount(e.target.value);
    setAmountinfromcurrency(true);
  }

  function handletoamountchange(e) {
    setAmount(e.target.value);
    setAmountinfromcurrency(false);
  }

  return (
    <>
      <h1>Currency</h1>
      <CurrencyRow
        currencyoptions={currencyoptions}
        selectedcurrency={fromcurrency}
        onchangecurrency={(e) => setFromcurrency(e.target.value)}
        amount={fromamount}
        onchangeamount={handlefromamountchange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyoptions={currencyoptions}
        selectedcurrency={tocurrency}
        onchangecurrency={(e) => setTocurrency(e.target.value)}
        amount={toamount}
        onchangeamount={handletoamountchange}
      />
    </>
  );
}

export default App;
