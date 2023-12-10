import { PropsWithChildren } from "react"
import { ISchedule } from "../../../redux/interfaces/Schedule"
import Table, { ColumnsType } from "antd/es/table"
import { Empty, Space } from "antd"
import { DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';



const colunms: ColumnsType<ISchedule> = [

    {
        title: 'Date',
        dataIndex: 'date',
        render: (text, record, index) => (
            <Space size="middle">
                <label>{dayjs(record.date).format('DD.MM.YYYY')}</label>
            </Space>
        )
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
                <label>{record.group?.groupType.toLowerCase() == 'solo' ? "Индивидуальное" : record.group?.groupNumber}</label>
            </Space>

        )

    },


]




interface ScheduleDayProps {
    schedule: ISchedule[]
}


export const ScheduleDay: React.FC<PropsWithChildren<ScheduleDayProps>> = ({ schedule }: PropsWithChildren<ScheduleDayProps>) => {


    return (
        <>{
            schedule.length > 0
                ?
                <Table dataSource={schedule.length > 0 ? schedule : []} columns={colunms} />
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
        </>


    )
}

