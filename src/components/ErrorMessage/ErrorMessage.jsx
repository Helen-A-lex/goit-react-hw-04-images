import styled from 'styled-components';

export const Text = styled.div`
  font-size: 14px;
  color: red;
  padding:10px;
  text-align:center;
`;

export const ErrorMessage = ({ children }) => {
  return <Text>{children}</Text>;
};