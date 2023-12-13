import { Select, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ISchedule } from '../../../redux/interfaces/Schedule';
import { takeSchedule } from '../../../redux/reducers/ScheduleSlice';
import { RootState } from '../../../store';
// import { ScheduleDay } from '../Schedule/ScheduleDay';
// import { ScheduleMounth } from '../Schedule/ScheduleMounth';
// import { ScheduleWeek } from '../Schedule/ScheduleWeek';



interface DataType {
  key: React.Key;
  schedule: ISchedule
}

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
    dataIndex: 'employee.id'
  }

]


interface ScheduleProps {
  parentClientId: number
}

export const UserSchedule: React.FC<PropsWithChildren<ScheduleProps>> = ({ parentClientId }: PropsWithChildren<ScheduleProps>) => {


  const [scope, setScope] = useState('day')


  const schedule = useAppSelector((state: RootState) => state.schedule)






  function filterDateToday(currentDate: Date, compareDate: Date): boolean {
    if (
      currentDate.getDate() == compareDate.getDate()
      && currentDate.getMonth() == compareDate.getMonth()
      && currentDate.getFullYear() == compareDate.getFullYear()) {
      return true
    }
    return false
  }

  function filterDateWeek(currentDate: Date, compareDate: Date): boolean {

    const current = dayjs(currentDate)
    const startCompare = dayjs(compareDate)
    if (current.diff(startCompare, 'days') <= 7 && current.diff(startCompare, 'days') >= 0) {
      return true
    }
    return false;
  }

  function filterDateMounth(currentDate: Date, compareDate: Date): boolean {
    if (currentDate.getMonth() === compareDate.getMonth() && currentDate.getFullYear() === compareDate.getFullYear()) {
      return true
    }
    return false;
  }

  function data() {

    switch (scope) {
      case 'day': return schedule.schedule.filter((e) => filterDateToday(new Date(e.date), new Date()))
      case 'week': return schedule.schedule.filter((e) => filterDateWeek(new Date(e.date), new Date()))
      case 'mounth': return schedule.schedule.filter((e) => filterDateMounth(new Date(e.date), new Date()))
      default: return []
    }
  }


  return (
    <Skeleton loading={schedule.isLoading} active={true}>
      <Select
        defaultValue="Today"
        style={{ width: 120 }}
        onChange={(value) => { setScope(() => value) }}
        options={[
          { value: 'day', label: 'Today' },
          { value: 'week', label: 'Week' },
          { value: 'mounth', label: 'Current mounth' },
        ]}
      />
      {/* {
        scope == 'day' ?
          <ScheduleDay schedule={data()} />
          :
          scope == 'week' ?
            <ScheduleWeek schedule={data()} />
            :
            <ScheduleMounth schedule={data()} />
      } */}

    </Skeleton>
  )
};

//export default UserSchedule;