import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
// import Sysconf from './sysconfig/sysconfig'
import MyHeader from '../../../admin/myheader/myheader'
import MenuList from '../routerConfig'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Student extends React.Component {
  state = {
    collapsed: false,
  };
  UNSAFE_componentWillMount() {
	  const menuTreeNode = this.renderMenu(MenuList)
	  this.setState({
		  menuTreeNode
	})
}
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
		  { this.state.menuTreeNode }
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
              {/* <Route path="/sysconf" component={Sysconf}/> */}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>版权所有：2607780909@qq.com  <a href="http://www.beian.miit.gov.cn/">ICP证:赣ICP备17014354 </a></Footer>
        </Layout>
      </Layout>
    );
  }
  renderMenu = (data) => {
    return data.map((item)=>{
      if (item.children) {
          return (
              <SubMenu title={item.title} key={item.key}>
                  { this.renderMenu(item.children) }
              </SubMenu>
          )
      }
      return <Menu.Item key={item.key}><NavLink to={item.key}><Icon type={item.icon} />{item.title}</NavLink></Menu.Item>
          
  	})
  }
}


export default Student                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        