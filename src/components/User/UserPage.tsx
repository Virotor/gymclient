import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Image, Carousel, Form, Input, Layout, Tabs, message } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useAppDispatch, useAppSelector } from '../../hooks';
import type { RootState } from '../../store';
import { auth, ILogin } from '../../redux/reducers/UserSlice';
import { UserInfo } from './UserInfo';
import { UserSchedule } from './UserSchedule';
import { UserGroups } from './UserGroups';
import axios from 'axios';
import { useEffect, useState } from 'react';
import reportWebVitals from '../../reportWebVitals';


const { TabPane } = Tabs

export const UserPage: React.FC = () => {

    const client = useAppSelector((state: RootState) => state.client)
    const [form] = Form.useForm();
    const user = useAppSelector((state: RootState) => state.user)
    const [messageApi, contextHolder] = message.useMessage()
    const [userId, setUserId] = useState(-1)
    const [isLoading, setLoading] = useState(true)
    const [clientInfo, setClientInfo] = useState({
      id: -1,
      firstName: '',
      secondName: '',
      phoneNumber: '',
      birthDay: new Date(),
      gender: 0,
    })
  
    useEffect(()=>{
        if(userId==-1 && isLoading){
            setLoading(()=>false)
            getUserId(user.user.username).then(()=>console.log(1))
        }
    }, [user.user]) 



    async function getUserId(username: string) {
       await axios({
          method: 'get',
          url: 'http://localhost:8080/client/getUserId?name=' + username,
          withCredentials: false,
        }).then(function (response) {
          setUserId((e) => e = response.data)
        }).catch(function (error) {
          if (error.response) {
            showMessage(error.response.data.message, "error");
          }
          else {
            showMessage("Ошибка сервера, сервер недоступен", "error");
          }
    
        });
      }



      const showMessage = (message: string, type: any) => {
        messageApi.open({
          type: type,
          content: message,
          duration: 4,
        });
      };

    return (
        <Layout>
            <Content style={{ padding: '0 50px', marginLeft: "10%", marginRight: "10%", marginTop: "10%", marginBottom: "10%" }}>
                <Tabs
                    tabPosition={'left'}
                    defaultActiveKey="1"
                >
                    <TabPane tab="About" key="1" >
                        <UserInfo parrentUserId={userId}></UserInfo>
                    </TabPane>
                    <TabPane tab="Schedule" key="2">
                        <UserSchedule></UserSchedule>
                    </TabPane>
                    <TabPane tab="Groups" key="3">
                        <UserGroups parrentUserId={userId}>
                         </UserGroups >
                    </TabPane>
                </Tabs>
            </Content>
        </Layout >
    )
}

