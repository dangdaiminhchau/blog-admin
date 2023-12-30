import { Button, Flex, Skeleton, notification as antdNotification } from "antd"
import { useDeleteFeedbackMutation, useGetAllFeedbackQuery } from "../../store/api/feedbackApi"
import { useState } from "react"

const Feedback = () => {
    const { data, isFetching } = useGetAllFeedbackQuery()
    const [isLoading, setIsLoading] = useState(false)
    const [notification, contextNotification] = antdNotification.useNotification()
    const [deleteFeedback] = useDeleteFeedbackMutation()

    const onDeleteFeedback = async (id: number) => {
        try {
            setIsLoading(true)
            await deleteFeedback(id)
            notification.success({
                message: 'Thành công',
                description: 'Xóa user thành công'
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    return (
        <>
            {contextNotification}
            <div className="max-w-sm text-2xl font-bold leading-tight pl-8 mt-16 hover:text-green1 cursor-pointer mb-8">FEEDBACK MANAGEMENT</div>
            {
                isFetching && isFetching ? <Skeleton active className="p-16" /> : (
                    <div className="max-w-800 overflow-auto">
                        {data && data?.map(item => (
                            <Flex key={item.id} className="w-full">
                                <Flex className="ml-16 mr-24 mt-4 mb-8 w-4/5">
                                    <div className="text-lg font-medium hover:cursor-pointer justify-end text-left">
                                        <span className="link link-underline link-underline-black text-black">{item.content}</span>
                                    </div>
                                </Flex>
                                <Button loading={isLoading} onClick={() => onDeleteFeedback(item.id)} type="primary" danger className="self-center">Delete</Button>
                            </Flex>

                        ))}
                    </div>
                )}
        </>

    )
}

export default Feedback

const styles = `
            .link-underline {
            border-bottom-width: 0;
            background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
            background-size: 0 3px;
            background-position: 0 100%;
            background-repeat: no-repeat;
            transition: background-size .5s ease-in-out;
    }

            .link-underline-black {
                background-image: linear-gradient(transparent, transparent), linear-gradient(#0ED3CF, #0ED3CF)
    }

            .link-underline:hover {
                background-size: 100% 3px;
            background-position: 0 100%;
    }
            `;

// Kết hợp đoạn CSS với component
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];