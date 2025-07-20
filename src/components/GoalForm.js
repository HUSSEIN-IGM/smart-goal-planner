// src/components/GoalForm.js
import React, { useState } from "react";

function GoalForm({ onAddGoal }) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || target.trim() === "" || isNaN(target)) {
      alert("Please enter a valid name and numeric target amount.");
      return;
    }

    const newGoal = {
      name,
      target: parseFloat(target),
      amountSaved: 0
    };

    onAddGoal(newGoal);
    setName("");
    setTarget("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Add New Goal</h2>
      <div className="mb-2">
        <label className="block mb-1">Goal Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Target Amount (KES):</label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
      >
        Add Goal
      </button>
    </form>
  );
}

export default GoalForm;
