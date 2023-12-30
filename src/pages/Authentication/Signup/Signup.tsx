import { Alert, Button, Flex, Form, FormInstance, Image, Input, Spin, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useSignupUserMutation } from "../../../store/api/authApi"
import { useEffect, useRef } from "react"


const { Title } = Typography

const Signup = () => {
    const formRef = useRef<FormInstance>(null)

    const navigate = useNavigate()

    const [signupUsers, { data, isLoading, isError, isSuccess }] = useSignupUserMutation()

    console.log(data)

    const onFinishRegister = (values) => {
        signupUsers({ ...values })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/signin')
        }
    }, [isSuccess, navigate])

    return (
        <>

            <Flex className="w-screen">
                <Image width={'45%'} height={'100vh'} preview={false} src='../../../public/assets/authentication/signupBackground.png' />
                <Flex vertical className="h-full m-8 mr-48" justify="center" align="start">
                    <Image height={100} preview={false} src="../../../public/assets/authentication/loginLogo.png" />
                    <Title style={{ fontWeight: 'bolder', marginLeft: '32px' }} level={1}>Create your own account</Title>
                    <Form onFinish={onFinishRegister} className="ml-8 mt-4 w-full" ref={formRef} layout="vertical">
                        {isError && <Alert message={isError} type="error" />}
                        <Form.Item className="mb-4" name="displayName" label={<div className="text-text1 text-[1rem]">Display Name</div>}>
                            <Input placeholder="Input the display name" size="large" />
                        </Form.Item>
                        <Form.Item className="mb-4" name="username" label={<div className="text-text1 text-[1rem]">Username</div>} >
                            <Input placeholder="Input the username" size="large" />
                        </Form.Item>
                        <Form.Item className="mb-4" name="password" label={<div className="text-text1 text-[1rem]">Password</div>} rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters!',
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                message:
                                    'Password must contain at least one lowercase letter, one uppercase letter, and one special character!',
                            },]}>
                            <Input.Password placeholder="Input the password" size="large" />
                        </Form.Item>
                        <Form.Item className="mb-4" name="email" label={<div className="text-text1 text-[1rem]">Email</div>} rules={[{ required: true, message: 'Email is required', type: 'email' }]}>
                            <Input placeholder="Input the email" size="large" />
                        </Form.Item>
                        <div className="text-[1rem]">Already have an account? <Link className="text-button1 underline font-medium" to={'/signin'}>Sign in</Link></div>
                        <Form.Item>
                            <Button className="bg-button1 mt-8 w-24 font-semibold" size="large" type="primary" htmlType="submit">
                                {isLoading ? <Spin /> : 'Sign up'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </>
    )
}

export default Signup