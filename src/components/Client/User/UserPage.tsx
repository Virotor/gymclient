import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Image, Carousel, Form, Input, Layout, Tabs, message } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import type { RootState } from '../../../store';
import { auth, ILogin } from '../../../redux/reducers/UserSlice';
import { UserInfo } from './UserInfo';
import { UserSchedule } from './UserSchedule';
import { UserGroups } from './UserGroups';
import axios from 'axios';
import { useEffect, useState } from 'react';
import reportWebVitals from '../../../reportWebVitals';
import { ClientDiscription } from './UserDiscription';
import { IClient } from '../../../redux/interfaces/Client';
import { takeClientGroups, takeClientInfo } from '../../../redux/reducers/ClientSlice';
import { RecordClient } from '../Record/RecordClient';
import { takeSchedule } from '../../../redux/reducers/ScheduleSlice';
import { ISchedule } from '../../../redux/interfaces/Schedule';
import { IGroup } from '../../../redux/interfaces/Group';


const { TabPane } = Tabs

export const UserPage: React.FC = () => {


  const user = useAppSelector((state: RootState) => state.user)
  const [messageApi, contextHolder] = message.useMessage()
  const [clientId, setClientId] = useState(-1)
  const [isLoading, setLoading] = useState(true)
  const client = useAppSelector((state: RootState) => state.client)
  const dispatch = useAppDispatch()

  useEffect(() => {
      
      getUserId(user.user.username).then(function () {
        getClientInfo(clientId);
        getUserSchedule(clientId);  
        setLoading(() => false)
      }
      )
    

  }, [user.user, isLoading])


  async function getUserSchedule(clientId: number) {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/client/schedule?id=' + clientId,
      withCredentials: false,
    }).then(function (response) {
      dispatch(takeSchedule(response.data as ISchedule[]))
    }).catch(function (error) {
      if (error.response) {
        //showMessage(error.response.data.message, "error");
      }
      else {
        //showMessage("Ошибка сервера, сервер недоступен", "error");
      }

    });
  }


  async function getUserId(username: string) {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/client/getClientIdByUserName?userName=' + username,
      withCredentials: false,
    }).then(function (response) {
      setClientId(() => response.data.id)
      console.log(clientId)
    }).catch(function (error) {
      if (error.response) {
        showMessage(error.response.data.message, "error");

      }
      else {
        showMessage("Ошибка сервера, сервер недоступен", "error");
      }

    });
  }

  async function getClientInfo(clientId: number) {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/client/info?id=' + clientId
    }).then(function (response) {
      let temp: IClient = response.data as IClient
      console.log(temp)
      dispatch(takeClientInfo(temp))
      dispatch(takeClientGroups(response.data.groupTrainings as IGroup[]))
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
            <ClientDiscription client={client.client} />
          </TabPane>
          <TabPane tab="Edit info" key="2" >
            <UserInfo parrentUserId={clientId} updateClient={getClientInfo} />
          </TabPane>
          <TabPane tab="Schedule" key="3">
            <UserSchedule parentClientId={clientId} />
          </TabPane>
          <TabPane tab="Groups" key="4">
            <UserGroups parrentUserId={clientId} />
          </TabPane>
          <TabPane tab="Records" key="5">
            <RecordClient />
          </TabPane>
        </Tabs>
      </Content>
    </Layout >
  )
}

