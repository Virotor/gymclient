import { PropsWithChildren } from "react"
import { ISchedule } from "../../redux/interfaces/Schedule"
import Table, { ColumnsType } from "antd/es/table"
import { Space } from "antd"
import { DownOutlined } from '@ant-design/icons';



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
        title: 'Номер группы',
        render: (text, record, index) => (
            <Space size="middle">
                <label>{record.group.groupType.toLowerCase() == 'solo' ? "Индивидуальное" : record.group.groupNumber}</label>
            </Space>

        )

    },


]




interface ScheduleDayProps {
    schedule: ISchedule[]
}


export const ScheduleDay: React.FC<PropsWithChildren<ScheduleDayProps>> = ({ schedule }: PropsWithChildren<ScheduleDayProps>) => {


    return (

        <Table dataSource={schedule.length > 0 ? schedule : []} columns={colunms} />

    )
}