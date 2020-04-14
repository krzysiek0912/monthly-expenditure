import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import sampleData from 'data/sampleData.json';
import sampelCategories from 'data/sampelCategories.json';
import { loadSampleCategory } from 'redux/categoriesReducer';
import { loadSampleExpenditure } from 'redux/expensesReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    height: '10vh',
    textAlign: 'center',
  },
}));

const Settings = ({ loadSampleExpenditure, loadSampleCategory }) => {
  const classes = useStyles();
  const [isLoadedData, setIsLoadedData] = useState(false);
  const handleLoadSampleData = () => {
    loadSampleCategory(sampelCategories);
    loadSampleExpenditure(sampleData);
    setIsLoadedData(true);
  };
  const handleClose = () => {
    setIsLoadedData(false);
  };
  return (
    <div className={classes.root}>
      {!isLoadedData && (
        <Button onClick={handleLoadSampleData} type="submit" variant="contained" color="primary">
          Add sample data
        </Button>
      )}
      <div>
        <Snackbar
          open={isLoadedData}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          key={`bottom,center`}
        >
          <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">
            Data has been loaded!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadSampleExpenditure: (data) => dispatch(loadSampleExpenditure(data)),
  loadSampleCategory: (data) => dispatch(loadSampleCategory(data)),
});

export default connect(null, mapDispatchToProps)(Settings);
