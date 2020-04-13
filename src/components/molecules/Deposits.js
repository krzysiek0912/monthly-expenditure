import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../atoms/Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = ({ amount, date = new Date() }) => {
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
        {amount}zł
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {monthNames[month]}, {year}
      </Typography>
    </>
  );
};

export default Deposits;
