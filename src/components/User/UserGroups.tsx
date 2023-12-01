import {
    Button,
    DatePicker,
    Flex,
    Form,
    Input,
    Popconfirm,
    Select,
    Skeleton,
    Space,
    Table,
    message
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useAppSelector } from '../../hooks';
import { DownOutlined } from '@ant-design/icons';
import { RangePickerProps } from 'antd/es/date-picker';
import axios from 'axios';
import { PropsWithChildren, useEffect, useState } from 'react';
import { RootState } from '../../store';
import { IGroup } from '../../redux/interfaces/Group';
import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import { ExpandableConfig, TableRowSelection } from 'antd/es/table/interface';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { GroupSchedule } from '../Group/Schedule';


dayjs.extend(customParseFormat);

const { Option } = Select;

interface DataType {
    id: number;
    groupNumber: string;
    groupAgeType: string;
    gropSkillType: string;
    groupType: string;
  }
  
  type TablePaginationPosition = NonNullable<TablePaginationConfig['position']>[number];
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Group number',
      dataIndex: 'groupNumber',
    },
    {
      title: 'groupAgeType',
      dataIndex: 'groupAgeType',
      sorter: (a, b) => a.groupAgeType > b.groupAgeType ? 1 : -1,
    },
    {
      title: 'gropSkillType',
      dataIndex: 'gropSkillType',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.gropSkillType.indexOf(value as string) === 0,
    },
    {
      title: 'Actions',
      key: 'id',
      sorter: true,
      render: () => (
        <Space size="middle">
          <a>Delete</a>
          <a>
            <Space>
              More actions
              <DownOutlined />
            </Space>
          </a>
        </Space>
      ),
    },
  ];
  

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

const initialState:IGroup = {
    id: -1,
    groupNumber: '',
    groupType: '',
    groupAgeType: '',
    gropSkillType: ''
}

type GroupProps = {
    parrentUserId: number;

}
const defaultExpandable = { expandedRowRender: (record: DataType) => <GroupSchedule groupId={record.id}/>};
const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';

export const UserGroups: React.FunctionComponent<PropsWithChildren<GroupProps>> = ({ parrentUserId }: GroupProps) => {
    const user = useAppSelector((state: RootState) => state.user)
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [userId, setUserId] = useState(parrentUserId)
    const [clientGroups, setClientGroups] = useState<IGroup[]>([initialState])
    const [groups, setGroups] = useState<IGroup[]>([initialState])
    const [isChangeFiedls, setChangeFields] = useState(false)

    const [bordered, setBordered] = useState(false);

    const [size, setSize] = useState<SizeType>('large');
    const [expandable, setExpandable] = useState<ExpandableConfig<DataType> | undefined>(
      defaultExpandable,
    );
    const [showTitle, setShowTitle] = useState(false);
    const [showHeader, setShowHeader] = useState(true);     
    const [showFooter, setShowFooter] = useState(true);
    const [rowSelection, setRowSelection] = useState<TableRowSelection<DataType> | undefined>(undefined);
    const [hasData, setHasData] = useState(true);
    const [tableLayout, setTableLayout] = useState();
    const [top, setTop] = useState<TablePaginationPosition>('none');
    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
    const [ellipsis, setEllipsis] = useState(false);
    const [yScroll, setYScroll] = useState(false);
    const [xScroll, setXScroll] = useState<string>();



    useEffect(() => {
        if (parrentUserId !== undefined && parrentUserId != -1) {
            getClientGroups(parrentUserId).then(function () {
                setLoading(() => false)
                setUserId(() => parrentUserId)
            })
        }
    }, [parrentUserId, userId, loading])


    async function getClientGroups(userId: number) {
        await axios({
            method: 'get',
            url: 'http://localhost:8080/client/groups?id=' + userId
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
        }).then(function (response){
            let temp : IGroup[] = response.data as IGroup[]
            setGroups(()=>temp)
        })
        
    }




    const showPopconfirm = () => {
        setOpen(true);
    };




    const showMessage = (message: string, type: any) => {
        messageApi.open({
            type: type,
            content: message,
            duration: 4,
        });
    };

    const scroll: { x?: number | string; y?: number | string } = {};
    if (yScroll) {
      scroll.y = 240;
    }
    if (xScroll) {
      scroll.x = '100vw';
    }
  
    const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }
  
    const tableProps: TableProps<DataType> = {
      bordered,
      loading,
      size,
      expandable,
      title: showTitle ? defaultTitle : undefined,
      showHeader,
      footer: showFooter ? defaultFooter : undefined,
      rowSelection,
      scroll,
      tableLayout,
    };

    return (<>
        <Skeleton loading={loading}>
            <Button onClick={() => getAllGroups().then(()=>console.log(groups))}></Button>
            <Table
                {...tableProps}
                pagination={{ position: [top, bottom] }}
                columns={tableColumns}
                dataSource={hasData ? clientGroups : []}
                scroll={scroll}
            />
        </Skeleton>
    </>)
}