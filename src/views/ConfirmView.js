import React from 'react';
import Container from '@material-ui/core/Container';
import Confirm from 'components/organisms/Confirm';

const ConfirmView = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Confirm></Confirm>
    </Container>
  );
};

export default ConfirmView;
