import { IEmployee } from "./Employee";
import { IGroup } from "./Group";
import { ITrainingRoom } from "./TrainingRoom";

export interface ISchedule {
    date: Date,
    time: Date,
    employee: IEmployee,
    group: IGroup,
    trainingRoom: ITrainingRoom,
    id : number
}