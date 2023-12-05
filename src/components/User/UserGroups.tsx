import { PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
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
import { useAppSelector } from '../../hooks';
import { IGroup, getGroupType, groupSkillType } from '../../redux/interfaces/Group';
import { RootState } from '../../store';
import { AddNewGroup } from '../Group/AddNewGroup';


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
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(true)

  const [userId, setUserId] = useState(parrentUserId)
  const [clientGroups, setClientGroups] = useState<IGroup[]>([initialState])
  const [groups, setGroups] = useState<IGroup[]>([initialState])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<{ text: string, value: string }[]>([])

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
      filters: filters,
      onFilter: (value, record) => record.gropSkillType.indexOf(value as string) === 0,
    },
  ];




  useEffect(() => {

    let s: { text: string, value: string }[] = []
    groupSkillType.forEach(item => {
      s.push({
        text: item,
        value: item
      })
    })
    setFilters(s)
    getClientGroups().then(function () {
      setLoading(() => false)
      setUserId(() => parrentUserId)
    })

  }, [parrentUserId, userId, loading])


  async function getClientGroups() {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/client/groups?id=' + client.client.id
    }).then(function (response) {
      let temp: IGroup[] = response.data as IGroup[]
      setClientGroups(temp)
    }).catch(function (error) {
      if (error.response) {
        showMessage(error.response.data.message, "error");
      }
      else {
        showMessage("Ошибка сервера, сервер недоступен", "error");
      }
    });
  }

  async function getAllGroups() {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/groups/all'
    }).then(function (response) {
      let temp: IGroup[] = response.data as IGroup[]
      console.log(temp)
      setGroups(() => temp)
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
    return groups.filter((e) => e.groupType.toLowerCase() !== 'solo' && e.groupAgeType === getGroupType(client.client.birthDay))
  }

  return (<>
    <Skeleton loading={loading}>
      <Space>
        <Button type="primary" onClick={showModal} size='large'>
          <PlusSquareOutlined /> group
        </Button>
        <AddNewGroup addNewGroup={(group: IGroup) => { console.log(group) }} groups={filterGroup(groups)} isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} />
      </Space>

      <Table
        pagination={{ position: ['none', 'bottomRight'] }}
        columns={columns}
        dataSource={clientGroups}
      />
    </Skeleton>
  </>)
}