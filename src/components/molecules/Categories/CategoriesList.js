import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '../../atoms/ListItem';
import { getCategories, removeCategory } from '../../../redux/categoriesReducer';

const CategoriesList = ({ categories, removeCategory }) => {
  const categoriesList = categories.map(({ name, id }) => (
    <ListItem key={id} id={id} text={name} remove={removeCategory}></ListItem>
  ));
  return (
    <div>
      <List dense={true}>{categoriesList}</List>
    </div>
  );
};
const mapStateToProps = (state) => ({ categories: getCategories(state) });
const mapDispatchToProps = (dispatch) => ({
  removeCategory: (id) => dispatch(removeCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
