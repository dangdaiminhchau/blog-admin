import { Alert, Button, Flex, Form, FormInstance, Image, Input, Spin, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useSigninUserMutation } from "../../../store/api/authApi"
import { setUser } from "../../../store/state/authSlice"
import { useAppDispatch } from "../../../store/hook"
import { useEffect, useRef } from "react"


const { Title } = Typography
const Signin = () => {
    const formRef = useRef<FormInstance>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [signinUser, { data, isLoading, isError, isSuccess, error }] = useSigninUserMutation()


    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser({ token: data.token, user: data.user }))
            navigate('/')
            localStorage.setItem('token', data.token)
        }
    }, [data, isSuccess, dispatch, navigate])

    const onFinishSignin = (values) => {
        signinUser(values)
    }



    return (
        <Flex className="w-screen">
            <Image style={{ borderRadius: '4%', padding: '8px' }} width={'45%'} height={'100vh'} preview={false} src='../../../public/assets/authentication/loginBackground.png' />
            <Flex vertical className=" m-16 mr-48" justify="center" align="start">
                <Image height={'15vh'} preview={false} src="../../../public/assets/authentication/loginLogo.png" />
                <Title style={{ fontWeight: 'bolder', marginLeft: '32px' }} level={1}>Log in to your account</Title>
                <Form onFinish={onFinishSignin} className="ml-8 w-full" ref={formRef} layout="vertical">
                    {isError && <Alert message={(error as any).data.message} type="error" />}
                    <Form.Item name="username" label={<div className="text-text1 text-[1rem]">Username</div>} >
                        <Input placeholder="Input the username" size="large" />
                    </Form.Item>
                    <Flex vertical>
                        <Form.Item className="mb-0" name="password" label={<div className="text-text1 text-[1rem]">Password</div>} rules={[
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
                            },]}  >
                            <Input.Password className="w-full" placeholder="Input the password" size="large" />
                        </Form.Item>
                        <div className="flex justify-end text-[1rem] text-button2"><Link to={""}>Forgot Password</Link></div>
                    </Flex>
                    <div className="text-[1rem]">Don't have an account? <Link className="text-button1 underline font-medium" to={'/signup'}>Sign up</Link></div>
                    <Form.Item>
                        <Button className="bg-button1 mt-8 w-24 font-semibold" size="large" type="primary" htmlType="submit">
                            {isLoading ? <Spin /> : 'Login'}
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </Flex>
    )
}

export default Signin