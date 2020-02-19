import React from 'react'
import {Form, Icon, Upload, Button, Row, Col, message} from 'antd'
class TeacherAccount extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
      normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
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
				<Row>
					
					<Col span={4}><Button icon="download">点击此处下载模板</Button></Col>
					<Col span={4}>
						<Upload {...props}>
							<Button> <Icon type="upload" /> 批量导入账号 </Button>
						</Upload>
					</Col>
					<Col span={4}>
						<Button icon="user-add">新增账号</Button>
					</Col>
					
				</Row>
                
            </div>
        )
    }
}
export default Form.create()(TeacherAccount);