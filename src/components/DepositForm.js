import React, { useState } from "react";

function DepositForm({ goal, onDeposit }) {
  const [deposit, setDeposit] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const depositAmount = parseFloat(deposit);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    onDeposit(goal.id, depositAmount);
    setDeposit(""); // Clear input after deposit
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
      <input
        type="number"
        value={deposit}
        onChange={(e) => setDeposit(e.target.value)}
        placeholder="KES to deposit"
        min="0"
        step="any"
        style={{ marginRight: "5px" }}
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
