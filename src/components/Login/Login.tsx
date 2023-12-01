import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {  Steps, Layout, Tabs } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';

import { useAppDispatch, useAppSelector } from '../../hooks';
import type { RootState } from '../../store';
import { auth, ILogin } from '../../redux/reducers/UserSlice';

import { RegisterForm } from './RegisterForm'
import React, { FormEvent, useState } from 'react';
import LoginForm from './LoginForm';
import { useParams } from 'react-router';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const { TabPane } = Tabs;

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};




const description = 'This is a description';
const App: React.FC = () => (
  <Steps
    current={1}
    status="error"
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Process',
        description,
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
);

const Login: React.FC = (props) => {

    const count = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()

    const [currentTabs, setCurrenttabs] = useState(props == 'login' ? 1 : 2)
    const params = useParams();

    console.log(params);

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    return (
        <Layout>
            <Content style={{ padding: '0 50px', marginLeft: "10%", marginRight: "10%", marginTop: "10%", marginBottom: "10%" }}>
                <Tabs
                    tabPosition={'left'}
                    defaultActiveKey="1"
                >
                    <TabPane tab="Авторизация" key="1" >
                        <LoginForm />
                    </TabPane>
                    <TabPane tab="Регистрация" key="2">
                        <RegisterForm />
                    </TabPane>
                </Tabs>
            </Content>
            <Footer>
                <App/>
            </Footer>
        </Layout >
    )
}

export default Login;