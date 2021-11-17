import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined, FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import Header from '@layouts/Header';
import { Body, CenterLayer } from '@pages/Login/styles';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [errMessage, setErrMessage] = useState('');
  const { data, error, revalidate, mutate } = useSWR(`http://localhost:8000/api/auth/user`, fetcher, {
    dedupingInterval: 5000,
  });

  const onFinish = useCallback(() => {
    setErrMessage('');
    axios
      .post('http://localhost:8000/api/auth/login/email', form.getFieldsValue(), {
        withCredentials: true,
      })
      .then((response) => {
        mutate(response.data, false); // if true: OPTIMISTIC UI
      })
      .catch((error) => {
        setErrMessage(error.response?.data?.msg);
      })
      .finally(() => {});
  }, []);

  if (data === undefined && !error) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Header />
      <CenterLayer>
        <Body>
          <Title level={1}>로그인</Title>
          <Form form={form} name="form-login" onFinish={onFinish}>
            <Form.Item name="facebook-login" rules={[{ required: false }]}>
              <Button
                name="button-facebook"
                size="large"
                icon={
                  <FacebookFilled
                    style={{
                      fontSize: '18px',
                      float: 'left',
                      marginTop: '3px',
                    }}
                  />
                }
                block
              >
                Facebook으로 계속하기
              </Button>
            </Form.Item>
            {/*<Form.Item*/}
            {/*    name="google-login"*/}
            {/*>*/}
            {/*    <Button*/}
            {/*        name="button-google"*/}
            {/*        size="large"*/}
            {/*        icon={<GoogleOutlined style={{fontSize: "18px", float: "left", marginTop: "3px"}}/>}*/}
            {/*        block>*/}
            {/*        Google로 계속하기*/}
            {/*    </Button>*/}
            {/*</Form.Item>*/}

            <Divider plain>OR</Divider>

            <Form.Item name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="pw"
                size="large"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item shouldUpdate>
              {() => (
                <Button type="primary" htmlType="submit" size="large" block>
                  로그인 하기
                </Button>
              )}
            </Form.Item>
            <Text type="danger">{errMessage}</Text>
          </Form>
          <br />
          <Link to="/register">계정 만들기 {'>'}</Link>
        </Body>
      </CenterLayer>
    </>
  );
};

export default Login;
