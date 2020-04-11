import React from 'react';
import ExpenseForm from '../components/molecules/Expense/ExpenseForm';
import ExpenseList from '../components/molecules/Expense/ExpenseList';

const AddExpense = () => {
  return (
    <div>
      <ExpenseForm></ExpenseForm>
      <ExpenseList></ExpenseList>
    </div>
  );
};

export default AddExpense;
