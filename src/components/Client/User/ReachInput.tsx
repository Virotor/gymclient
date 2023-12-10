import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';






export function ReachInput({ value }: { value: string }) {
    const [form] = Form.useForm();
    const [isEdit, setEdit] = useState(false)
    const [data, setData] = useState('');

    useEffect(() => {
        console.log(value)
        setData(value)

    }, [value])

    const postfixChange = (
        <Form.Item name={value} noStyle style={{ height: 70 }}>
            <Button danger type="text" size='small' onClick={() => setEdit((e) => e = !e)}>
                Edit
            </Button>
        </Form.Item>
    );



    return (
        <Form.Item>
            <Input defaultValue={data} disabled={!isEdit} addonAfter={postfixChange} />
        </Form.Item>

    )

}