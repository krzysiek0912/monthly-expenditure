import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ExpanseForm from './Expense/ExpenseForm';
import styled from 'styled-components';

const StyledDialog = styled.div`
  padding: 20px;
`;

const DialogAdd = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <StyledDialog>
        <DialogTitle id="simple-dialog-title">Add Expense</DialogTitle>
        <ExpanseForm />
      </StyledDialog>
    </Dialog>
  );
};

DialogAdd.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
export default DialogAdd;
