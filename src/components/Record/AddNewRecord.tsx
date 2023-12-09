import { useEffect, useState } from "react";
import { IEmployee } from '../../redux/interfaces/Employee';
import axios from "axios";
import { ISchedule } from "../../redux/interfaces/Schedule";
import { Button } from "reactstrap";




interface EmployeeSchedulePairs {
    employee: IEmployee,
    schedule: ISchedule[]
}



export const AddNewReccord: React.FC = () => {

    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [loadingEmployee, setLoadingEmployee] = useState(true);
    const [scheduleEmployee, setScheduuleEmployee] = useState<EmployeeSchedulePairs[]>([])

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
        }).then(function (response): void {
            if (scheduleEmployee.findIndex((e)=>e.employee.id===id) === -1) {
                setScheduuleEmployee(()=>[...scheduleEmployee, { employee: employees.find((e) => e.id === id) as IEmployee, schedule: response.data as ISchedule[] }])
            }
        }).catch((e) => console.log(e))
    }

    return (

        <>
            <Button onClick={() => {
                employees.forEach((e) => {
                    getEmployeeSchedule(e.id).then(()=>console.log(scheduleEmployee))
                })
            }
            }></Button>
        </>
    )
}