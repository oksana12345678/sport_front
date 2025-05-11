import styled from 'styled-components';

export const BlockWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
