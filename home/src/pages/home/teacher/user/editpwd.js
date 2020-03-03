import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import JSEncrypt from 'jsencrypt'
import Axios from 'axios'
import MConfig from '../../../config'
import getFormdata from '../../../public/js/getFormData'
class EditPwd extends React.Component {
    sys_warning = (msg)=>{
        message.warning(msg)
    }
    sys_success = (msg)=>{
        message.success(msg)
    }
    sys_error = (msg)=>{
        message.error(msg)
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.newPwd === values.oldPwd) {
                    console.log(values.oldPwd)
                    this.sys_warning("新旧密码相同, 请重新输入新密码")
                } else {

                    let publicSecritKey = localStorage.getItem("publicSecritKey")
                    let encrypt = new JSEncrypt()
                    encrypt.setPublicKey(publicSecritKey);
                    let oldPwd = encrypt.encrypt(values.oldPwd)
                    let newPwd = encrypt.encrypt(values.newPwd)

                    let data = getFormdata({
                        old_pwd: oldPwd,
                        new_pwd: newPwd,
                    })
                    let self = this
                    Axios.defaults.headers.common["token"] = localStorage.getItem("token");
                    Axios.post(
                        MConfig.request_url + '/tea/updateTeacherPwd', 
                        data
                    )
                    .then(function (response) {
                        console.log(response.data)
                        if (response.data.code === 10001) {
                            self.sys_success("修改成功")
                            
                        } else {
                            self.sys_error("错误")
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                }
            }
        });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('oldPwd', {
                rules: [
                    { required: true, message: '请输入密码' },
                    { min: 8,   message: "密码最小长度为8位"},
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="旧密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('newPwd', {
                rules: [
                    { required: true, message: '请输入密码' },
                    { min: 8,   message: "密码最小长度为8位"},
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="新密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                确定
              </Button>
            </Form.Item>
          </Form>
        );
      }
}
export default Form.create()(EditPwd);