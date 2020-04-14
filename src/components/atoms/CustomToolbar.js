import React from 'react';
import PickerToolbar from '@material-ui/pickers/_shared/PickerToolbar';
import ToolbarButton from '@material-ui/pickers/_shared/ToolbarButton';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => {
  return {
    toolbar: {
      margin: '0 15px',
    },
  };
});
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
const CustomToolbar = function (props) {
  const { date, isLandscape, openView, setOpenView, title } = props;
  const classes = useStyles();
  const handleChangeViewClick = (view) => (e) => {
    setOpenView(view);
  };
  const month = date.getMonth();
  const year = date.getFullYear();
  return (
    <>
      <PickerToolbar isLandscape={isLandscape} title={title}>
        <ToolbarButton
          className={classes.toolbar}
          onClick={handleChangeViewClick('month')}
          selected={openView === 'month'}
          label={`${monthNames[month]} `}
        />
        <ToolbarButton
          className={classes.toolbar}
          onClick={handleChangeViewClick('year')}
          variant="h6"
          label={` ${year}`}
          selected={openView === 'year'}
        />
      </PickerToolbar>
    </>
  );
};

export default CustomToolbar;
