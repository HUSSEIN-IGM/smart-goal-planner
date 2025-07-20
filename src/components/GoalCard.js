import React from "react";
import DepositForm from "./DepositForm";

function GoalCard({ goal, onDelete, onDeposit }) {
  if (!goal) return null;

  const saved = goal.saved || 0;
  const target = goal.targetAmount || 0;

  const formattedSaved = saved.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
  });

  const formattedTarget = target.toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
  });

  const progress = target > 0 ? Math.min((saved / target) * 100, 100) : 0;

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
      <h3>{goal.name}</h3>
      <p>
        Saved: {formattedSaved} / {formattedTarget}
      </p>
      <div style={{ background: "#e0e0e0", borderRadius: "8px", overflow: "hidden", height: "15px", marginBottom: "10px" }}>
        <div style={{ width: `${progress}%`, background: "green", height: "100%" }}></div>
      </div>
      <DepositForm goal={goal} onDeposit={onDeposit} />
      <button onClick={() => onDelete(goal.id)} style={{ marginTop: "10px", background: "red", color: "white", padding: "5px 10px" }}>
        Delete
      </button>
    </div>
  );
}

export default GoalCard;
