import { Button, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';

const Header = () => {
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

  return (
    <PageHeader
      title={
        <Link to="/home" style={{ color: '#000' }}>
          Primadonna
        </Link>
      }
      subTitle="열심히 살자"
      extra={[]}
    />
  );
};
export default Header;
