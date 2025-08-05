// src/components/EmailSender.js

import React, { useState } from 'react';

const EmailSender = ({ expenses, budget }) => {
  const [status, setStatus] = useState('');

  // Fixed recipient email
  const recipientEmail = 'mengeharshal1703@gmail.com';

  const sendEmail = async (e) => {
    e.preventDefault();

    setStatus('Sending...');

    const totalSpent = expenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0);
    const budgetRemaining = budget - totalSpent;

    const summaryMessage = `
      Total Spent: ₹${totalSpent.toFixed(2)}
      Monthly Budget: ₹${budget.toFixed(2)}
      Budget Remaining: ₹${budgetRemaining.toFixed(2)}
    `;

    const formData = new FormData();
    formData.append('to_email', recipientEmail);
    formData.append('from_name', 'Expense Tracker AI');
    formData.append('message', summaryMessage);

    try {
      const response = await fetch('https://formspree.io/f/manbpyzn', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        console.log('Email sent successfully:', await response.json());
        setStatus('Email sent successfully!');
      } else {
        console.error('Failed to send email:', response.statusText);
        setStatus('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="email-sender">
      <h3>Email Summary</h3>
      <form onSubmit={sendEmail}>
        <button type="submit">
          Send Email to {recipientEmail}
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default EmailSender;