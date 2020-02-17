import React from 'react'
import { Form, Card, Col, Row } from 'antd';
const tabList = [
    {
      key: 'userinfo',
      tab: '个人信息',
    },
    {
      key: 'password',
      tab: '密码修改',
    },
  ];
  const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
  };
class EditUserInfo extends React.Component {
    contentList = (key)=> {
        //个人信息
        if (key === "userinfo") {
            return <a>hello</a>
        } else {
            //修改密码
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
export default Form.create()(EditUserInfo);