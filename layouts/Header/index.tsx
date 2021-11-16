import { Button, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <PageHeader
      title={
        <Link to="/" style={{ color: '#000' }}>
          Primadonna
        </Link>
      }
      subTitle="열심히 살자"
      extra={[
        <Link to="/login">
          <Button type="primary" htmlType="submit" className="login-form-button">
            로그인
          </Button>
        </Link>,
      ]}
    />
  );
};
export default Header;
