import { Button, Card, Flex, Form, FormInstance, Input, Modal, notification as antdNotification } from "antd"
import { ICategories, IUpdateCateFormat } from "../../../store/type/categories.type"
import { useEffect, useRef, useState } from "react"
import { useUpdateCateMutation } from "../../../store/api/categoriesApi"

interface IProps {
  data: ICategories,
  isOpened: boolean,
  onSuccess: () => void
  onClosed: () => void
}

const UpdateCategory = ({ data, isOpened, onSuccess, onClosed }: IProps) => {
  const formRef = useRef<FormInstance>(null)
  const [notification, contextNotification] = antdNotification.useNotification()
  const [isLoading, setIsLoading] = useState(false)
  const [updateCateItem] = useUpdateCateMutation()

  useEffect(() => {
    formRef.current?.setFieldsValue({
      ...data,
    })
  }, [isOpened, data])

  const onUpdateCategory = async (formValues: ICategories) => {
    try {
      setIsLoading(true)
      const updateFormatItem: IUpdateCateFormat = {
        itemId: data.id,
        property: 'setName',
        value: formValues.name
      }
      await updateCateItem(updateFormatItem)
      onSuccess()
      onClosed()
      notification.success({
        message: 'Thành công',
        description: 'Cập nhật category thành công'
      })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  return (
    <>
      {contextNotification}
      <Modal open={isOpened} onCancel={onClosed} footer={null}>
        <div className="font-bold text-xl mb-4">UPDATE CATEGORY</div>
        <Card>
          <Form onFinish={onUpdateCategory} ref={formRef}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Flex justify="flex-end">
              <Form.Item>
                <Button htmlType="submit" loading={isLoading} type="primary" className="bg-button1 mr-2">Update</Button>
                <Button type="primary" danger>Cancel</Button>
              </Form.Item>
            </Flex>
          </Form>
        </Card>
      </Modal>
    </>
  )
}

export default UpdateCategory