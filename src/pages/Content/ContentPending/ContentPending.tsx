import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Space, Switch, Tag, notification as antdNotification } from 'antd';
import { useRef, useState } from 'react';
import { useDeleteContentMutation, useGetContentPendingQuery, useUpdatePendingContentMutation } from '../../../store/api/contentApi';
import { useGetCategoriesListQuery } from '../../../store/api/categoriesApi';
import { IContent } from '../../../store/type/content.type';




const ContentPending = () => {
    const [notification, contextNotification] = antdNotification.useNotification()
    const [isLoading, setIsLoading] = useState(false)


    const actionRef = useRef<ActionType>()

    const { data: contentPendingList } = useGetContentPendingQuery()
    const { data: cateList } = useGetCategoriesListQuery()
    const [deleteContent] = useDeleteContentMutation()
    const [updateContentPending] = useUpdatePendingContentMutation()
    const [switches, setSwitches] = useState([])

    const onDeleteContent = async (id: number) => {
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
            width: '20%',
            ellipsis: true,
            search: false,
        },
        {
            title: 'Pending',
            dataIndex: 'pending',
            search: false,
            render: (_, row) => (
                <Switch onChange={(checked) => handleSwitchChange(row.id, checked)} />
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
            width: '20%',
            render: (_, row) => (
                <Space>
                    <Button type='primary' danger onClick={() => onDeleteContent(row.id)}>
                        Delete
                    </Button>
                </Space>
            )
        }
    ]

    const handleSwitchChange = (rowId: number, checked) => {
        setSwitches((prevSwitches) => {
            if (prevSwitches.length === 0) {
                return [{ id: rowId, checked: checked }]
            } else {
                const updatedSwitch = prevSwitches.map((switchItem) =>
                    switchItem.id === rowId ? { ...switchItem, checked: !switchItem.checked } : switchItem)

                if (!updatedSwitch.some((switchItem) => switchItem.id === rowId)) {
                    updatedSwitch.push({ id: rowId, checked: true })
                }
                return updatedSwitch
            }
        })
    };


    const onUpdatePending = async () => {
        try {
            setIsLoading(true)
            switches.map(async (switchItem) => {
                const updateFormat = {
                    itemId: switchItem.id,
                    property: 'setPending',
                    value: !switchItem.checked
                }
                await updateContentPending(updateFormat)
                notification.success({
                    message: 'Thành công',
                    description: 'Bài viết đã được duyệt'
                })
            })
            actionRef.current?.reload()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    return (
        <>
            {contextNotification}
            <div className="text-2xl text-left mt-8 font-bold leading-tight pl-8 hover:text-green1 cursor-pointer mb-8">PENDING CONTENT MANAGEMENT</div>
            <ProTable
                className='h-full'
                id="content-management"
                loading={isLoading}
                rowKey="id"
                actionRef={actionRef}
                search={false}
                columns={columns}
                dataSource={contentPendingList && contentPendingList}
                toolBarRender={() => [
                    <Button loading={isLoading} onClick={onUpdatePending} className='bg-button1' type="primary">Update</Button>
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

export default ContentPending
