import { Avatar, Button, Col, Descriptions, DescriptionsProps, Row } from 'antd';
import dayjs from 'dayjs';
import { PropsWithChildren, useEffect, useState } from 'react';
import { IClient } from '../../../redux/interfaces/Client';

import styles from './user.module.scss'

interface ClientDiscriptionProps extends PropsWithChildren {
  client: IClient
  update: boolean
}



export const ClientDiscription: React.FC<ClientDiscriptionProps> = ({ client, update }: ClientDiscriptionProps) => {

  const [requestParam, setRequestParam] = useState('')

  useEffect(() => {
    if (client.id !== -1)
      setRequestParam(() => "http://localhost:8080/image/get/employee?id=" + client.id)
  }, [client])


  return (
    <>
      <>
        <Row className={styles.row}>
          <Col xs={20} sm={16} md={12} lg={14} xl={12} className={styles.col}>
            <>
              <Avatar size={400} src={requestParam} shape='square'></Avatar>
            </>
          </Col>
          <Col xs={2} sm={4} md={10} lg={8} xl={10} className={styles.col}>
            <>
              <p style={{ fontSize: 60, color: 'white', margin: 0 }}>make your</p>
              <p style={{ fontSize: 60, color: 'white', margin: 0, fontWeight: "bold" }}>BODY SHAPE</p>
              <p style={{ fontSize: 22, color: 'white' }}>{client.firstName} {client.secondName}</p>
              <p style={{ fontSize: 22, color: 'white' }}>{dayjs(client.birthDay).format('DD.MM.YYYY')}</p>
              <p style={{ fontSize: 22, color: 'white' }}>{client.phoneNumber}</p>
            </>
          </Col>
        </Row>
      </>
    </>

  )
}