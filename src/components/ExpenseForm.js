import React from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const categories = ['Groceries', 'Rent', 'Utilities', 'Entertainment', 'Transport', 'Health', 'Other'];

const ExpenseForm = ({ addExpense, editingExpense, updateExpense }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  React.useEffect(() => {
    if (editingExpense) {
      setValue('date', editingExpense.date);
      setValue('category', editingExpense.category);
      setValue('amount', editingExpense.amount);
      setValue('notes', editingExpense.notes);
    } else {
      reset();
    }
  }, [editingExpense, setValue, reset]);

  const onSubmit = (data) => {
    if (editingExpense) {
      updateExpense({ ...data, id: editingExpense.id });
    } else {
      addExpense({ ...data, id: uuidv4() });
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="expense-form">
      <h3>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h3>
      <input type="date" {...register('date', { required: true })} />
      {errors.date && <p>Date is required.</p>}

      <select {...register('category', { required: true })}>
        <option value="">-- Select Category --</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      {errors.category && <p>Category is required.</p>}
      
      <input type="number" step="0.01" placeholder="Amount" {...register('amount', { required: true, valueAsNumber: true })} />
      {errors.amount && <p>Amount is required.</p>}

      <textarea placeholder="Notes (optional)" {...register('notes')}></textarea>
      
      <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
};

export default ExpenseForm;