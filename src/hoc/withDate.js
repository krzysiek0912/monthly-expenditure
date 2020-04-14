import React, { useState } from 'react';
import Title from '../components/atoms/Title';
import CustomToolbar from '../components/atoms/CustomToolbar';
import { DatePicker } from '@material-ui/pickers';
import styled from 'styled-components';

const StyledDate = styled(DatePicker)`
  width: 100%;
  text-align: center;
  input {
    font-size: 45px;
    display: inline-block;
    text-align: center;
  }
`;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const withDate = (WrappedComponent) => {
  const WithDate = (props) => {
    const [date, setDate] = useState(new Date());

    return (
      <>
        <StyledWrapper>
          <Title>Set Month</Title>
          <StyledDate
            value={date}
            onChange={setDate}
            views={['month']}
            format={'MM-yyyy'}
            ToolbarComponent={CustomToolbar}
          />
        </StyledWrapper>
        <WrappedComponent date={date} {...props} />
      </>
    );
  };
  return WithDate;
};

export default withDate;
