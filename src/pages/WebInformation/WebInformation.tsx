import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Space, notification as antdNotification } from 'antd';
import { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { IWebInfo } from '../../store/type/webInfo.type';
import { useDeleteWebInfoMutation, useGetAllWebInfoQuery } from '../../store/api/webInfo';
import CreateWebInfo from './components/CreateWebInfo';
import UpdateWebInfo from './components/UpdateWebInfo';

const WebInformation = () => {
    const [notification, contextNotification] = antdNotification.useNotification()
    const [currentRowItem, setCurrentRowItem] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false)
    const [isOpenedUpdateModal, setIsOpenedUpdateModal] = useState(false)
    const { data: webInfoList } = useGetAllWebInfoQuery()
    const [deleteWenInfo] = useDeleteWebInfoMutation()

    const actionRef = useRef<ActionType>()


    const onDeleteUser = async (id: number) => {
        try {
            setIsLoading(true)
            await deleteWenInfo(id)
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

    const columns: ProColumns<IWebInfo>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Title',
            dataIndex: 'name',
            width: '20%',
            ellipsis: true,
            search: false,
        },
        {
            title: 'Content',
            dataIndex: 'content',
            search: false,
        },
        {
            title: 'Asset URL',
            dataIndex: 'assetList',
            key: 'assetURL',
            search: false,
            render: (assetList) => {
                const assetURL = assetList && assetList[0] && assetList[0].assetURL ? assetList[0].assetList : '';
                return <span>{assetURL}</span>;
            }
        },
        {
            title: 'Action',
            dataIndex: 'id',
            valueType: 'option',
            width: '18%',
            render: (_, row) => (
                <Space>
                    <Button className='bg-button1' type='primary' onClick={() => {
                        setCurrentRowItem(row); setIsOpenedUpdateModal(true)
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
            <CreateWebInfo isOpened={isOpenedCreateModal} onClosed={() => setIsOpenedCreateModal(false)} onSuccess={() => actionRef.current?.reload()} />
            <UpdateWebInfo data={currentRowItem} isOpened={isOpenedUpdateModal} onClosed={() => setIsOpenedUpdateModal(false)} onSuccess={() => actionRef.current?.reload()} />
            <div className="text-2xl text-left mt-8 font-bold leading-tight pl-8 hover:text-green1 cursor-pointer mb-8">WEB INFORMATION MANAGEMENT</div>
            <ProTable
                className='h-full'
                id="webInfo-management"
                loading={isLoading}
                rowKey="id"
                actionRef={actionRef}
                search={false}
                columns={columns}
                dataSource={webInfoList && webInfoList}
                toolBarRender={() => [
                    <Button onClick={() => setIsOpenedCreateModal(true)} type="primary" className='bg-button1'><PlusOutlined />Create new Content</Button>
                ]}
                options={{
                    fullScreen: false,
                    reload: false,
                    setting: false,
                    density: false,
                }}
                pagination={{
                    showSizeChanger: true,
                    defaultCurrent: 1,
                    defaultPageSize: 3,
                }} />
        </>
    )
}

export default WebInformation
