

import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Popconfirm,
  Select,
  Skeleton,
  message
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { RangePickerProps } from 'antd/es/date-picker';
import axios from 'axios';
import { PropsWithChildren, useEffect, useState } from 'react';
import { RootState } from '../../store';
import { IClient } from '../../redux/interfaces/Client';
import { ClientDiscription } from './UserDiscription';

import { takeClientInfo, loadingInfo, takeClientGroups, clientEditInfo, clientAddNewGroup, clientDeleteGroup } from '../../redux/reducers/ClientSlice'


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


type UserInfoProps = {
  parrentUserId: number;
  updateClient: (clientId: number) => void
}

export const UserInfo: React.FC<PropsWithChildren<UserInfoProps>> = ({ parrentUserId, updateClient }: UserInfoProps) => {

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const client = useAppSelector((state: RootState) => state.client)
  const [isChangeFiedls, setChangeFields] = useState(false)

  useEffect(() => {
    setValueToFieldsForm()
    return () => {
    }
  }, [parrentUserId, loading, client.client])





  async function saveClienInfo(values: any) {
    await axios({
      method: 'post',
      url: 'http://localhost:8080/client/saveClient',
      withCredentials: false,
      data: {
        "id": client.client.id,
        "firstName": values.fisrtname,
        "secondName": values.secondname,
        "phoneNumber": (values.prefix + values.phoneNumber),
        "birthDay": values.birthDay,
        "gender": values.gender,
      },
    }).catch(function (error) {
      if (error.response) {
        showMessage(error.response.data.message, "error");
      }
      else {
        showMessage("Ошибка сервера, сервер недоступен", "error");
      }

    });
  }


  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(() => true);
    setLoading(() => true)
    let s = form.getFieldsValue()
    if (isChangedData(s)) {
      saveClienInfo(s).then(function () {
        s.phoneNumber = (s.prefix + s.phoneNumber)
        updateClient(client.client.id)
        setValueToFieldsForm()
        setOpen(() => false);
        setConfirmLoading(() => false);
        setChangeFields(() => false)
      })
    }

  };

  const handleCancel = () => {
    setOpen(false);
  };





  function isChangedData(value: any): boolean {
    console.log(value)
    console.log(client.client.id)
    if (value.birthDay === dayjs(client.client.birthDay) &&
      value.fisrtname === client.client.firstName &&
      value.gender === client.client.gender &&
      value.phoneNumber === client.client.phoneNumber.substring(4) &&
      value.prefix === client.client.phoneNumber.substring(0, 4) &&
      value.secondname === client.client.secondName) {
      return false
    }
    return true
  }

  function setValueToFieldsForm() {
    form.setFieldsValue({
      birthDay: dayjs(client.client.birthDay),
      fisrtname: client.client.firstName,
      gender: client.client.gender,
      phoneNumber: client.client.phoneNumber.substring(4),
      prefix: client.client.phoneNumber.substring(0, 4),
      secondname: client.client.secondName,
    })
  }

  function resetForm() {
    form.setFieldsValue({
      birthDay: dayjs(client.client.birthDay),
      fisrtname: client.client.firstName,
      gender: client.client.gender,
      phoneNumber: client.client.phoneNumber.substring(4),
      prefix: client.client.phoneNumber.substring(0, 4),
      secondname: client.client.secondName,
    })
    setChangeFields(false)
  }


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
        <Option value="375">+375</Option>
      </Select>
    </Form.Item>
  );



  return (
    <>
      {contextHolder}
      <Skeleton loading={client.isLoading} active={true}>
        <Form
          {...formItemLayout}
          form={form}
          name="userinfo"
          style={{ maxWidth: 600 }}
          scrollToFirstError
          onValuesChange={(e) => setChangeFields(() => true)}
          onFinish={(e) => console.log(e)}
        >
          <Form.Item
            name="fisrtname"
            label="First Name"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="secondname"
            label="Last Name"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your secondname!', whitespace: true }]}
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
            <Select placeholder="select your gender" >
              <Option value="0">Male</Option>
              <Option value="1">Female</Option>
              <Option value="2">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {isChangeFiedls ?
              <Flex gap="small">
                <Popconfirm
                  title="Title"
                  description="You're sure save changes?"
                  open={open}
                  onConfirm={handleOk}
                  okButtonProps={{ loading: confirmLoading }}
                  onCancel={handleCancel}
                >
                  <Button name="save" type="primary" onClick={() => showPopconfirm()} >
                    Save
                  </Button>
                </Popconfirm>
                <Button type="primary" name="reset" danger onClick={() => { resetForm() }} >
                  Reset
                </Button>
              </Flex>

              :
              <>
              </>
            }

          </Form.Item>
        </Form>
      </Skeleton>
    </>
  );

}


