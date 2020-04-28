import React from 'react'
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './dashboard.css'
import { Layout, Menu, Dropdown, Avatar,Button} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,DownOutlined } from '@ant-design/icons';
import {Switch,Route,Redirect} from "react-router-dom";
import User from '../user'
import Event from '../event'
import AddEvent from '../addevent'
import { isLogined } from "../../../utils/auth";
import { clearToken } from "../../../utils/auth";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Dashboard(props) {
    const history = useHistory();

    const menu = (
        <Menu onClick={p => {
            if (p.key == "logOut") {
              clearToken();
              props.history.push("/login");
            } 
          }}>
          <Menu.Item  key="logOut">
            <a rel="noopener noreferrer" href="">
              Log Out
            </a>
          </Menu.Item>
          
        </Menu>
      );

    return isLogined() ? (
        
        <Layout>
        <Header className="header">
            <div className="logo">
                <img src={require('../../../assets/dclogo.png')} />
            </div>
            
            <Dropdown overlay={menu}>
                <div>
                <Avatar>DC</Avatar>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Administrator <DownOutlined />
                </a>
                </div>
            </Dropdown>
            
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
                    <Route path="/admin/addevent" component={AddEvent} />
                    <Redirect to="/admin/user" />
        
                </Switch>

            </Content>
            </Layout>
        </Layout>
        </Layout>
    ): (
        <Redirect to="/login" />
      );
}

export default withRouter(Dashboard)
