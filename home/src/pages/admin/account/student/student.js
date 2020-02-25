import React from 'react'
import {Form, Button, Row, message, Input, Modal} from 'antd'
import StudentYearPanel from './yearpanel'
import MConfig from '../../../config'
import Axios from 'axios'
class Student extends React.Component {
    state = {
        visible: false,
    };
    sys_error = (msg) => {
        message.error(msg)
    }
    sys_success = (msg) => {
        message.success(msg)
    }
    handleCancel = () => {
		this.setState({ visible: false });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
				let _this = this

                Axios.defaults.headers.common["token"] = localStorage.getItem("token");
                Axios.put(
					MConfig.request_url + '/admin/addStuYear/'+ values.year, 
                )
                .then(function (response) {
                    console.log(response.data)
					if (response.data.code === 10001) {
						_this.sys_success("添加成功, 请刷新页面")
					} else {
						_this.sys_error("请检查教号是否重复")
					}
                })
                .catch(function (error) {
                    console.log(error);
                })
                this.setState({ visible: false })
            } else {
                this.sys_error("输入有误，请检查")
            }
        });
	};
    addYear = ()=> {
        const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<br/>
				<h3 align="center">信息修改</h3>
			<Form.Item>
				{getFieldDecorator('year', {
					rules: [
						{ required: true, message: '请输入毕业年份（4位）' },
						{ min: 4, message: '只允许为4位' },
						{ max: 4, message: '只允许为4位' },
					],
				})(
					<Input
					type="text"
					placeholder="毕业年份"
					/>,
				)}
			</Form.Item>


			<Form.Item>
			  <Button type="primary" htmlType="submit" className="login-form-button">
				确定
			</Button>
			&nbsp;
			<Button key="back" onClick={this.handleCancel}>
				取消
			</Button>,
			</Form.Item>
		  </Form>
		)
    }
    
    render() {
        
        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    mask={false}
                    footer={null}
                >
                    {this.addYear()}
                </Modal>
                <Row>
                <Button 
                        onClick={()=>{
							this.setState({
								visible: true
							})
						}}
                        >新增毕业生
                        </Button>
                    
                </Row>
                <br/>
                <Row>
                    <StudentYearPanel />
                </Row>
            </div>
        )
    }
}
export default Form.create()(Student);