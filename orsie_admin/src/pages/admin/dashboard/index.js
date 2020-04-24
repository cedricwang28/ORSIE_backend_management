import React from 'react'
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './dashboard.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {Switch,Route,Redirect} from "react-router-dom";
import User from '../user'
import Event from '../event'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Dashboard() {
    const history = useHistory();

    return (
        
        <Layout>
        <Header className="header">
            <div className="logo">
                <img src={require('../../../assets/dclogo.png')} />
            </div>
            
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
            
                <Menu.Item onClick={() => history.push('/admin/user')}><UserOutlined />Users</Menu.Item>
                <Menu.Item onClick={() => history.push('/admin/event')}><NotificationOutlined />Events</Menu.Item>
            </Menu>
            </Sider>
            <Layout style={{ padding: '16px 24px 24px' }}>
            
            <Content
                className="site-layout-background content"
                style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                }}
            >
                <Switch>
        
                    <Route path="/admin/user" component={User} />
                    <Route path="/admin/event" component={Event} />
                    <Redirect to="/admin/user" />
        
                </Switch>

            </Content>
            </Layout>
        </Layout>
        </Layout>
    )
}

export default withRouter(Dashboard)
