import { Col, Row, Segmented, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import LoginForm from './LoginForm';
import { RegisterForm } from './RegisterForm';
import {LoginOutlined,AppstoreOutlined } from '@ant-design/icons'
import style from './login.module.scss';

const { TabPane } = Tabs;





const Login: React.FC = () => {

    const params = useParams();

    const [isLoginPage, setIsLoginPage] = useState(true)

    useEffect(() => {
        document.title = "Login"
    }, [])
    console.log(params);

    function handleOnClick (value : string | number) {
        setIsLoginPage(value==='login');
    }

    return (
        <div className={style.component}>
            <Row className={style.row}>
                <Col xs={20} sm={16} md={12} lg={16} xl={14} className={style.label}>
                    <Segmented className = {style.tab}
                        options={[
                            { label: 'Sign up', value: 'login', icon: <LoginOutlined /> },
                            { label: 'Sign in', value: 'register', icon: <AppstoreOutlined /> },
                        ]}
                        onChange={handleOnClick}
                    />
                    {
                        isLoginPage
                        ?
                        <LoginForm />
                        :
                        <RegisterForm />
                    }
                    {/* <Tabs className={style.tab}
                        tabPosition={'top'}
                        defaultActiveKey="1"
                    >
                        <TabPane tab="Авторизация" key="1" >
                            <LoginForm />
                        </TabPane>
                        <TabPane tab="Регистрация" key="2">
                            <RegisterForm />
                        </TabPane>
                    </Tabs> */}
                </Col>
                <Col xs={2} sm={4} md={10} lg={6} xl={8} className={style.col}>
                    <>
                        <p style={{ fontSize: 60, color: 'white', margin: 0 }}>make your</p>
                        <p style={{ fontSize: 60, color: 'white', margin: 0, fontWeight: "bold" }}>BODY SHAPE</p>
                    </>
                </Col>
            </Row>
        </div>

    )
}

export default Login;