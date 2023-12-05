import { Calendar, Skeleton,Badge } from 'antd';
import axios from 'axios';
import type { Dayjs } from 'dayjs';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ISchedule } from '../../redux/interfaces/Schedule';

import type { BadgeProps, CalendarProps } from 'antd';


interface IScheduleProps {
    groupId: number,
}



export const GroupSchedule: React.FC<PropsWithChildren<IScheduleProps>> = ({ groupId }: PropsWithChildren<IScheduleProps>) => {

    const [isLoading, setLoading] = useState(true)

    const [schedule, setSchedule] = useState<ISchedule[]>([])

    useEffect(() => {
        if (groupId !== undefined && groupId !== -1) {
            getGroupSchedule().then(() => {
                setLoading(() => false)
            })
        }
    }, [groupId])






    async function getGroupSchedule() {
        await axios({
            method: 'get',
            url: 'http://localhost:8080/groups/groupSchedule?id=' + groupId,
            withCredentials: false,
        }).then(function (response) {
            let s: ISchedule[] = response.data as ISchedule[]
            setSchedule(s)
            console.log(s)
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data.message, "error");
            }
            else {
                console.log("Ошибка сервера, сервер недоступен", "error");
            }

        });
    }




    const dateCellRender = (value: Dayjs) => {

        const listData : ISchedule[] = []
        schedule.forEach(elment =>  {
            // if(new Date(elment.date).getDate() === value.date() && new Date(elment.date).getMonth() === value.month()){
            //     listData.push(elment)
            // }
        })           
        
        
       
        return (
          <ul className="events">
            {listData.map((item) => (
              <li key={item.id}>
                <text>{item.employee.firstName} {item.employee.secondName}</text> 
              </li>
            ))}
          </ul>
        );
      };
    
      const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        console.log(schedule)
        if(schedule.length>0){
            return dateCellRender(current) 
        }
         return info.originNode;
      };


    return (
        <Skeleton loading={isLoading} active={true} >
            <Calendar cellRender={cellRender}/>
        </Skeleton>

    )
} 