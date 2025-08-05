import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, endOfWeek } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];

const Dashboard = ({ expenses, budget }) => {
  // --- Data for Pie Chart (Spending by Category) ---
  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category;
    const amount = parseFloat(expense.amount);
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([key, value]) => ({
    name: key,
    value,
  }));

  // --- Data for Bar Chart (Weekly Spending) ---
  const weeklyData = expenses.reduce((acc, expense) => {
    const expenseDate = new Date(expense.date);
    const weekRange = `${format(startOfWeek(expenseDate), 'MMM dd')} - ${format(endOfWeek(expenseDate), 'MMM dd')}`;
    const amount = parseFloat(expense.amount);
    const existingWeek = acc.find(d => d.name === weekRange);
    if (existingWeek) {
      existingWeek.spent += amount;
    } else {
      acc.push({ name: weekRange, spent: amount });
    }
    return acc;
  }, []);

  // --- Summary Data ---
  const totalSpent = expenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0);
  const budgetRemaining = budget - totalSpent;
  const savings = Math.max(budgetRemaining, 0);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      {/* --- Summary --- */}
      <div className="summary-cards">
        <div className="card">
          <h4>Total Spent</h4>
          <p>₹{totalSpent.toFixed(2)}</p>
        </div>
        <div className="card">
          <h4>Budget Remaining</h4>
          <p style={{ color: budgetRemaining < 0 ? 'red' : 'green' }}>
            ₹{budgetRemaining.toFixed(2)}
          </p>
        </div>
        <div className="card">
          <h4>Potential Savings</h4>
          <p>₹{savings.toFixed(2)}</p>
        </div>
      </div>

      {/* --- Charts --- */}
      <div className="charts-container">
        <div className="chart">
          <h3>Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={pieChartData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                fill="#8884d8" 
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>Weekly Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `₹${value}`} />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="spent" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;