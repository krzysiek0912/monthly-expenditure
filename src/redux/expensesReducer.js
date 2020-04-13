import { sumAmount } from '../utils';
/* SELECTORS */
export const getExpenses = ({ expenses }) => expenses.list;
export const getMontchExpenses = ({ expenses }, searchDate = new Date(), order = 'asc') =>
  expenses.list
    .filter(({ date }) => {
      const expenseMonth = new Date(date).getMonth();
      const expenseYear = new Date(date).getYear();
      const month = searchDate.getMonth();
      const year = searchDate.getYear();
      return month === expenseMonth && year === expenseYear;
    })
    .sort((a, b) => {
      const aDate = new Date(a.date).getDate();
      const bDate = new Date(b.date).getDate();
      if (order === 'desc') return bDate - aDate;
      return aDate - bDate;
    });

export const getMontchAmount = ({ expenses }, searchDate = new Date()) => {
  const list = getMontchExpenses({ expenses }, searchDate);
  return list
    .map(({ amount }) => {
      return amount;
    })
    .reduce((prevValue, expenditure) => {
      const sum = sumAmount(prevValue, expenditure);
      return sum;
    }, 0);
};

// action name creator
const reducerName = 'expenses';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const ADD_EXPENDITURE = createActionName('ADD_EXPENDITURE');
export const REMOVE_EXPENDITURE = createActionName('REMOVE_EXPENDITURE');
export const UPDATE_EXPENDITURE = createActionName('UPDATE_EXPENDITURE');
export const LOAD_SAMPLE_EXPENDITURE = createActionName('LOAD_SAMPLE_EXPENDITURE');

/* ACTIONS */
export const addExpenditure = (payload) => ({ payload, type: ADD_EXPENDITURE });
export const removeExpenditure = (payload) => ({ payload, type: REMOVE_EXPENDITURE });
export const updateExpenditure = (payload) => ({ payload, type: UPDATE_EXPENDITURE });
export const loadSampleExpenditure = (payload) => ({ payload, type: LOAD_SAMPLE_EXPENDITURE });

/* Thunk */

const expenses =
  localStorage.getItem('state') !== null ? JSON.parse(localStorage.getItem('state')).expenses : [];
const expensesList = expenses?.list;

const initialState = {
  list: expensesList,
};

/* THUNKS */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case ADD_EXPENDITURE:
      return {
        ...statePart,
        list: [...statePart.list, action.payload],
      };
    case REMOVE_EXPENDITURE:
      return {
        ...statePart,
        list: [...statePart.list.filter((item) => !(item.id === action.payload))],
      };
    case UPDATE_EXPENDITURE:
      return {
        ...statePart,
        list: statePart.list.map((item) => {
          if (item.id === action.payload.id) {
            return { ...action.payload };
          }
          return item;
        }),
      };
    case LOAD_SAMPLE_EXPENDITURE:
      return {
        ...statePart,
        list: [...action.payload],
      };
    default:
      return statePart;
  }
}
