import React from 'react';

import CategoriesList from '../components/molecules/Categories/CategoriesList';
import CategoriesForm from '../components/molecules/Categories/CategoriesForm';

const CategoriesView = () => {
  return (
    <>
      <CategoriesForm></CategoriesForm>
      <CategoriesList></CategoriesList>
    </>
  );
};

export default CategoriesView;
