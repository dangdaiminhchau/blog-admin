import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, FormInstance, Input, Modal, Select, SelectProps, Spin, notification as antdNotification } from "antd";
import { UploadWidget } from "../../components/UploadWidget";
import { useEffect, useRef, useState } from "react";
import { useGetCategoriesListQuery } from "../../../store/api/categoriesApi";
import { useAddContentMutation } from "../../../store/api/contentApi";
import { IContentBody } from "../../../store/type/content.type";

interface IProps {
    isOpened: boolean;
    onClosed: () => void;
    onSuccess: () => void
}
const CreateContent = ({ isOpened, onClosed, onSuccess }: IProps) => {
    const [notification, contextNotification] = antdNotification.useNotification();

    const [fileType, setFileType] = useState<string>('')

    const [addContent, addContentResult] = useAddContentMutation()

    const { data: categoriesList } = useGetCategoriesListQuery()

    const options: SelectProps['options'] = []
    {
        categoriesList?.map(category => (
            options.push({
                label: `${category.name}`,
                value: category.id
            })
        ))
    }

    const convertCategories = (formValues) => {
        const updatedCategories = formValues.categories.map(categoryId => ({ id: categoryId }));
        return { ...formValues, categories: updatedCategories };
    };

    const onCreateContent = async (formValues: IContentBody) => {
        try {
            const form = convertCategories(formValues);

            await addContent(form)
            notification.success({
                message: 'Thành công',
                description: 'Bạn đã tạo bài viết thành công'
            });
            onSuccess()
            onClosed()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        formRef.current?.resetFields();
    }, [addContentResult.isSuccess]);

    const handleAssetUrl = (value) => {
        const newContent = `${formRef.current.getFieldValue('content')} /*${value}*/`
        formRef.current.setFieldsValue({ content: newContent })
    }

    const formRef = useRef<FormInstance>(null);
    return (
        <>
            {contextNotification}
            <Modal width={800} footer={null} open={isOpened} onCancel={onClosed}>
                <div className="font-bold text-xl mb-4">CREATE CONTENT</div>
                <Card className="p-0">
                    <Form onFinish={onCreateContent} ref={formRef} layout="vertical" className="mt-8">
                        <Form.Item name={["categories"]} label={<div className="text-[1em] text-text1">Category</div>}>
                            <Select size="large" placeholder="Please select category for your post" mode="multiple" allowClear options={options} />
                        </Form.Item>
                        <Form.Item name="title" label={<div className="text-[1em] text-text1">Title:</div>}>
                            <Input size="large" placeholder="Input the title" />
                        </Form.Item>
                        <Form.Item name="description" label={<div className="text-[1em] text-text1">Description:</div>}>
                            <Input.TextArea rows={2} size="large" placeholder="Input the description" />
                        </Form.Item>
                        <Form.Item name="content" label={<div className="text-[1em] text-text1">Content:</div>}>
                            <Input.TextArea rows={4} size="large" placeholder="Input the content" />
                        </Form.Item>

                        <Form.List name="assetList">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restFields }) => (
                                        <Flex key={key} gap="middle">
                                            <Form.Item
                                                {...restFields}
                                                name={[name, 'name']}>
                                                <Input placeholder="Input name file" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restFields}
                                                name={[name, 'tag']}>
                                                <Select options={[
                                                    { value: 'image', label: 'image' },
                                                    { value: 'video', label: 'video' },
                                                ]} placeholder="Select the tag" onChange={(e) => setFileType(e)} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restFields}
                                                name={[name, 'assetURL']}>
                                                <UploadWidget fileType={fileType} onChange={handleAssetUrl} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Flex>
                                    ))}
                                    <Form.Item>
                                        <Button type="primary" className="bg-button1" onClick={() => add()} block icon={<PlusOutlined />}>Add Image or Video</Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Flex justify="flex-end">
                                <Button htmlType="submit" size="middle" className="mr-4" type="primary" danger>
                                    {addContentResult.isLoading ? <Spin /> : 'Post'}
                                </Button>
                                <Button size="middle" className="bg-button1" type="primary">Cancel</Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
        </>

    )
}

export default CreateContent