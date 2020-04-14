import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
import { getCategories } from 'redux/categoriesReducer';
import { errorRequest } from 'redux/requestReducer';
import { addExpenditure, updateExpenditure, removeExpenditure } from 'redux/expensesReducer';
import uid from 'uid';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const Table = ({
  data,
  title = '',
  categories,
  removeExpenditure,
  addExpenditure,
  updateExpenditure,
  addError,
}) => {
  const categoriesList = categories.reduce((accumulator, item) => {
    return { ...accumulator, [item.id]: item.name };
  }, {});
  const [state, setState] = React.useState({
    columns: [
      { title: 'Id ', field: 'id', hidden: 'true', type: 'string' },
      { title: 'Name', field: 'name' },
      {
        title: 'Category',
        field: 'category',
        lookup: categoriesList,
      },
      { title: 'Date', field: 'date', type: 'date' },
      {
        title: 'Amount',
        field: 'amount',
        type: 'numeric',
      },
      {
        title: 'Automatic Payment',
        field: 'type',
        type: 'boolean',
      },
      {
        title: 'Paid',
        field: 'paid',
        type: 'boolean',
      },
    ],
    data: data,
  });

  return (
    <MaterialTable
      icons={tableIcons}
      title={title}
      columns={state.columns}
      data={state.data}
      options={{
        exportButton: true,
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          })
            .then(() => {
              const clearObj = { ...newData, id: uid() };
              delete clearObj.tableData;
              addExpenditure(clearObj);
            })
            .catch((error) => addError(error)),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          })
            .then(() => {
              const clearObj = { ...newData, id: oldData.id };
              delete clearObj.tableData;
              updateExpenditure(clearObj);
            })
            .catch((error) => addError(error)),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(removeExpenditure(oldData.id));
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
            .then(({ id }) => {
              removeExpenditure(id);
            })
            .catch((error) => addError(error)),
      }}
    />
  );
};
const mapStateToProps = (state) => ({
  categories: getCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  addError: (error) => dispatch(errorRequest(error)),
  updateExpenditure: (data) => dispatch(updateExpenditure(data)),
  addExpenditure: (data) => dispatch(addExpenditure(data)),
  removeExpenditure: (id) => dispatch(removeExpenditure(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
