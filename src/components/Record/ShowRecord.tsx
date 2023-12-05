import { Button, Collapse, CollapseProps, Space, Table } from "antd"
import { ISchedule } from "../../redux/interfaces/Schedule"
import { ScheduleDay } from "../Schedule/ScheduleDay"
import dayjs from 'dayjs';
import { useAppSelector } from "../../hooks";
import { RootState } from '../../store';
import { ColumnsType } from "antd/es/table";
import { CloseOutlined } from '@ant-design/icons';
const colunms: ColumnsType<ISchedule> = [

    {
        title: 'Date',
        dataIndex: 'date'
    },

    {
        title: 'Time',
        dataIndex: 'time'
    },

    {
        title: 'Employee',
        render: (text, record, index) => (
            <Space size="middle">
                <label>{record.employee.firstName}  {record.employee.secondName}</label>
            </Space>

        )

    },

    {
        title: 'Group number',
        render: (text, record, index) => (
            <Space size="middle">
                <label>{record.group.groupType.toLowerCase() == 'solo' ? "Индивидуальное" : record.group.groupNumber}</label>
            </Space>

        )

    },
    {
        title: 'Action',
        render: (text, record, index) => (
            <Space size="middle">
                <Button>
                    <CloseOutlined />
                </Button>
            </Space>

        )

    },


]



export const ShowRecord: React.FC = () => {


    const schedule = useAppSelector((state: RootState) => state.schedule)

    function renderSchedule(schedule: ISchedule[]) {
        return schedule.filter((e) => e.group.groupType.toLowerCase() == 'solo')

    }

    return (
        <Table dataSource={renderSchedule(schedule.schedule)} columns={colunms} />
    )
}
