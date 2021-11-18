import { Button, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import Text from 'antd/es/typography/Text';
import { ProfileImage } from '@layouts/Header/styles';
import gravatar from 'gravatar';

const Header = () => {
  const { data, error, revalidate } = useSWR(`http://localhost:8000/api/user`, fetcher, {
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
          whereAreYou?
        </Link>
      }
      subTitle="찾아보세요! 나의 협업 메이트 ☺️"
      extra={[
        <>
          {data ? (
            <Button type="primary" onClick={onLogout}>
              로그아웃
            </Button>
          ) : (
            ''
          )}
        </>,
        <>{data ? <ProfileImage src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.email} /> : ''}</>,
      ]}
    />
  );
};
export default Header;
