import React from "react";
import GoalCard from "./GoalCard";

function GoalList({ goals, onDeposit, onDelete, onUpdate }) {
  return (
    <div>
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDeposit={onDeposit}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default GoalList;
