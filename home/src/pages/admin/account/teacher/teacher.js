import React from 'react'
import {Form, Icon, Upload, Button, Row, Col, message, Input, Modal} from 'antd'
import TeacherList from './teacherTable'

class TeacherAccount extends React.Component {
	state = {
        loading: false,
        visible: false,
    };
	handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                // Axios.defaults.headers.common["token"] = localStorage.getItem("token");
                // Axios.post(
                //     MConfig.request_url + '/admin/updatePwd', 
                // )
                // .then(function (response) {

                // })
                // .catch(function (error) {
                //     console.log(error);
                // })
                this.setState({ visible: false })
            } else {
                
            }
        });
	};
	add_teacher = ()=> {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<br/>
				<h3 align="center">信息修改</h3>
			<Form.Item>
				{getFieldDecorator('name', {
					rules: [
						{ required: true, message: '请输入姓名' },
						{ min:2, message:"教号最短为2位"}
					],
				})(
					<Input
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="text"
					placeholder="姓名"
					/>,
				)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('teacher_id', {
					rules: [
						{ required: true, message: '请输入教号' },
						{ min:6, message:"教号最短为6位"}
					],
				})(
					<Input
					prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="text"
					placeholder="教号"
					/>,
				)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('phone', {
					rules:[{pattern:/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message:"请输入正确的手机号"}]
				})(
					<Input
					prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="text"
					placeholder="手机号"
					
					/>,
				)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('another_contact', {
				})(
					<Input
					prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="text"
					placeholder="其它联系方式"
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
	handleCancel = () => {
		this.setState({ visible: false });
	};
    render() {
        const props = {
			name: 'filename',
			action: 'http://127.0.0.1:8080/api/upload',
			headers: {
			  token: localStorage.getItem("token"),
			},
			showUploadList:false,
			onChange(info) {
			  if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList);
			  }
			  if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
			  } else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			  }
			},
		};
		
        return (
            <div>
				<Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    mask={false}
                    footer={null}
                >
                    {this.add_teacher()}
                </Modal>
				<Row>
					
					<Col span={4}><Button icon="download">点击此处下载模板</Button></Col>
					<Col span={4}>
						<Upload {...props}>
							<Button> <Icon type="upload" /> 批量导入账号 </Button>
						</Upload>
					</Col>
					<Col span={4}>
					<Button 
						icon="user-add"
                        onClick={()=>{
							this.setState({
								visible: true
							})
						}}
                        >新增账号
                        </Button>
					</Col>
					
				</Row>
				<Row>
					<TeacherList />
				</Row>
                
            </div>
        )
	}
}
export default Form.create()(TeacherAccount);