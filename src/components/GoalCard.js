import React from "react";

function GoalCard({ goal, onDeposit, onDelete, onUpdate }) {
  const { id, name, targetAmount, saved = 0, deadline } = goal;

  const deadlineDate = new Date(deadline);
  const today = new Date();
  const timeDiff = deadlineDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const isCompleted = saved >= targetAmount;
  const isOverdue = !isCompleted && daysLeft < 0;
  const isNearDeadline = !isCompleted && daysLeft >= 0 && daysLeft <= 30;

  const cardStyle = {
    border: isOverdue
      ? "2px solid red"
      : isNearDeadline
      ? "2px solid orange"
      : "2px solid lightgray",
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "10px",
  };

  const handleDeposit = () => {
    const amount = parseFloat(prompt("Enter deposit amount:"));
    if (!isNaN(amount)) {
      onDeposit(id, amount);
    }
  };

  const handleEdit = () => {
    const newName = prompt("New name:", name);
    const newTarget = parseFloat(prompt("New target amount:", targetAmount));
    const newDeadline = prompt("New deadline (YYYY-MM-DD):", deadline);
    if (newName && !isNaN(newTarget) && newDeadline) {
      onUpdate({
        ...goal,
        name: newName,
        targetAmount: newTarget,
        deadline: newDeadline,
      });
    }
  };

  return (
    <div style={cardStyle}>
      <h3>{name}</h3>
      <p>
        Target: KES {targetAmount.toLocaleString()} <br />
        Saved: KES {saved.toLocaleString()}
      </p>
      {!isCompleted && (
        <p>
          🕒 <strong>
            {daysLeft < 0 ? "Deadline passed" : `${daysLeft} days left`}
          </strong>
        </p>
      )}
      {isOverdue && (
        <p style={{ color: "red" }}>⚠️ Deadline has passed! Goal not completed.</p>
      )}
      {isNearDeadline && (
        <p style={{ color: "orange" }}>
          ⚠️ Less than 30 days left! Try to complete this goal.
        </p>
      )}
      {isCompleted && <p style={{ color: "green" }}>✅ Goal completed!</p>}
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default GoalCard;
