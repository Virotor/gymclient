


import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, message } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { ILogin, auth, role } from '../../redux/reducers/UserSlice';
import type { RootState } from '../../store';


import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

import styles from './login.module.scss'
import { authUser } from '../../redux/utils/auth';

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
    }).then(function (response) {
      console.log(response.data)
      const user: ILogin = {
        username: values.username,
        password: values.password,
        jwtToken: response.data,
        id: response.data.id,
        role : response.data.roles[0].authority.toLowerCase() as role
      }
      authUser(user.password, user.username, user.jwtToken, user.role as string)
      //dispatch(setRole((response.data.roles[0].authority as string).toLowerCase() as role))
      dispatch(auth(user))
      navigate("/account");
    }).catch(function (error) {
      if (error.response) {
        errorShow("Ошибка неверный логин или пароль")
      } else if (error.request) {
        errorShow('Сервер недоступен')
      }
    })
  }

  const errorShow = (message: string) => {
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
            className={styles.login}
            onFinish={onFinish}
            form={form}
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
              <Button  htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>

          </Form>
       
     

    </>
  );
}

export default LoginForm;