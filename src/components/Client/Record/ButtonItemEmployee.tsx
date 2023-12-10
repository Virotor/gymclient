import { PlusSquareOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import { ISchedule } from '../../../redux/interfaces/Schedule';
import { EmployeeSchedule } from "./EmployeeSchedule";
import { IEmployee } from '../../../redux/interfaces/Employee';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';


export interface ButtonItemEmployeeProps extends PropsWithChildren {
    item: IEmployee;
    getEmployeeSchedule: (id: number) => ISchedule[];
    addRecord : (id: number) => void;
}



export const ButtonItemEmployee: React.FC<ButtonItemEmployeeProps> = ({ item, getEmployeeSchedule,addRecord }: ButtonItemEmployeeProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [schedule,setSchedule]  = useState<ISchedule[]>([])

    


    const onClickHandle = () => {
        setSchedule(getEmployeeSchedule(item.id))
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

  

    return (
        <>
            <EmployeeSchedule
                addRecord={addRecord}
                schedules={schedule}
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel} />
            <Button type="primary" onClick={onClickHandle} size='large' >
                <PlusSquareOutlined /> schedule
            </Button>
        </>


    );
};
