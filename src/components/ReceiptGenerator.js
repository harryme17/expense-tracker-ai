// src/components/ReceiptGenerator.js

import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import ReactDOM from 'react-dom/client';

const ReceiptGenerator = ({ expenses }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGeneratePdf = () => {
    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && end) {
        return expenseDate >= start && expenseDate <= end;
      }
      return true; // If no dates, include all
    });

    if (filteredExpenses.length === 0) {
      alert('No expenses found for the selected period.');
      return;
    }

    const receiptContent = (
      <div>
        <h1>Expense Report</h1>
        <p>Period: {startDate || 'Start'} to {endDate || 'End'}</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Category</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(exp => (
              <tr key={exp.id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{exp.date}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{exp.category}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>₹{parseFloat(exp.amount).toFixed(2)}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{exp.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 style={{ textAlign: 'right', marginTop: '20px' }}>
          Total: ₹{filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2)}
        </h3>
      </div>
    );

    const receiptContainer = document.createElement('div');
    receiptContainer.style.position = 'relative';
    receiptContainer.style.left = '0';
    receiptContainer.style.top = '0';
    document.body.appendChild(receiptContainer);

    const root = ReactDOM.createRoot(receiptContainer);
    root.render(receiptContent);

    // Add a delay to ensure content is rendered
    setTimeout(() => {
      const opt = {
        margin: 1,
        filename: 'expense_receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true }, // Enable logging for debugging
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf().from(receiptContainer).set(opt).save().then(() => {
        root.unmount();
        document.body.removeChild(receiptContainer);
      });
    }, 500); // Delay of 500ms
  };

  return (
    <div className="receipt-generator">
      <h3>Generate Receipt / Summary PDF</h3>
      <div className="date-range-picker">
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <button onClick={handleGeneratePdf}>Download PDF</button>
    </div>
  );
};

export default ReceiptGenerator;