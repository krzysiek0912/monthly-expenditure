/* SELECTORS */
export const getCategories = ({ categories }) => categories.list;
export const getCategoriesIds = ({ categories }) => categories.ids;

// action name creator
const reducerName = 'categories';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const ADD_CATEGORY = createActionName('ADD_CATEGORY');
export const REMOVE_CATEGORY = createActionName('REMOVE_CATEGORY');

/* ACTIONS */
export const addCategory = (payload) => ({ payload, type: ADD_CATEGORY });
export const removeCategory = (payload) => ({ payload, type: REMOVE_CATEGORY });

const categories =
  localStorage.getItem('state') !== null
    ? JSON.parse(localStorage.getItem('state')).categories
    : [];

const initialState = {
  list: categories.list || [],
  ids: categories.id || [],
};

/* THUNKS */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...statePart,
        list: [...statePart.list, action.payload],
        ids: [...statePart.ids, action.payload.id],
      };
    case REMOVE_CATEGORY:
      return {
        ...statePart,
        list: [...statePart.list.filter((element) => !(element.id === action.payload))],
        ids: [...statePart.ids.filter((element) => !(element === action.payload))],
      };
    default:
      return statePart;
  }
}
