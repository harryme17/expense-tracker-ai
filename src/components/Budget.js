import React, { useState } from 'react';

const Budget = ({ budget, setBudget }) => {
  const [newBudget, setNewBudget] = useState(budget);

  const handleSetBudget = (e) => {
    e.preventDefault();
    if (newBudget > 0) {
      setBudget(parseFloat(newBudget));
    }
  };

  return (
    <div className="budget-setter">
      <h3>Set Your Monthly Budget</h3>
      <form onSubmit={handleSetBudget}>
        <input 
          type="number" 
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          // --- CHANGED HERE ---
          placeholder="e.g., 50000"
        />
        <button type="submit">Set Budget</button>
      </form>
      {/* --- CHANGED HERE --- */}
      <h4>Current Budget: <span>₹{budget.toFixed(2)}</span></h4>
    </div>
  );
};

export default Budget;