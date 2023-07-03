import React from 'react';
import {styled} from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
  padding: 20px;
  gap: 10px;
`;

const StyledCardWrapper = styled.View`
  padding: 30px;
  border-radius: 10px;
  border-color: #9babb8;
  border-width: 1px;
`;
const StyledCardTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

export default function MyTabRoutes() {
  return (
    <StyledContainer>
      <StyledCardWrapper>
        <StyledCardTitle>신청중인 주문</StyledCardTitle>
      </StyledCardWrapper>
      <StyledCardWrapper>
        <StyledCardTitle>신청 받은 주문</StyledCardTitle>
      </StyledCardWrapper>
    </StyledContainer>
  );
}
