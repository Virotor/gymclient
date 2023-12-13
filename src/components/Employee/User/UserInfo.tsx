

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
import { useAppSelector } from '../../../hooks';
// import ImgCrop from 'antd-img-crop';
import { RangePickerProps } from 'antd/es/date-picker';
import axios from 'axios';
import { PropsWithChildren, useEffect, useState } from 'react';
import { RootState } from '../../../store';
import styles from './user.module.scss'
import { UploaderImage } from '../../UploaderImage';

dayjs.extend(customParseFormat);

const { Option } = Select;



const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
  return current && current > dayjs().endOf('day');
};


type UserInfoProps = {
  parrentUserId: number;
  updateClient: (clientId: number) => void
  updateImage: () => void
}

export const UserInfo: React.FC<PropsWithChildren<UserInfoProps>> = ({ parrentUserId, updateClient, updateImage }: UserInfoProps) => {

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const employee = useAppSelector((state: RootState) => state.employee)
  const user = useAppSelector((state: RootState) => state.user)
  const [isChangeFiedls, setChangeFields] = useState(false)

  useEffect(() => {
    setValueToFieldsForm()
    return () => {
    }
  }, [parrentUserId, loading, employee.employee])





  async function saveClienInfo(values: any) {
    await axios({
      method: 'post',
      url: 'http://localhost:8080/employee/saveEmployee',
      withCredentials: false,
      data: {
        "id": employee.employee.id,
        "firstName": values.fisrtname,
        "secondName": values.secondname,
        "phoneNumber": values.phoneNumber,
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
        updateClient(employee.employee.id)
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
    console.log(employee.employee.id)
    if (value.birthDay === dayjs(employee.employee.birthDay) &&
      value.fisrtname === employee.employee.firstName &&
      value.gender === employee.employee.gender &&
      value.phoneNumber === employee.employee.phoneNumber &&
      value.secondname === employee.employee.secondName) {
      return false
    }
    return true
  }

  function setValueToFieldsForm() {
    form.setFieldsValue({
      birthDay: dayjs(employee.employee.birthDay),
      fisrtname: employee.employee.firstName,
      gender: employee.employee.gender,
      phoneNumber: employee.employee.phoneNumber,
      secondname: employee.employee.secondName,
    })
  }

  function resetForm() {
    form.setFieldsValue({
      birthDay: dayjs(employee.employee.birthDay),
      fisrtname: employee.employee.firstName,
      gender: employee.employee.gender,
      phoneNumber: employee.employee.phoneNumber,
      secondname: employee.employee.secondName,
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





  return (
    <>
      {contextHolder}
      <Skeleton loading={employee.isLoading} active={true}>
        <div className={styles.edit} >
          <Form
            form={form}
            name="userinfo"

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
              <Input style={{ width: '100%' }} />
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
            <Form.Item>
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
          <UploaderImage username={user.user.username} updateImage={updateImage}></UploaderImage>
        </div>
      </Skeleton>
    </>
  );

}

export interface ImageProps extends PropsWithChildren {
  username: string
  updateImage: () => void
}


