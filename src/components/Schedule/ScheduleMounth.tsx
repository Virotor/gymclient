import { PropsWithChildren } from "react"
import { ISchedule } from '../../redux/interfaces/Schedule';
import Collapse, { CollapseProps } from "antd/es/collapse"
import { ScheduleDay } from "./ScheduleDay"
import dayjs from 'dayjs';






interface ScheduleMounthProps extends PropsWithChildren {
    schedule : ISchedule[]
}


export const ScheduleMounth : React.FC<ScheduleMounthProps> = ({schedule} : ScheduleMounthProps) =>{

       function renderSchedule(schedule : ISchedule[]){
        
        const listCollapse : CollapseProps['items'] = []
        const now = new Date()


        let schedulseGroupsByDay = new Map<number, ISchedule[]>()

        schedule.forEach((e)=>{
            if(schedulseGroupsByDay.has(new Date(e.date).getDate())){
                schedulseGroupsByDay.get(new Date(e.date).getDate())?.push(e)
            }
            else{
                schedulseGroupsByDay.set(new Date(e.date).getDate(), new Array(e));
            }
        })
        
        console.log(schedulseGroupsByDay)
        
        schedulseGroupsByDay.forEach((e,key)=>{
            //let s = getTodaySchedule(schedule,key)
            listCollapse.push(
                {
                    key : key,
                    label : dayjs(e[0].date).format('DD/MM/YYYY'),
                    children :  <ScheduleDay schedule={e} /> ,
                }
            )
          
        })
        return listCollapse
    }

    return (
        <Collapse accordion items={renderSchedule(schedule)} />
    )
}


