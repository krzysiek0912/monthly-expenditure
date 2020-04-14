import React from 'react';
import Container from '@material-ui/core/Container';
import Settings from 'components/organisms/Settings';

const settingsView = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Settings></Settings>
    </Container>
  );
};

export default settingsView;
