import React from 'react';
import Container from '@material-ui/core/Container';
import Settings from 'components/organisms/Settings';

const SettingsView = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Settings></Settings>
    </Container>
  );
};

export default SettingsView;
