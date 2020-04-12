/* SELECTORS */
export const getCategories = ({ categories }) => categories.list;
export const getCategoriesIds = ({ categories }) => categories.ids;

// action name creator
const reducerName = 'categories';
const createActionName = (name) => `app/${reducerName}/${name}`;

export const ADD_CATEGORY = createActionName('ADD_CATEGORY');
export const REMOVE_CATEGORY = createActionName('REMOVE_CATEGORY');
export const LOAD_SAMPLE_CATEGORY = createActionName('LOAD_SAMPLE_CATEGORY');

/* ACTIONS */
export const addCategory = (payload) => ({ payload, type: ADD_CATEGORY });
export const removeCategory = (payload) => ({ payload, type: REMOVE_CATEGORY });
export const loadSampleCategory = (payload) => ({ payload, type: LOAD_SAMPLE_CATEGORY });

const categories =
  localStorage.getItem('state') !== null
    ? JSON.parse(localStorage.getItem('state')).categories
    : [];
const categoriesList = categories?.list;
const categoriesId = categories?.id;
const initialState = {
  list: categoriesList || [],
  ids: categoriesId || [],
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
    case LOAD_SAMPLE_CATEGORY:
      return {
        ...statePart,
        list: [...action.payload],
        ids: [...action.payload.map((category) => category.id)],
      };
    default:
      return statePart;
  }
}
