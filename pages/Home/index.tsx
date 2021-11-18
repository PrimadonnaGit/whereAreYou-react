import React, { FC, useCallback } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import { Button, Typography } from 'antd';
import { Redirect } from 'react-router-dom';
import Header from '@layouts/Header';

const { Text } = Typography;

const Home: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR(`http://localhost:8000/api/user`, fetcher, {
    dedupingInterval: 5000,
  });

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header />
      <div>
        <Text>{data?.email}</Text>
        {children}
      </div>
    </>
  );
};

export default Home;
