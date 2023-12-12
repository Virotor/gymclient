
import { PropsWithChildren, useEffect, useState } from 'react'
import { IGroup, groupSkillType } from '../../../redux/interfaces/Group'
import { Button, Empty, Modal, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { PlusSquareOutlined } from '@ant-design/icons';






interface AddNewGroupProps extends PropsWithChildren {
    groups: IGroup[],
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    addNewGroup: (group: IGroup) => void
}


export const AddNewGroup: React.FC<AddNewGroupProps> = ({ addNewGroup, groups, isModalOpen, handleOk, handleCancel }: AddNewGroupProps) => {

    const colunms: ColumnsType<IGroup> = [

        {
            title: 'Group Number',
            dataIndex: 'groupNumber'
        },

        {
            title: 'Group Type',
            dataIndex: 'groupType'
        },

        {
            title: 'Group Age Type',
            dataIndex: 'groupAgeType'

        },

        {
            title: 'gropSkillType',
            dataIndex: 'gropSkillType',
            filters: groupSkillType,
            onFilter: (value, record) => record.gropSkillType.indexOf(value as string) === 0,

        },
        {
            title: 'Action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button onClick={() => addNewGroup(record)}>
                        <PlusSquareOutlined />
                    </Button>
                </Space>

            )

        },


    ]

    useEffect(() => {
    }, [])


    return (
        <Modal title="Add new group" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {
                groups.length > 0
                    ?
                    <Table dataSource={groups} columns={colunms} />
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