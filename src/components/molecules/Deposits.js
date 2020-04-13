import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../atoms/Title';
import { getMontchAmount } from '../../redux/expensesReducer';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = ({ getAmount, date = new Date() }) => {
  const classes = useStyles();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = date.getMonth();
  const year = date.getFullYear();
  return (
    <>
      <Title>Spending month</Title>
      <Typography component="p" variant="h4">
        {getAmount(date)}zł
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {monthNames[month]}, {year}
      </Typography>
    </>
  );
};
const mapStateToProps = (state) => ({
  getAmount: (date) => getMontchAmount(state, date),
});
export default connect(mapStateToProps)(Deposits);
