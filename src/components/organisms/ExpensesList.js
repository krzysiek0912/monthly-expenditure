import React from 'react';
import { connect } from 'react-redux';
import Table from 'components/molecules/Table';
import { getExpenses } from 'redux/expensesReducer';

const ExpenseList = ({ data }) => {
  return <Table data={data} title="All Expanse" />;
};
const mapStateToProps = (state) => ({
  data: getExpenses(state),
});

export default connect(mapStateToProps)(ExpenseList);
