import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Flex, Form, FormInstance, Input, Space, notification as antdNotification } from 'antd';
import { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useAddCateMutation, useDeleteCateMutation, useGetCategoriesListQuery } from '../../store/api/categoriesApi';
import { ICategories } from '../../store/type/categories.type';
import UpdateCategory from './components/UpdateCategory';

const Category = () => {
    const [notification, contextNotification] = antdNotification.useNotification()
    const [currentRowItem, setCurrentRowItem] = useState<any>({})
    const [isOpenedUpdateModal, setIsOpenedUpdateModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const actionRef = useRef<ActionType>()
    const { data: cateList } = useGetCategoriesListQuery()
    const [deleteCate] = useDeleteCateMutation()
    const [addCate] = useAddCateMutation()
    const formRef = useRef<FormInstance>(null)

    const onDeleteUser = async (id: number) => {
        try {
            setIsLoading(true)
            await deleteCate(id)
            notification.success({
                message: 'Thành công',
                description: 'Xóa category thành công'
            })
            actionRef.current?.reload()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const onCreateCategory = async (values) => {
        try {
            setIsLoading(true)
            await addCate(values)
            notification.success({
                message: 'Thành công',
                description: 'Thêm Category thành công'
            })
            actionRef.current?.reload()
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }


    const columns: ProColumns<ICategories>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            search: false,
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
            <UpdateCategory isOpened={isOpenedUpdateModal} data={currentRowItem} onClosed={() => setIsOpenedUpdateModal(false)} onSuccess={() => actionRef.current?.reload()} />
            <div className="text-2xl font-bold text-left mt-8 leading-tight pl-8 hover:text-green1 cursor-pointer mb-0">CATEGORIES MANAGEMENT</div>
            <ProTable
                id="user-management"
                loading={isLoading}
                rowKey="id"
                actionRef={actionRef}
                search={false}
                columns={columns}
                dataSource={cateList && cateList}
                toolBarRender={() => [
                    <Form ref={formRef} onFinish={onCreateCategory}>
                        <Flex align='center'>
                            <Form.Item>
                                <Button htmlType="submit" type='primary' className='bg-button1 mr-2'>
                                    <PlusOutlined /> Create new Categories
                                </Button>
                            </Form.Item>
                            <Form.Item name="name">
                                <Input placeholder='Input the name of category' />
                            </Form.Item>
                        </Flex>
                    </Form>
                ]}
                options={{
                    fullScreen: false,
                    reload: false,
                    setting: false,
                    density: false,
                }}
                pagination={{
                    showSizeChanger: true,
                    pageSize: 5,
                    defaultCurrent: 1,
                }} />
        </>
    )
}

export default Category
