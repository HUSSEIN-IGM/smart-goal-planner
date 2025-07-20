import React from "react";
import GoalCard from "./GoalCard";

function GoalList({ goals, onDelete, onDeposit }) {
  return (
    <div className="goal-list">
      <h2>Your Goals</h2>
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDelete={onDelete}
          onDeposit={onDeposit}
        />
      ))}
    </div>
  );
}

export default GoalList;
