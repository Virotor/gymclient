import { PropsWithChildren, useEffect, useState } from "react";
import { IEmployee } from '../../../redux/interfaces/Employee';
import axios from "axios";
import { ISchedule } from '../../../redux/interfaces/Schedule';
import { Avatar, List } from "antd";
import VirtualList from 'rc-virtual-list';

import { ButtonItemEmployee } from "./ButtonItemEmployee";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import dayjs from 'dayjs';
import { updateSchedule } from "../../../redux/reducers/ScheduleSlice";
import { addEmployeeSchedule, deleteEmployeeSchedule, updateEmployeeSchedule } from "../../../redux/reducers/EmployeeSchedules";



export const AddNewReccord: React.FC = () => {

    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [loadingEmployee, setLoadingEmployee] = useState(true);


    const client = useAppSelector((state: RootState) => state.client)
    const group = useAppSelector((state : RootState) => state.client.client.groups)
    const employeeSchedule = useAppSelector((state : RootState) => state.employeeSchedule.employeeSchedule )
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (employees.length === 0) {
            getAllEmployees()
        }
    }, [])

    async function getAllEmployees() {
        await axios({
            method: 'get',
            url: 'http://localhost:8080/employee/getAll',
            withCredentials: false,
        }).then(function (response): void {
            setEmployees(() => response.data as IEmployee[])
        }).catch((e) => console.log(e))
    }

    async function getEmployeeSchedule(id: number) {
        await axios({
            method: 'get',
            url: 'http://localhost:8080/employee/getSchedule?id=' + id,
            withCredentials: false,
        }).then(function (response) {
            if (!employeeSchedule.has(id)) {
                dispatch(addEmployeeSchedule({schedule : response.data as ISchedule[],id : id}))
            }else{
                
            }
        }).catch((e) => console.log(e))
    }


    function getEmployeeSchedules(id: number): ISchedule[] {
        if (employeeSchedule.has(id)) {
            return employeeSchedule.get(id)?.filter((e)=>e.group === null).filter((e)=>dayjs(e.date).diff(new Date(), 'd')>=0) as ISchedule[]
        }
        else {
            getEmployeeSchedule(id).then(function () {
                return employeeSchedule.get(id)?.filter((e)=>e.group === null).filter((e)=>dayjs(e.date).diff(new Date(), 'd')>=0) as ISchedule[]
            })
        }
        return []
    }

    async function addRecord(id : number){
        await axios({
            method: 'get',
            url: 'http://localhost:8080/schedule/client/add?clientId='+client.client.id +'&scheduleId=' + id,
        }).then(function (response) {
            employeeSchedule.forEach( (elem,key)=>
                elem.forEach((schedule)=>{
                    if(schedule.id===id){
                        let  temp : ISchedule = {...schedule,group : group.filter((e)=>e.groupType.toLowerCase()==='solo')[0]}
                        dispatch(updateSchedule(temp))
                        dispatch(deleteEmployeeSchedule({schedule : schedule,id : key}))
                        return
                    }
                })
            )      
        }).catch((e) => console.log(e))
    }


    return (

        <>
            <List
                dataSource={employees}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={<Avatar size={100} src={"http://localhost:8080/image/get/employee?id=" + item.id} />}
                            title={<p>{item.firstName + "   " + item.secondName}</p>}
                            description={item.phoneNumber} />
                        <ButtonItemEmployee item={item} getEmployeeSchedule={getEmployeeSchedules} addRecord={addRecord}  />
                    </List.Item>
                )}
            />
        </>
    )
}



