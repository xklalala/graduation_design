import React from 'react'
import { Card } from 'antd';
import EditPwd from './editpwd'
import EditUserInfo from './edituserinfo'
const tabList = [
    {
      key: 'userinfo',
      tab: '个人信息修改',
    },
    {
      key: 'password',
      tab: '密码修改',
    },
  ];
class Index extends React.Component {
    contentList = (key)=> {
        //个人信息
        if (key === "userinfo") {
          
            return <EditUserInfo />
            // return <EditPwd />
        } else {
            //修改密码
            return <EditPwd />
        }
    }
    state = {
        key: 'userinfo',
        noTitleKey: 'app',
      };
    
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    render() {
        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                    >
                    {
                    this.contentList(this.state.key)
                    }
                </Card>
            </div>
        )
    }
}
export default Index