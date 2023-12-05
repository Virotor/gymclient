import { PropsWithChildren } from "react"
import { ISchedule } from '../../redux/interfaces/Schedule';
import { Collapse, CollapseProps } from "antd";
import { ScheduleDay } from "./ScheduleDay";
import dayjs from 'dayjs';



const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday']

interface ScheduleWeekProps extends PropsWithChildren {
    schedule : ISchedule[]
}


export const ScheduleWeek : React.FC<ScheduleWeekProps> = ({schedule} : ScheduleWeekProps) =>{


    function getTodaySchedule( schedule : ISchedule[], day : number){
        return schedule.filter((e) => new Date(e.date).getDay() == day)
    }




    function renderSchedule(schedule : ISchedule[]){
        
        const listCollapse : CollapseProps['items'] = []
        let now = dayjs()
        
        dayOfWeek.forEach((e,index)=>{
            let s = getTodaySchedule(schedule,index)
            listCollapse.push(
                {
                    key : index,
                    label : (e + "    "+ dayjs(now).add(index,'day').format('DD/MM/YYYY')),
                    children : s.length>0 ? <ScheduleDay schedule={s} /> : <p>В этот день занятий нет</p>,
                }
            )          
        })
        return listCollapse
    }


   

    return (
        <Collapse accordion items={renderSchedule(schedule)} />
    )
}