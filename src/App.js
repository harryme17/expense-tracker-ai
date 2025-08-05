// src/App.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import AIAssistant from './components/AIAssistant';
import ReceiptGenerator from './components/ReceiptGenerator';
import EmailSender from './components/EmailSender';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // --- CHANGED HERE ---
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('budget');
    return savedBudget ? parseFloat(savedBudget) : 50000; // Default budget in Rupees
  });

  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  
  useEffect(() => {
    localStorage.setItem('budget', budget.toString());
  }, [budget]);

  const addExpense = (expense) => {
    const sortedExpenses = [...expenses, expense].sort((a, b) => new Date(b.date) - new Date(a.date));
    setExpenses(sortedExpenses);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const updateExpense = (updatedExpense) => {
    const sortedExpenses = expenses.map(expense => 
      expense.id === updatedExpense.id ? updatedExpense : expense
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
    setExpenses(sortedExpenses);
    setEditingExpense(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>1️⃣ Expense Tracker with AI Assistant 🧠</h1>
      </header>
      
      <Dashboard expenses={expenses} budget={budget} />
      
      <div className="interactive-section">
        <Budget budget={budget} setBudget={setBudget} />
        <AIAssistant expenses={expenses} budget={budget} />
      </div>

      <div className="main-content">
        <div className="form-section">
          <ExpenseForm 
            addExpense={addExpense}
            editingExpense={editingExpense}
            updateExpense={updateExpense}
            setEditingExpense={setEditingExpense}
          />
        </div>
        <div className="list-section">
          <ExpenseList 
            expenses={expenses} 
            deleteExpense={deleteExpense} 
            setEditingExpense={setEditingExpense}
          />
        </div>
      </div>
      
      <div className="tools-section">
          <ReceiptGenerator expenses={expenses} />
          <EmailSender expenses={expenses} budget={budget} />
      </div>

      <div className="button-section">
        <button>
          <FontAwesomeIcon icon={faDownload} /> Download PDF
        </button>
        <button>
          <FontAwesomeIcon icon={faEnvelope} /> Send Email
        </button>
      </div>

    </div>
  );
};

export default App;