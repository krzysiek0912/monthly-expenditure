import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import uid from 'uid';
import styled from 'styled-components';
import { addCategory } from '../../../redux/categoriesReducer';

const StyledButton = styled(Button)`
  line-height: 44px;
  border-radius: 0 4px 4px 0;
`;
const StyledTextField = styled(TextField)`
  width: 100%;
  div {
    border-radius: 4px 0 0 4px;
  }
`;
const StyledForm = styled.form`
  display: flex;
`;
const CategoriesForm = ({ addCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const changeCategoryName = ({ target: { value } }) => {
    setCategoryName(value);
  };
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (categoryName !== '')
      addCategory({
        id: uid(),
        name: categoryName,
      });
  };
  return (
    <div>
      <StyledForm onSubmit={handleAddCategory} noValidate autoComplete="off">
        <StyledTextField
          id="outlined-basic"
          value={categoryName}
          onChange={changeCategoryName}
          label="Add Category"
          variant="outlined"
        />
        <StyledButton type="submit" variant="contained" color="primary">
          Dodaj
        </StyledButton>
      </StyledForm>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCategory: (category) => dispatch(addCategory(category)),
});
export default connect(null, mapDispatchToProps)(CategoriesForm);
