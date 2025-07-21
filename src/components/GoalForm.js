import React, { useState } from "react";

function GoalForm({ onAddGoal }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !targetAmount) return;

    const newGoal = {
      name,
      targetAmount: Number(targetAmount),
      saved: 0,
    };

    onAddGoal(newGoal);
    setName("");
    setTargetAmount("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Add New Goal</h2>
      <input
        type="text"
        placeholder="Goal name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />
      <input
        type="number"
        placeholder="Target Amount (KES)"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
