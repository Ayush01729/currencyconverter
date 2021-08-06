import React from "react";

export default function CurrencyRow(props) {
  const {
    currencyoptions,
    selectedcurrency,
    onchangecurrency,
    amount,
    onchangeamount,
  } = props;
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onchangeamount}
      ></input>
      <select value={selectedcurrency} onChange={onchangecurrency}>
        {currencyoptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
