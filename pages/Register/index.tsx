import React, { useCallback, useState } from 'react';
import { Form, Input, Checkbox, Button, Layout, Typography, Divider } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { FacebookFilled } from '@ant-design/icons';
import Header from '@layouts/Header';
import { Body, CenterLayer } from '@pages/Register/styles';
import axios from 'axios';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [errMessage, setErrMessage] = useState('');
  const { data, error, revalidate } = useSWR(`http://localhost:8000/api/user`, fetcher, {
    dedupingInterval: 5000,
  });

  const onFinish = useCallback(() => {
    setErrMessage('');
    axios
      .post('http://localhost:8000/api/auth/register/email', form.getFieldsValue(), { withCredentials: true })
      .then((response) => {
        revalidate();
      })
      .catch((error) => {
        setErrMessage(error.response?.data?.msg);
      })
      .finally(() => {});
  }, []);

  if (data) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Header />
      <CenterLayer>
        <Body>
          <Title level={1}>계정 만들기</Title>
          <Form form={form} name="form-register" onFinish={onFinish} scrollToFirstError>
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
                Facebook으로 계정 만들기
              </Button>
            </Form.Item>
            <Divider plain>OR</Divider>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item name="phone_number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
              <Input placeholder="Phone (- 없이)" />
            </Form.Item>

            <Form.Item
              name="marketing_agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
            >
              <Checkbox>I have read the Agreement</Checkbox>
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button type="primary" htmlType="submit" size="large" block>
                  가입하기
                </Button>
              )}
            </Form.Item>
            <Text type="danger">{errMessage}</Text>
          </Form>
          <br />
          <Link to="/login">로그인 {'>'}</Link>
        </Body>
      </CenterLayer>
    </>
  );
};

export default Register;
