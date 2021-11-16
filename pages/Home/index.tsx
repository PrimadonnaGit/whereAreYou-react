import React, { FC, useCallback } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import { Button, Typography } from 'antd';
import { Redirect } from 'react-router-dom';
import Header from '@layouts/Header';

const { Text } = Typography;

const Home: FC = ({ children }) => {
  const { data, error, revalidate } = useSWR(`http://localhost:8000/api/auth/user`, fetcher, {
    dedupingInterval: 5000,
  });

  const onLogout = useCallback(() => {
    axios
      .delete('http://localhost:8000/api/auth/logout', {
        withCredentials: true,
      })
      .then(() => {
        revalidate();
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header />
      <div>
        <Text>{data?.email}</Text>
        <Button onClick={onLogout}>로그아웃</Button>
        {children}
      </div>
    </>
  );
};

export default Home;
