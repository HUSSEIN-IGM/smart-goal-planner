import React, { useState, useEffect } from "react";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";
import "./App.css"; // Assuming you have some styles in App.css

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch goals from db.json on first load
  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  // Add a new goal
  function handleAddGoal(newGoal) {
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newGoal, saved: 0 }),
    })
      .then((res) => res.json())
      .then((savedGoal) => setGoals([...goals, savedGoal]));
  }

  // Deposit to an existing goal
  function handleDeposit(goalId, amount) {
    const goal = goals.find((g) => g.id === goalId);
    const updatedGoal = { ...goal, saved: goal.saved + amount };

    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ saved: updatedGoal.saved }),
    })
      .then((res) => res.json())
      .then((updatedGoalFromServer) => {
        const updatedGoals = goals.map((g) =>
          g.id === goalId ? updatedGoalFromServer : g
        );
        setGoals(updatedGoals);
      });
  }

  // Delete a goal
  function handleDeleteGoal(goalId) {
    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "DELETE",
    }).then(() => {
      setGoals(goals.filter((goal) => goal.id !== goalId));
    });
  }

  // Dashboard summary calculations
  const totalTarget = goals.reduce((sum, g) => sum + Number(g.targetAmount), 0);
  const totalSaved = goals.reduce((sum, g) => sum + Number(g.saved), 0);
  const overallProgress =
    totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(2) : 0;

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>

      <div className="dashboard">
        <h2>Dashboard Overview</h2>
        <p>Total Goals: {goals.length}</p>
        <p>Total Target Amount: KES {totalTarget.toLocaleString()}</p>
        <p>Total Saved: KES {totalSaved.toLocaleString()}</p>
        <p>Overall Progress: {overallProgress}%</p>
      </div>

      <GoalForm onAddGoal={handleAddGoal} />
      <GoalList
        goals={goals}
        onDeposit={handleDeposit}
        onDelete={handleDeleteGoal}
      />
    </div>
  );
}

export default App;
