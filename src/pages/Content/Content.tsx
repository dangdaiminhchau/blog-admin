import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Space, Tag, notification as antdNotification } from 'antd';
import { useRef, useState } from 'react';
import { useDeleteContentMutation, useGetAllContentQuery } from '../../store/api/contentApi';
import { IContent } from '../../store/type/content.type';
import { useGetCategoriesListQuery } from '../../store/api/categoriesApi';
import { PlusOutlined } from '@ant-design/icons';
import CreateContent from './components/CreateContent';
const Content = () => {
    const [notification, contextNotification] = antdNotification.useNotification()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false)

    const actionRef = useRef<ActionType>()

    const { data: contentList } = useGetAllContentQuery()
    const { data: cateList } = useGetCategoriesListQuery()
    const [deleteContent] = useDeleteContentMutation()

    const onDeleteUser = async (id: number) => {
        try {
            setIsLoading(true)
            await deleteContent(id)
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
    const columns: ProColumns<IContent>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            search: false,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            search: false,
        },
        {
            title: 'Pending',
            dataIndex: 'pending',
            search: false,
            render: (pending) => (
                <Tag color={pending ? 'gold' : 'green'}>{pending ? 'PENDING' : 'APPROVED'}</Tag>
            )
        },
        {
            title: 'Views',
            dataIndex: 'views',
            search: false,
        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            search: false,
            render: (categories) => (
                <Tag color='pink' >{cateList && cateList?.find(cate => cate.id === categories[0]).name}</Tag>
            )
        },
        {
            title: 'Last Upload',
            dataIndex: 'lastUpload',
            search: false,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            valueType: 'option',
            width: '18%',
            render: (_, row) => (
                <Space>
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
            <CreateContent isOpened={isOpenedCreateModal} onClosed={() => setIsOpenedCreateModal(false)} onSuccess={() => actionRef.current?.reload()} />
            <div className="text-2xl text-left mt-8 font-bold leading-tight pl-8 hover:text-green1 cursor-pointer mb-8">APPROVED CONTENT MANAGEMENT</div>
            <ProTable
                className='h-full'
                id="content-management"
                loading={isLoading}
                rowKey="id"
                actionRef={actionRef}
                search={false}
                columns={columns}
                dataSource={contentList && contentList}
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

export default Content
