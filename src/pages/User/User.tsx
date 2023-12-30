import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { IUser } from '../../store/type/user.type';
import { Button, Space, Tag, notification as antdNotification } from 'antd';
import { useRef, useState } from 'react';
import { useDeletetUserMutation, useGetAllUserQuery } from '../../store/api/userApi';
const User = () => {
    const [notification, contextNotification] = antdNotification.useNotification()
    const [isLoading, setIsLoading] = useState(false)
    const actionRef = useRef<ActionType>()
    const { data: userList } = useGetAllUserQuery()
    const [deleteUser] = useDeletetUserMutation()
    const onDeleteUser = async (id: number) => {
        try {
            setIsLoading(true)
            await deleteUser(id)
            notification.success({
                message: 'Thành công',
                description: 'Xóa user thành công'
            })
            await actionRef.current?.reload()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }
    const columns: ProColumns<IUser>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            search: false,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            search: false,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            search: false,
            render: (role) => (
                <Tag color={role === 'ADMIN' ? 'green' : 'gold'}>{role}</Tag>
            )
        },
        {
            title: 'Display Name',
            dataIndex: 'display_name',
            search: false,
        },
        {
            title: 'Account Expired',
            dataIndex: 'accountNonExpired',
            search: false,
            render: (accountNonExpired) => (
                <Tag color={accountNonExpired ? 'green' : 'gold'}>{accountNonExpired ? 'None Expired' : 'Expired'}</Tag>
            )
        },
        {
            title: 'Account Locked',
            dataIndex: 'accountNonLocked',
            search: false,
            render: (accountNonLocked) => (
                <Tag color={accountNonLocked ? 'green' : 'gold'}>{accountNonLocked ? 'None Locked' : 'Locked'}</Tag>
            )
        },
        {
            title: 'Action',
            dataIndex: 'id',
            valueType: 'option',
            width: '18%',
            render: (_, row) => (
                <Space>
                    <Button className='bg-button1' type='primary' onClick={() => {
                    }}>Update</Button>
                    <Button type='primary' danger onClick={() => onDeleteUser(row.id)}>
                        Delete
                    </Button>
                </Space>
            )
        }

    ]
    return (
        <>
            {contextNotification}
            <div className="text-2xl text-left mt-8 font-bold leading-tight pl-8 hover:text-green1 cursor-pointer mb-8">USER MANAGEMENT</div>
            <ProTable
                className='h-full'
                id="user-management"
                loading={isLoading}
                rowKey="id"
                actionRef={actionRef}
                search={false}
                columns={columns}
                dataSource={userList && userList}
                options={{
                    fullScreen: false,
                    reload: false,
                    setting: false,
                    density: false,
                }}
                pagination={{
                    showSizeChanger: true,
                    defaultCurrent: 1,
                    defaultPageSize: 50,
                    pageSizeOptions: [50, 100, 150, 200],
                }} />
        </>
    )
}

export default User
