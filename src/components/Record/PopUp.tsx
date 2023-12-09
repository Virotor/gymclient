import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from "antd";
import { PropsWithChildren, useState } from "react";
import { useAppDispatch } from '../../hooks';
import { ISchedule } from '../../redux/interfaces/Schedule';
import { deleteSchedule } from '../../redux/reducers/ScheduleSlice';
import { IGroup } from '../../redux/interfaces/Group';

interface PopUpProps extends PropsWithChildren {
    record: ISchedule | IGroup;
    deleteRecord: (record: number) => void;
}
export const PopUp: React.FC<PopUpProps> = ({ record, deleteRecord }: PopUpProps) => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch = useAppDispatch();




    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        console.log(record);
        confirmDelete(record).then(() => {
            setOpen(false);
            setConfirmLoading(false);
        });
    };

    async function confirmDelete(record: ISchedule | IGroup) {
        return await deleteRecord(record.id);
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <Popconfirm
            title="Delete the record"
            description="Are you sure to delete this record?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={handleOk}
            open={open}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
        >
            <Button danger onClick={showPopconfirm}><CloseOutlined /></Button>
        </Popconfirm>
    );
};
