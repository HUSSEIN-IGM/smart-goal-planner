import React, { useState } from "react";

function DepositForm({ goal, onDeposit }) {
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const depositAmount = Number(amount);
    if (!depositAmount || depositAmount <= 0) return;

    onDeposit(goal.id, depositAmount);
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        type="number"
        placeholder="Deposit Amount (KES)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginRight: "10px", padding: "6px" }}
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
