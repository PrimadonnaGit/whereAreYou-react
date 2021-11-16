import styled from '@emotion/styled';
import { Layout } from 'antd';

export const CenterLayer = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  min-height: calc(100vh - 3.125rem - 24.625rem - 5rem);
`;

export const Body = styled.body`
  margin-top: 10rem;
  max-width: 20rem;
  text-align: center;
  width: 100%;
`;
