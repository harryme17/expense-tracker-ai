import React from 'react';

const ExpenseList = ({ expenses, deleteExpense, setEditingExpense }) => {
  return (
    <div className="expense-list">
      <h3>Expenses</h3>
      <ul>
        {expenses.length === 0 ? (
          <p>No expenses yet. Add one!</p>
        ) : (
          expenses.map(expense => (
            <li key={expense.id}>
              <span>{expense.date}</span>
              <span>{expense.category}</span>
              {/* --- CHANGED HERE --- */}
              <span>₹{parseFloat(expense.amount).toFixed(2)}</span>
              <span className="notes">{expense.notes}</span>
              <div>
                <button onClick={() => setEditingExpense(expense)}>Edit</button>
                <button onClick={() => deleteExpense(expense.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;