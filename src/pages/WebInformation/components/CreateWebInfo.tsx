import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, Modal, Select, notification as antdNotification } from "antd"
import { UploadWidget } from "../../components/UploadWidget";
import { useRef, useState } from "react";
import { FormInstance } from "antd/lib";
import { IWebInfoBody } from "../../../store/type/webInfo.type";
import { useAddWebInfoMutation } from "../../../store/api/webInfo";

interface IProps {
    isOpened: boolean;
    onClosed: () => void;
    onSuccess: () => void;
}

const CreateWebInfo = ({ isOpened, onClosed, onSuccess }: IProps) => {
    const formRef = useRef<FormInstance>(null);
    const [notification, contextNotification] = antdNotification.useNotification();
    const [fileType, setFileType] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [addWebInfo] = useAddWebInfoMutation()

    const onCreateWebInfo = async (formValues: IWebInfoBody) => {
        try {
            setIsLoading(true)
            await addWebInfo(formValues)
            console.log(formValues)
            onSuccess()
            notification.success({
                message: 'Thành công',
                description: 'Bạn đã tạo bài viết thành công'
            });
            onClosed()

        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    return (
        <>
            {contextNotification}
            <Modal footer={null} width={800} open={isOpened} onCancel={onClosed}>
                <div className="font-bold text-xl mb-4">CREATE CONTENT</div>
                <Card className="p-0">
                    <Form onFinish={onCreateWebInfo} ref={formRef} layout="vertical" className="mt-8">
                        <Form.Item name="name" label={<div className="text-[1em] text-text1">Title:</div>}>
                            <Input size="large" placeholder="Input the title" />
                        </Form.Item>
                        <Form.Item name="content" label={<div className="text-[1em] text-text1">Content:</div>}>
                            <Input.TextArea rows={2} size="large" placeholder="Input the Content" />
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
                                                <UploadWidget fileType={fileType} />
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
                                <Button loading={isLoading} htmlType="submit" size="middle" className="mr-4" type="primary" danger>Post</Button>
                                <Button size="middle" className="bg-button1" type="primary">Cancel</Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
        </>

    )
}

export default CreateWebInfo