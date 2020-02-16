import React from 'react'
import Footer from './footer/footer'
import 'antd/dist/antd.css';
import './login.less'
import MConfig from '../config'
import getFormdata from '../public/js/getFormData'
import JSEncrypt from 'jsencrypt'
import { Form, Input, Icon, Checkbox, Button, Col, Row, Radio, message } from 'antd';
import Axios from 'axios'

const options = [
    { label: '学生', value: 'stu' },
    { label: '教师', value: 'tea' },
    { label: '管理员', value: 'adm' },
];

class Login extends React.Component {

    loginType_error = () => {
        message.error('请选择登陆身份');
    };
    login_success = () => {
        message.success("登陆成功")
    };
    login_error = (msg) => {
        message.error(msg)
    };
    publicSecritKey_error = () => {
        message.error("系统发生错误，请重试")
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {


            if (!err) {
                //判断登陆类型是否正确
                if (values.loginType === undefined) {
                    this.loginType_error()
                }

                let publicSecritKey
                let self = this
                Axios.get(
                    MConfig.request_url + '/getPublicSecret', 
                )
                .then(function (response) {
                    
                    if (response.data.code === 10005) {
                        //公钥获取成功
                        publicSecritKey = response.data.data
                        let encrypt = new JSEncrypt()
                        encrypt.setPublicKey(publicSecritKey);

                        let username = encrypt.encrypt(values.username)
                        let password = encrypt.encrypt(values.password)

                        let data = getFormdata({
                            username: username,
                            password: password,
                            type:     values.loginType
                        })
                        //登陆
                        Axios.post(
                            MConfig.request_url + '/user/login', 
                            data
                        )
                        .then(function (response) {
                            if (response.data.code === 20005) {
                                self.login_success()
                                console.log(response.data)
                                localStorage.setItem("token", response.data.data.token)
                                localStorage.setItem("name", response.data.data.username)
                                localStorage.setItem("sf", values.loginType)
                                self.props.history.push("/admin")
                                
                            } else {
                                self.login_error(response.data.message)
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                    //获取失败
                    } else {
                        self.publicSecritKey_error()
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        });
    };
    onChange1 = e => {
        this.setState({
          value1: e.target.value,
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="top"></div>
                <div className="middle">
                    <div className="m1">
                        <strong>毕业选题系统-登陆</strong>
                    </div>
                    <div className="m2">
                        <Form className="login-form" onSubmit={this.handleSubmit}>
                            <Row>
                                <br/>
                                <Col span={4}></Col>
                                <Col span={16}>
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules: [
                                                { required: true, message: '请输入账号' },
                                                { min: 6,   message: "账号最小长度为6位"},
                                                { max: 12,  message: "账号最大长度为12位"},
                                            ],
                                        })(
                                            <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="用户名"
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={4}></Col>
                            </Row>
                            <Row>
                                <Col span={4}></Col>
                                <Col span={16}>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                { required: true, message: '请输入账号' },
                                                { min: 8,   message: "密码最小长度为8位"},
                                            ],
                                        })(
                                            <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="密码"
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={4}></Col>
                            </Row>
                            <Row>
                                <Col span={4}></Col>
                                <Col span={20}>
                                {getFieldDecorator('loginType', {
                                })(
                                    <Radio.Group
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="hidden"
                                        options={options} 
                                        onChange={this.onChange1} />
                                        )}
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Form.Item>
                                    <Col span={4}></Col>
                                    <Col span={10}>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(<Checkbox>记住我</Checkbox>)}
                                    </Col>
                                    <Col span={10}>
                                        <a className="login-form-forgot" href="www.xukai.ink">
                                            忘记密码
                                        </a>
                                    </Col>
                                </Form.Item>
                            </Row>
                            <Row>
                                <Col span={4}></Col>
                                <Col span={20}>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                            登陆
                                        </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="button"></div>
                <Footer/>
            </div>
        )
    }
}

export default Form.create()(Login);