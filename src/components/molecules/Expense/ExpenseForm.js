import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { DatePicker } from '@material-ui/pickers';
import { useInput } from '../../../hook/useInput';
import { useSwitch } from '../../../hook/useSwitch';
import { getCategories } from '../../../reducers/categoriesReducer';
import { addExpenditure } from '../../../reducers/expensesReducer';

const ExpenseForm = ({ categories, addExpenditure }) => {
  const { value: name, bind: bindName, reset: resetName } = useInput('');
  const { value: category, bind: bindCategory, reset: resetCategory } = useInput('');
  const { value: amount, bind: bindAmout, reset: resetAmout } = useInput('');
  const { value: type, bind: bindType, reset: resetType } = useSwitch(false);
  const { value: paid, bind: bindPaid, reset: resetPaid } = useSwitch(false);
  const [date, setDate] = useState(new Date());
  const [isSubmit, setIsSubmit] = useState(false);
  const clearState = () => {
    resetName();
    resetCategory();
    resetType();
    resetPaid();
    resetAmout();
    setDate(new Date());
    setIsSubmit(true);
  };
  const categoriesOptions = categories.map(({ id, name }) => (
    <MenuItem key={id} value={name}>
      {name}
    </MenuItem>
  ));
  const handleSubmit = (e) => {
    e.preventDefault();
    const expenditure = { name, category, amount, type, paid, date };
    if (name !== '') {
      addExpenditure(expenditure);
      clearState();
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <DatePicker
          fullWidth
          margin="normal"
          name="date"
          value={date}
          onChange={setDate}
          helperText="Please select date of expense"
        />
        <TextField
          required
          margin="normal"
          fullWidth
          id="outlined-basic"
          label="Expense name"
          variant="outlined"
          helperText="Please enter the name of the expense"
          {...bindName}
        />
        <TextField
          fullWidth
          id="outlined-select-currency"
          select
          label="Category"
          helperText="Please enter the expense category "
          variant="outlined"
          {...bindCategory}
        >
          {categoriesOptions}
        </TextField>
        <TextField
          required={type}
          type="number"
          margin="normal"
          fullWidth
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          helperText="Please enter the amount of the expense"
          {...bindAmout}
        />
        <FormControlLabel
          control={<Switch {...bindType} color="primary" />}
          label="Automatic payment"
        />
        {!type && (
          <FormControlLabel control={<Switch {...bindPaid} color="primary" />} label="Paid" />
        )}
        {isSubmit && <p>added expenditure</p>}
        <Button type="submit" fullWidth variant="contained" color="primary">
          Add expense
        </Button>
      </form>
    </Container>
  );
};
const mapStateToProps = (state) => ({ categories: getCategories(state) });
const mapDispatchToProps = (dispatch) => ({
  addExpenditure: (expense) => dispatch(addExpenditure(expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
