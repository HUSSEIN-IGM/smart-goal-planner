import React from "react";

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const progressPercentage =
    totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(1) : 0;

  return (
    <div className="overview">
      <h2>Dashboard Overview</h2>
      <div className="stats">
        <p><strong>Total Goals:</strong> {totalGoals}</p>
        <p><strong>Total Target Amount:</strong> KES {totalTarget.toLocaleString()}</p>
        <p><strong>Total Saved:</strong> KES {totalSaved.toLocaleString()}</p>
        <p><strong>Overall Progress:</strong> {progressPercentage}%</p>
      </div>
    </div>
  );
}

export default Overview;
