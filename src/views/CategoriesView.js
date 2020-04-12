import React from 'react';
import Container from '@material-ui/core/Container';
import CategoriesList from '../components/molecules/Categories/CategoriesList';
import CategoriesForm from '../components/molecules/Categories/CategoriesForm';

const CategoriesView = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CategoriesForm></CategoriesForm>
      <CategoriesList></CategoriesList>
    </Container>
  );
};

export default CategoriesView;
