import React, { useEffect, useState } from "react";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";
import Dashboard from "./Overview"; // ✅ Import the Dashboard

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data));
  }, []);

  function handleAddGoal(newGoal) {
    fetch("http://localhost:5000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((goalFromServer) => setGoals([...goals, goalFromServer]));
  }

  function handleDeleteGoal(id) {
    fetch(`http://localhost:5000/goals/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedGoals = goals.filter((goal) => goal.id !== id);
      setGoals(updatedGoals);
    });
  }

  function handleDeposit(goalId, amount) {
    const goal = goals.find((g) => g.id === goalId);
    const updatedGoal = { ...goal, saved: (goal.saved || 0) + amount };

    fetch(`http://localhost:5000/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ saved: updatedGoal.saved }),
    })
      .then((res) => res.json())
      .then((goalFromServer) => {
        const updatedGoals = goals.map((g) =>
          g.id === goalFromServer.id ? goalFromServer : g
        );
        setGoals(updatedGoals);
      });
  }

  function handleUpdateGoal(updatedGoal) {
    fetch(`http://localhost:5000/goals/${updatedGoal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedGoal.name,
        targetAmount: updatedGoal.targetAmount,
        deadline: updatedGoal.deadline,
      }),
    })
      .then((res) => res.json())
      .then((goalFromServer) => {
        const updatedGoals = goals.map((g) =>
          g.id === goalFromServer.id ? goalFromServer : g
        );
        setGoals(updatedGoals);
      });
  }

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>

      {/* ✅ Dashboard Summary */}
      <Dashboard goals={goals} />

      {/* ✅ Goal Creation */}
      <GoalForm onAddGoal={handleAddGoal} />

      {/* ✅ Goal List */}
      <GoalList
        goals={goals}
        onDeposit={handleDeposit}
        onDelete={handleDeleteGoal}
        onUpdate={handleUpdateGoal}
      />
    </div>
  );
}

export default App;
