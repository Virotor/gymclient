import { PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Empty,
  Skeleton,
  Space,
  Table,
  message
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IGroup, getGroupType, groupSkillType } from '../../../redux/interfaces/Group';
import { RootState } from '../../../store';

import { clientAddNewGroup, clientDeleteGroup } from '../../../redux/reducers/ClientSlice';



dayjs.extend(customParseFormat);


interface DataType {
  id: number;
  groupNumber: string;
  groupAgeType: string;
  gropSkillType: string;
  groupType: string;
}





const initialState: IGroup = {
  id: -1,
  groupNumber: '',
  groupType: '',
  groupAgeType: '',
  gropSkillType: ''
}

type GroupProps = {
  parrentUserId: number;

}

export const UserGroups: React.FunctionComponent<PropsWithChildren<GroupProps>> = ({ parrentUserId }: GroupProps) => {
  const client = useAppSelector((state: RootState) => state.client)

  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(true)

  const [userId, setUserId] = useState(parrentUserId)
  const [groups, setGroups] = useState<IGroup[]>([initialState])
  const [isModalOpen, setIsModalOpen] = useState(false);


  const columns: ColumnsType<DataType> = [
    {
      title: 'Group number',
      dataIndex: 'groupNumber',
      sorter: (a, b) => a.groupAgeType > b.groupAgeType ? 1 : -1,
      filterSearch(input, record) {
        return record.value == input
      },
    },
    {
      title: 'groupAgeType',
      dataIndex: 'groupAgeType',
    },
    {
      title: 'gropSkillType',
      dataIndex: 'gropSkillType',
      filters: groupSkillType,
      onFilter: (value, record) => record.gropSkillType.indexOf(value as string) === 0,
    },
    {
      title: 'Action',
      render: (text, record, index) => (
        <Space size="middle">
          {/* <PopUp record={record} deleteRecord={deleteGroupClient} /> */}
        </Space>

      )

    },
  ];




  useEffect(() => {


    setLoading(() => false)
    setUserId(() => parrentUserId)
  }, [parrentUserId, userId, loading])

  async function getAllGroups() {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/groups/all'
    }).then(function (response) {
      let temp: IGroup[] = response.data as IGroup[]
      setGroups(() => temp)
    })

  }


  async function addNewGroup(group: IGroup) {
    let uri: string = 'http://localhost:8080/groups/addClientToGroup?clientId=' + client.client.id + '&groupId=' + group.id
    await axios({
      method: 'get',
      url: uri,
    }).then(function (response) {
      setGroups((temp) => [...temp.filter((e) => e.id !== group.id)])
      dispatch(clientAddNewGroup(group))
    })

  }

  async function deleteGroupClient(id: number) {
    await deleteGroup(client.client.groups.find((e) => e.id === id) as IGroup)
  }

  async function deleteGroup(group: IGroup) {
    let uri: string = 'http://localhost:8080/groups/deleteClientGroup?clientId=' + client.client.id + '&groupId=' + group.id
    await axios({
      method: 'get',
      url: uri,
    }).then(function (response) {
      console.log(response.data)
      setGroups((temp) => [...temp, group])
      dispatch(clientDeleteGroup(group.id))
    })

  }




  const showModal = () => {
    getAllGroups().then(function () {
      setIsModalOpen(true);
    }

    )


  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };






  const showMessage = (message: string, type: any) => {
    messageApi.open({
      type: type,
      content: message,
      duration: 4,
    });
  };

  function filterGroup(groups: IGroup[]) {
    return groups.filter((group) => client.client.groups.findIndex((e) => e.id === group.id) === -1).filter((e) => e.groupType.toLowerCase() !== 'solo' && e.groupAgeType === getGroupType(client.client.birthDay))
  }

  return (<>
    <Skeleton loading={loading}>
      <Space>
        <Button type="primary" onClick={showModal} size='large'>
          <PlusSquareOutlined /> group
        </Button>
        {/* <AddNewGroup addNewGroup={addNewGroup} groups={filterGroup(groups)} isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} /> */}
      </Space>
      {client.client.groups.filter((e) => e.groupType.toLowerCase() !== 'solo').length > 0
        ?
        <Table
          pagination={{ position: ['none', 'bottomRight'] }}
          columns={columns}
          dataSource={client.client.groups.filter((e) => e.groupType.toLowerCase() !== 'solo')}
        />
        :
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={
            <span>
              In this day not
            </span>
          }
        >
        </Empty>
      }


    </Skeleton>
  </>)
}