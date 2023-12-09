import { Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ISchedule } from '../../redux/interfaces/Schedule';
import { RootState } from '../../store';
import axios from 'axios';
import { PopUp } from './PopUp';
import { deleteSchedule } from "../../redux/reducers/ScheduleSlice";










export const ShowRecord: React.FC = () => {
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
                    <PopUp record={record} deleteRecord={deleteRecord} />
                </Space>
    
            )
    
        },
    
    
    ]

    const schedule = useAppSelector((state: RootState) => state.schedule)
    const dispatch = useAppDispatch()

    function renderSchedule(schedule: ISchedule[]) {
        return schedule.filter((e) => e.group.groupType.toLowerCase() == 'solo')

    }

    async function deleteRecord(recordNumber: number) {

        try {
           await axios({
                method: 'get',
                url: 'http://localhost:8080/schedule/delete/client/record?id=' + recordNumber,
                withCredentials: false,
            }
            )
            dispatch(deleteSchedule(recordNumber));
        }
        catch (e){
            console.log(e)
        }
    
    }
    

    return (
        <Table dataSource={renderSchedule(schedule.schedule)} columns={colunms} />
    )
}
