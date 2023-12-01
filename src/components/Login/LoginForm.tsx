


import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Carousel, Form, Input, Layout, message } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useAppDispatch, useAppSelector } from '../../hooks';
import type { RootState } from '../../store';
import { auth, ILogin } from '../../redux/reducers/UserSlice';


import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const headers = {
  "Content-Type": "application/json",

};
const contentStyle: React.CSSProperties = {

  color: '#fff',
  textAlign: 'center',
  marginLeft: "10%",
  marginRight: "10%",
  marginTop: "10%",
  marginBottom: "10%"
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const count = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage()

  function onFinish(values: any) {
    axios({
      method: 'post',
      url: 'http://localhost:8080/login/auth',
      withCredentials: false,
      data: {
        "username": values.username,
        "password": values.password
      },
      headers: headers
    }).then(function (response) {
      console.log(response.data)
      const user: ILogin = {
        username: values.username,
        password: values.password,
        jwtToken: response.data,
        id : response.data.id
      }
      dispatch(auth(user))
      navigate("/account");
    }).catch(function (error) {
      if (error.response) {
        errorShow("Ошибка неверный логин или пароль")
      } else if (error.request) {
        errorShow('Неверный логин или пароль')
      }
    })
  }

  const errorShow = (message : string) => {
    messageApi.open({
      type: 'error',
      content: message,
      duration: 4,
    });
  };



  return (
    <>{contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        {...formItemLayout}
        {...tailFormItemLayout}
        form={form}
        style={{ maxWidth: 600 }}
        scrollToFirstError

      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in  
          </Button>
        </Form.Item>

      </Form>
    </>
  );
}

export default LoginForm;