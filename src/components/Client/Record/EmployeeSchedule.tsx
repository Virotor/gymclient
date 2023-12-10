import { PropsWithChildren, useEffect, useState } from "react";
import { ISchedule } from "../../../redux/interfaces/Schedule";
import { Empty, Modal, Space, Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from 'dayjs';
import { PlusSquareOutlined } from '@ant-design/icons';






interface ModalProps extends PropsWithChildren {
    schedules: ISchedule[];
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    addRecord: (id: number) => void;
}
export const EmployeeSchedule: React.FC<ModalProps> = ({ schedules, isModalOpen, handleOk, handleCancel, addRecord }: ModalProps) => {



    const colunms: ColumnsType<ISchedule> = [

        {
            title: 'Date',
            key : 'id',
            dataIndex: 'date',
            render: (text, record, index) => (
                <Space size="middle">
                    <label>{dayjs(record.date).format('DD.MM.YYYY')}</label>
                </Space>
            )
        },
        {
            title: 'Time',
            dataIndex: 'time'
        },
        {
            title: 'Action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button type="primary" onClick={()=>addRecord(record.id)} size='small'>
                        <PlusSquareOutlined /> sign up
                    </Button>
                </Space>

            )

        },
    ]

    return (

        <Modal title="Add new record"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}>
            {
                schedules.length > 0
                    ?
                    <Table dataSource={schedules} columns={colunms} />
                    :
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{ height: 60 }}
                        description={
                            <span>
                                No avaible groups
                            </span>
                        }
                    >
                    </Empty>
            }
        </Modal>
    )
}