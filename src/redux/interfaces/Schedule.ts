import { IEmployee } from "./Employee";
import { IGroup } from "./Group";
import { ITrainingRoom } from "./TrainingRoom";

import type {Dayjs} from 'dayjs'
 
export interface ISchedule {
    date: Date,
    time: Date,
    employee: IEmployee,
    group: IGroup,
    trainingRoom: ITrainingRoom,
    id : number
}