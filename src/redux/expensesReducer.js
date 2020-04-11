/* SELECTORS */
export const getExpenses = ({ expenses }) => expenses.list;

// action name creator
const reducerName = 'expenses';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const ADD_EXPENDITURE = createActionName('ADD_EXPENDITURE');
export const REMOVE_EXPENDITURE = createActionName('REMOVE_EXPENDITURE');

/* ACTIONS */
export const addExpenditure = (payload) => ({ payload, type: ADD_EXPENDITURE });
export const removeExpenditure = (payload) => ({ payload, type: REMOVE_EXPENDITURE });

const expensesList =
  localStorage.getItem('state') !== null
    ? JSON.parse(localStorage.getItem('state')).expenses.list
    : [];

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
        list: [...statePart.list.filter((element) => !(element.id === action.payload))],
      };
    default:
      return statePart;
  }
}
