import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Title from 'components/atoms/Title';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withDate from 'hoc/withDate';
import { dataToChart, dataToChartProgress } from 'utils';
import { getMonthAmount, getMonthExpenses } from 'redux/expensesReducer';
import Chart from 'components/molecules/Chart';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Reports = ({ getExpenses, date }) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const dataDay = dataToChart(getExpenses(date));
  const data = dataToChartProgress(getExpenses(date));
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Chart data={data} title="Progress" />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Per Day</Title>
            <BarChart width={730} height={250} data={dataDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  getExpenses: (date, order) => getMonthExpenses(state, date, order),
  getAmount: (date) => getMonthAmount(state, date),
});
export default withDate(connect(mapStateToProps)(Reports));
