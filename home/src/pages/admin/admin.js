import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route } from 'react-router-dom';
import Sysconf from './sysconfig/sysconfig'
import MyHeader from './myheader/myheader'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Admin extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    console.log("token"+localStorage.getItem("token"))
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="0">
            <Icon type="home" />
            <span>首页</span>
            </Menu.Item>
            <Menu.Item key="1">
            <Icon type="tool" />
              <span>系统配置</span>
            </Menu.Item>
            <Menu.Item key="2">
            <Icon type="user" />
              <span>账号管理</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>选题管理</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <MyHeader />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
              <Route path="/sysconf" component={Sysconf}/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>版权所有：2607780909@qq.com  <a href="http://www.beian.miit.gov.cn/">ICP证:赣ICP备17014354 </a></Footer>
        </Layout>
      </Layout>
    );
  }
}
export default Admin