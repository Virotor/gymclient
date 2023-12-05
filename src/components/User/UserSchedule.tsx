import { Select, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ISchedule } from '../../redux/interfaces/Schedule';
import { takeSchedule } from '../../redux/reducers/ScheduleSlice';
import { RootState } from '../../store';
import { ScheduleDay } from '../Schedule/ScheduleDay';
import { ScheduleMounth } from '../Schedule/ScheduleMounth';
import { ScheduleWeek } from '../Schedule/ScheduleWeek';



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
  const [isLoading, setIsLoading] = useState(true)
  const client = useAppSelector((state: RootState) => state.client)
  const schedule = useAppSelector((state: RootState) => state.schedule)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (client.client.id !== -1) {
      getUserSchedule().then(() => [
        setIsLoading(() => false)
      ])
    }
  }, [parentClientId])


  async function getUserSchedule() {
    await axios({
      method: 'get',
      url: 'http://localhost:8080/client/schedule?id=' + client.client.id,
      withCredentials: false,
    }).then(function (response) {
      dispatch(takeSchedule(response.data as ISchedule[]))
    }).catch(function (error) {
      if (error.response) {
        //showMessage(error.response.data.message, "error");
      }
      else {
        //showMessage("Ошибка сервера, сервер недоступен", "error");
      }

    });
  }

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
    if (current.diff(startCompare, 'days') <= 7) {
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
    <Skeleton loading={isLoading} active={true}>
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
      {
        scope == 'day' ?
          <ScheduleDay schedule={data()} />
          :
          scope == 'week' ?
            <ScheduleWeek schedule={data()} />
            :
            <ScheduleMounth schedule={data()} />
      }

    </Skeleton>
  )
};

//export default UserSchedule;