
# Expense Tracker with AI Assistant

This project is a React-based Expense Tracker application enhanced with an AI Assistant that provides personalized cost-saving tips. It allows users to manage their expenses, set budgets, generate PDF receipts, and email summaries.

## Features

- **Expense Management**: Add, edit, and delete expenses with categories, amounts, and notes.
- **Budget Tracking**: Set and track monthly budgets.
- **Dashboard**: Visualize spending with charts (Pie Chart for categories and Bar Chart for weekly spending).
- **AI Assistant**: Get actionable cost-saving tips based on your expenses and budget.
- **Receipt Generator**: Generate PDF summaries of expenses for a selected date range.
- **Email Summary**: Email expense summaries directly to a predefined recipient.

## Technologies Used

- **React**: Frontend framework for building the UI.
- **Recharts**: Library for creating charts and graphs.
- **html2pdf.js**: Library for generating PDF receipts.
- **emailjs-com**: Library for sending email summaries.
- **date-fns**: Utility library for date manipulation.
- **React Hook Form**: Library for managing forms and validation.
- **FontAwesome**: Icons for buttons and UI elements.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/expense-tracker-ai.git
   cd expense-tracker-ai
2. Install dependencies:
    
    npm  install
    
3.  Create a  `.env`  file in the root directory and add your API key:
    
    REACT_APP_GEMINI_API_KEY=your-api-key
    
    GENERATE_SOURCEMAP=false
    
4.  Start the development server:
    
    npm  start
    
    The app will be available at  http://localhost:3000.
    

## Scripts

-   npm start: Runs the app in development mode.
-   npm test: Launches the test runner.
-   `npm run build`: Builds the app for production.
-   `npm run eject`: Ejects the configuration files for customization.

## Folder Structure
```
src/
├── components/
│   ├── AIAssistant.js
│   ├── Budget.js
│   ├── Dashboard.js
│   ├── EmailSender.js
│   ├── ExpenseForm.js
│   ├── ExpenseList.js
│   ├── ReceiptGenerator.js
├── App.js
├── App.css
├── index.js
├── index.css
├── reportWebVitals.js
├── setupTests.js
public/
├── index.html
├── manifest.json
├── robots.txt
```

## Environment Variables

-   REACT_APP_GEMINI_API_KEY: API key for the AI Assistant.
-   `GENERATE_SOURCEMAP`: Set to  `false`  to disable source maps in production.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

-   Create React App
-   Recharts
-   html2pdf.js
-   emailjs-com
-   FontAwesome
