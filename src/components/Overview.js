import React from "react";

function Dashboard({ goals }) {
  const totalGoals = goals.length;

  const totalSaved = goals.reduce((sum, g) => sum + (g.saved || 0), 0);

  const getTarget = (goal) => goal.target || goal.targetAmount || 0;

  const completedGoals = goals.filter((g) => (g.saved || 0) >= getTarget(g));

  const overdueGoals = goals.filter((g) => {
    const deadline = g.deadline ? new Date(g.deadline) : null;
    const target = getTarget(g);
    const saved = g.saved || 0;
    return deadline && deadline < new Date() && saved < target;
  });

  const boxStyle = {
    flex: 1,
    margin: "10px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const containerStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h3>Total Goals</h3>
        <p>{totalGoals}</p>
      </div>
      <div style={boxStyle}>
        <h3>Total Saved</h3>
        <p>
          {totalSaved.toLocaleString("en-KE", {
            style: "currency",
            currency: "KES",
          })}
        </p>
      </div>
      <div style={boxStyle}>
        <h3>Completed Goals</h3>
        <p>{completedGoals.length}</p>
      </div>
      <div style={{ ...boxStyle, backgroundColor: "#ffe0e0" }}>
        <h3>Overdue Goals</h3>
        <p style={{ color: "red", fontWeight: "bold" }}>
          {overdueGoals.length}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
