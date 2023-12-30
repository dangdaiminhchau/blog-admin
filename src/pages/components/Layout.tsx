import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    DashboardOutlined,
    DesktopOutlined,
    FileOutlined,
    FileProtectOutlined,
    FileTextOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Flex, Layout, Menu, theme, Image, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserQuery } from '../../store/api/userApi';
import { logout, setUser } from '../../store/state/authSlice';

const { Header, Content, Sider } = Layout;

const LayoutPage: React.FC = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const [isDisable, setIsDisable] = useState(true)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { user } = useSelector((state: any) => state.auth)

    const token = localStorage.getItem('token')

    const { data } = useGetUserQuery('user', {
        pollingInterval: 900000,
    })
    const dispatch = useDispatch()

    useEffect(() => {
        if (token && token) setIsDisable(false)
    }, [token])

    useEffect(() => {
        if (data && data) dispatch(setUser(data))
    }, [data, dispatch])

    const signout = () => {
        setIsDisable(false)
        dispatch(logout())
        navigate('/')
        // window.location.reload()
    }




    return (
        <Layout hasSider>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Flex justify='center' className='p-4'>
                    <Image preview={false} width={150} src={!collapsed ? '/public/assets/home/logo-dark.png' : '/public/assets/home/logo-dark-collapse.png'} />
                </Flex>
                <Menu
                    onClick={(value) => { if (value.key !== 'signout') navigate(`/${value.key}`) }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    items={[
                        {
                            key: '',
                            icon: <DashboardOutlined />,
                            label: 'Dashboard'
                        },
                        {
                            key: 'user',
                            icon: <UserOutlined />,
                            label: 'User',
                        },
                        {
                            key: 'categories',
                            icon: <AppstoreOutlined />,
                            label: 'Categories',
                        },
                        {
                            key: 'content-group',
                            icon: <FileOutlined />,
                            label: 'Content',
                            children: [
                                {
                                    key: 'content-approved',
                                    icon: <FileTextOutlined />,
                                    label: 'All Content'
                                },
                                {
                                    key: 'content-pending',
                                    icon: <FileProtectOutlined />,
                                    label: 'Content Pending'
                                }
                            ]
                        },
                        {
                            key: 'feedback',
                            icon: <MessageOutlined />,
                            label: 'Feedback'
                        },
                        {
                            key: 'web-info',
                            icon: <DesktopOutlined />,
                            label: 'Web Information'
                        },
                        {
                            key: 'signin',
                            label: 'Signin',
                            disabled: !isDisable
                        },
                        {
                            key: 'signup',
                            label: 'Signup',
                            disabled: !isDisable,
                        },
                    ]}
                />
                <Button type="link" disabled={isDisable} onClick={signout} className='ml-4 mt-2 text-white'>{collapsed ? 'S' : 'Sign out'}</Button>
                <div className="ml-7 mt-5 font-bold text-white">{collapsed ? '🙋‍♀️' : `Hello ${user && user.display_name} 🙋‍♀️`}</div>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;