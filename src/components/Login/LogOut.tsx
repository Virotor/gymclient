


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



const LogOut: React.FC = () => {
  const [form] = Form.useForm();
  const count = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage()

  
  return (
    <>{contextHolder}
    </>
  );
}

export default LogOut;