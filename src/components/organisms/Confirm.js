import React from 'react';
import { connect } from 'react-redux';
import { getExpensesToConfirmed } from 'redux/expensesReducer';
import Table from 'components/molecules/Table';

const Confirm = ({ expenses }) => {
  return <Table data={expenses} title="Expenses to be confirmed" />;
};

const mapStateToProps = (state) => ({
  expenses: getExpensesToConfirmed(state),
});
export default connect(mapStateToProps)(Confirm);
