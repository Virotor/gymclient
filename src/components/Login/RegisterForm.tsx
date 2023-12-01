import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import { ILogin, headers } from '../../redux/reducers/UserSlice';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { RangePickerProps } from 'antd/es/date-picker';
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Select,
    message,
} from 'antd';
import { useAppDispatch } from '../../hooks';
import axios from 'axios';



dayjs.extend(customParseFormat);
const { Option } = Select;


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


const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
    return current && current > dayjs().endOf('day');
};

export const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const [messageApi, contextHolder] = message.useMessage()


    const onFinish = (values: any) => {
        const data = {
            'registrationUserDto': {
                "name": values.username,
                "password": values.password,
                "email": values.email,
                'statusActivate': 1,
                "userRole": [{ 'name': "ROLE_USER", 'id': 1 }],  
            },
            'manDTO': {
                "firstName": values.fisrstname,
                "secondName": values.secondname,
                "phoneNumber": (values.prefix + values.phoneNumber),
                "birthDay": values.birthDay,    
                "gender": values.gender,
            }

        };
        axios({
            method: 'post',
            url: 'http://localhost:8080/registaration/client',
            withCredentials: false,
            data: data,
            headers: headers
        }).then(function (response) {
            showMessage("Пользователь успешно создан", "success")
        }).catch(function (error) {
            if (error.response) {
                showMessage(error.response.data.message, "error")
            }
            else {
                showMessage("Ошибка сервера, сервер недоступен", "error")
            }
        })
        console.log('Received values of form: ', values);
    };


    const showMessage = (message: string, type: any) => {
        messageApi.open({
            type: type,
            content: message,
            duration: 4,
        });
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 90 }}>
                <Option value="+375">+375</Option>
            </Select>
        </Form.Item>
    );



    return (
        <>
            {contextHolder}
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="fisrtname"
                    label="FirstName"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="secondname"
                    label="SecondName"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input your secondname!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
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
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    name="email"
                    label="E-mail"
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="birthDay"
                    label="Birthday"
                    rules={[{ required: true, message: 'Please input birthday' }]}
                >
                    <DatePicker placement={'bottomLeft'} disabledDate={disabledDate} />
                </Form.Item>


                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your gender">
                        <Option value="1">Male</Option>
                        <Option value="2">Female</Option>
                        <Option value="3">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterForm;
