// src/components/GoalItem.js
import React, { useState } from "react";

function GoalItem({ goal, onUpdateGoal, onDeleteGoal }) {
  const { id, title, targetAmount, currentAmount } = goal;
  const [amountToAdd, setAmountToAdd] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const amount = parseInt(amountToAdd);
    if (!isNaN(amount) && amount > 0) {
      const updatedGoal = {
        ...goal,
        currentAmount: currentAmount + amount,
      };
      onUpdateGoal(updatedGoal);
      setAmountToAdd("");
    }
  };

  return (
    <li style={{ marginBottom: "1rem" }}>
      <strong>{title}</strong> — KES {currentAmount.toLocaleString()} /{" "}
      {targetAmount.toLocaleString()}
      <div>
        <progress value={currentAmount} max={targetAmount}></progress>
      </div>
      <form onSubmit={handleAdd}>
        <input
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
          placeholder="Add savings"
        />
        <button type="submit">Add</button>
        <button type="button" onClick={() => onDeleteGoal(id)}>
          Delete
        </button>
      </form>
    </li>
  );
}

export default GoalItem;
