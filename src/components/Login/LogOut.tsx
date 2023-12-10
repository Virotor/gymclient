


import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Carousel, Form, Input, Layout, message } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useAppDispatch, useAppSelector } from '../../hooks';
import type { RootState } from '../../store';
import { auth, ILogin } from '../../redux/reducers/UserSlice';


import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';



const LogOut: React.FC = () => {
 
  return (
    <>
    </>
  );
}

export default LogOut;