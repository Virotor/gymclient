import { Breadcrumb, Col, FloatButton, Modal, Row, message } from 'antd';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ISchedule } from '../../../redux/interfaces/Schedule';
import { takeSchedule } from '../../../redux/reducers/ScheduleSlice';
import type { RootState } from '../../../store';
// import { RecordClient } from '../Record/RecordClient';
import { EditTwoTone, UpCircleTwoTone } from '@ant-design/icons';
import { getEmployeeInfo } from '../../../redux/api/Employee/APICalls';
import { IEmployee } from '../../../redux/interfaces/Employee';
import { takeEmployeeInfo } from '../../../redux/reducers/EmployeeSlice';
import { ClientDiscription } from './UserDiscription';
import { UserGroups } from './UserGroups';
import { UserInfo } from './UserInfo';
import { UserSchedule } from './UserSchedule';
import styles from './user.module.scss';

export const UserPageEmployee: React.FC = () => {


  const user = useAppSelector((state: RootState) => state.user)
  const [messageApi, contextHolder] = message.useMessage()
  const [employeeId, setEmployeeId] = useState(-1)
  const [isLoading, setLoading] = useState(true)
  const [updateImage, setUpdateImage] = useState(true)
  const client = useAppSelector((state: RootState) => state.client)
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log(user)
    getUserId(user.user.username).then(function () {
      takeClient(employeeId);
      getUserSchedule(employeeId);
      setLoading(() => false)
    }
    )
    document.title = "Account"

  }, [user.user, isLoading])
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function getUserSchedule(employeeId: number) {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/employee/getSchedule?id=' + employeeId,
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
      url: 'http://localhost:8080/employee/getEmployeeByUserName?userName=' + username,
      withCredentials: false,
    }).then(function (response) {
      setEmployeeId(() => response.data.id)
      console.log(employeeId)
    }).catch(function (error) {
      if (error.response) {
        showMessage(error.response.data.message, "error");

      }
      else {
        showMessage("Ошибка сервера, сервер недоступен", "error");
      }

    });
  }



  // async function getClientAvatar(clientId: number) {
  //   await axios({
  //     method: 'get',
  //     url: 'http://localhost:8080/client/get/avatar?id=' + clientId
  //   }).then(async function (response) {
  //     console.log(response)
  //     let image: RcFile = response.data as RcFile
  //     let src: string = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(image);
  //       reader.onload = () => resolve(reader.result as string);
  //     });
  //     let path = '/avatar.png';
  //   }).catch(function (error) {
  //     if (error.response) {
  //       showMessage(error.response.data.message, "error");
  //     }
  //     else {
  //       showMessage("Ошибка сервера, сервер недоступен", "error");
  //     }
  //   });
  // }

  function takeClient(clientId: number) {
    if (clientId !== -1) {
      getEmployeeInfo(clientId, showMessage).then((value) => {
        dispatch(takeEmployeeInfo(value.data as IEmployee))
        //dispatch(takeClientGroups(value.data.groupTrainings as IGroup[]))
      })
    }
  };


  const showMessage = (message: string, type: any) => {
    messageApi.open({
      type: type,
      content: message,
      duration: 4,
    });
  };

  const handleUpdateImage = () => {
    console.log("update")
    setUpdateImage(!updateImage)
  }


  const items = [
    {
      key: 'part-1',
      href: '#part-1',
      title: 'About',
    },
    {
      key: 'part-2',
      href: '#part-2',
      title: 'Schedule',
    },
    {
      key: 'part-3',
      href: '#part-3',
      title: 'Groups',
    },
    {
      key: 'part-4',
      href: '#part-4',
      title: 'Records',
    },
  ]

  return (
    <>
     <div >
      <Breadcrumb className={styles.anchor} 
        //direction="horizontal"
        items={items}
      />
    </div> 
    
    {/* <div className={styles.component}> */}

     {contextHolder}
     <Row className={styles.rowuserpage}>
        <Col id='part-1' className={styles.coluserpage}>
        <div style={{ fontSize: 60, color: 'black', margin: '0px 0px 0px 0px' }}>
           About
         </div>
         <ClientDiscription client={client.client} update={updateImage} />
       </Col> 
       <Col id='part-2' className={styles.coluserpage}>
         <div style={{ fontSize: 60, color: 'black', margin: '0px 0px 0px 0px' }}>
           Schedule 
         </div>
         <UserSchedule parentClientId={employeeId} />
       </Col>
       <Col id='part-3' className={styles.coluserpage}>
         <div style={{ fontSize: 60, color: 'black', margin: '0px 0px 0px 0px' }}>
           Groups
         </div>
         <UserGroups parrentUserId={employeeId} />
       </Col>
       <Col id='part-4' className={styles.coluserpage}>
         <div style={{ fontSize: 60, color: 'black', margin: '0px 0px 0px 0px' }}>
           Records
         </div>
         {/* <RecordClient /> */}
       </Col>
       <Modal title="Edit info" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <UserInfo parrentUserId={employeeId} updateClient={takeClient} updateImage={handleUpdateImage} />
       </Modal>
     </Row>
     
     <FloatButton.Group
       //onClick={() => setOpen(!open)}
       //open={open}
       trigger="hover"
       style={{ right: 24 }}
       icon={  <UpCircleTwoTone /> }
     >
       <FloatButton 
       icon = { <EditTwoTone />}onClick={showModal}
       tooltip={<div>Edit info</div>}
        />
       {/* <FloatButton 
       icon={<PlusCircleTwoTone />} 
       tooltip={<div>Add group</div>}
       /> */}
     </FloatButton.Group>
   {/* </div> */}
    </>
   

  )
}

