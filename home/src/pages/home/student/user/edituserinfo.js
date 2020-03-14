import React from 'react'
import { Form, Input, Button, message} from 'antd';
import getFormdata from '../../../public/js/getFormData'
import Axios from 'axios'
import MConfig from '../../../config'
class EditUserInfo extends React.Component {
  constructor(props){
    super(props)
    this.state={ 
      data: {
		id	 : null,
		name : null,
		cname : null,
		phone:       null  ,
		another_contact:null,
	  }
    }
  }
    sys_warning = (msg)=>{
        message.warning(msg)
    }
    sys_success = (msg)=>{
        message.success(msg)
    }
    sys_error = (msg)=>{
        message.error(msg)
    }
    componentDidMount() {
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(
            MConfig.request_url + '/stu/user', 
        )
        .then((response) => {
            if (response.data.code === 10001) {
                let _data = {
					id	 : response.data.data.id,
                    name : response.data.data.student_name,
                    cname : response.data.data.class_name,
                    phone:         response.data.data.phone_number,
                    another_contact:response.data.data.another_contact,
                }
                this.setState({
                    data:_data
				})
            } else {
                message.error("错误")
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
				Axios.defaults.headers.common["token"] = localStorage.getItem("token");
				let data = getFormdata({
					stuName: values.name,
					stuCname: values.cname,
					phone: values.phone,
					anoContact: values.another_contact
            	})
			Axios.post(
				MConfig.request_url + '/stu/user',
				data 
			)
			.then((response) => {
				if (response.data.code === 10001) {
					message.success("ok")
				} else {
					message.error("失败")
				}
			})
			.catch(function (error) {
				console.log(error);
			})
				}
				// updateTeacherInfo
			});
      };
    
    render() {
		let getdata = this.state.data
        const { getFieldDecorator } = this.props.form;
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('name', {
                initialValue: getdata.name,
                rules: [
                    { required: true, message: '请输入姓名' },
                    { min: 2,   message: "姓名最少需要2位"},
                ],
              })(
                <Input
                  type="text"
                  placeholder="姓名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('cname', {
                initialValue: getdata.cname,
                rules: [
                    { required: true, message: '请输入班级' },
                ],
              })(
                <Input
                  type="text"
                  placeholder="班级"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                  initialValue: getdata.phone,
               rules:[{pattern:/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message:"请输入正确的手机号"}]
              })(
                <Input
                  type="text"
                  placeholder="手机号"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('another_contact', {
                  initialValue: getdata.another_contact,
              })(
                <Input
                  type="text"
                  placeholder="其它联系方式,比如qq群，微信号之类"
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
export default Form.create()(EditUserInfo);