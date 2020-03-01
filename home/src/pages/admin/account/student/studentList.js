import React from 'react'
import Axios from 'axios'
import {Form, Icon, Upload, Button, Row, Col, message, Input, Popconfirm, Table, Modal} from 'antd'
import Highlighter from 'react-highlight-words';
import MConfig from '../../../config'
import getFormdata from '../../../public/js/getFormData'
class StudentList extends React.Component {
    state = {
        data: []
    }
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
                // 
                let _this = this
                let data = getFormdata({
					student_name: 	values.name,
					student_id: 	values.student_id,
					student_class_name: 	values.class_name,
					phone:     		typeof(values.phone) === undefined?values.phone:"",
					another_contact:typeof(values.another_contact)  === undefined?values.another_contact:""
				})
                Axios.defaults.headers.common["token"] = localStorage.getItem("token");
                Axios.post(
					MConfig.request_url + '/admin/addStudent/'+ this.props.match.params.year, 
					data
                )
                .then(function (response) {
					if (response.data.code === 10001) {
						_this.sys_success("添加成功")
					} else {
						_this.sys_error("请检查学号是否重复")
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
    add_student = ()=> {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<br/>
				<h3 align="center">新增学生账号</h3>
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
				{getFieldDecorator('student_id', {
					rules: [
						{ required: true, message: '请输入学号' },
						{ min:12, message:"学号为12位"},
						{ max:12, message:"学号为12位"}
					],
				})(
					<Input
					prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="text"
					placeholder="学号"
					/>,
				)}
			</Form.Item>
            <Form.Item>
				{getFieldDecorator('class_name', {
				})(
					<Input
					type="text"
					placeholder="班级"
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
    
    componentDidMount() {
        let _this = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(
            MConfig.request_url + '/admin/getStuList/'+ this.props.match.params.year, 
        )
        .then(function (response) {
            console.log(response.data)
            if (response.data.code === 10001) {
                let result = new Array()
                for (let key in response.data.data) {
                    result.push(
                        {
                            key:                response.data.data[key]["id"],
                            name:               response.data.data[key]["student_name"],
                            student_id:         response.data.data[key]["student_id"],
                            class_name:         response.data.data[key]["class_name"],
                            phone:              response.data.data[key]["phone_number"],
                            another_contact:    response.data.data[key]["another_contact"],
                        }
                    )
                }
                _this.setState({
                    data:result
                })
            } else {

            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
	
    deleteStu = (id, index) => {
        let _this = this
        let _data = this.state.data
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.delete(
            MConfig.request_url + '/admin/studentDelete/'+ id+"/"+this.props.match.params.year, 
        )
    
        .then(function (response) {
            console.log(response.data)
            if (response.data.code === 10001) {
                _this.sys_success("ok")
                _data.splice(index, 1)
                _this.setState({
                    data:_data
                })
            } else {
                _this.sys_success("发生了错误")
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
        };
        handleReset = clearFilters => {
            clearFilters();
            this.setState({ searchText: '' });
            };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
            setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
            ) : (
            text
            ),
    });

    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: '10%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '学号',
                dataIndex: 'student_id',
                key: 'student_id',
                width: '20%',
                ...this.getColumnSearchProps('student_id'),
            },
            {
                title: '班级',
                dataIndex: 'class_name',
                key: 'class_name',
                width: '20%',
                ...this.getColumnSearchProps('class_name'),
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
                ...this.getColumnSearchProps('phone'),
            },
            {
                title: '其它联系方式',
                dataIndex: 'another_contact',
                key: 'another_contact',
                ...this.getColumnSearchProps('another_contact'),
            },
            {
                title: '操作',
                key: 'cz',
                render: (text, record, index) => 
                <div>
                    <Popconfirm
                        title="你确定要删除这个账号吗?"
                        onConfirm={()=>this.deleteStu(record.key, index)}
                        onCancel={null}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="danger"
                            ghost
                        >
                        删除
                    </Button>&nbsp;
                    </Popconfirm>
                    {/* <Button 
                        type="primary" 
                        ghost 
                        onClick={()=>this.edit_teacher({
                            key:            index,
                            id:             record.key,
                            name:           record.name, 
                            teacher_id:     record.teacher_id,
                            phone:          record.phone,
                            another_contact:record.another_contact,
                            status:         record.status
                        })}
                        >编辑
                        </Button> */}
                </div>
            }
        ];
        const _this = this
        const props = {
			name: 'filename',
			action: 'http://127.0.0.1:8080/api/admin/multipleAddStu/'+this.props.match.params.year,
			headers: {
			  token: localStorage.getItem("token"),
			},
			showUploadList:false,
			onChange(info) {
				console.log(info.file.response)
				if(typeof(info.file.response) != "undefined") {
					console.log(info.file.response)
					if (info.file.response.code === 10001) {
						_this.sys_success("添加成功, 请刷新页面");
					}else {
						_this.sys_error("批量添加失败，请检查教号是否重复")
					}
				}
			},
		};
        return (
            
            <div>
                <Row>学生总人数：{this.state.data.length} 人
                    </Row>
                    <br/>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    mask={false}
                    footer={null}
                >
                    {this.add_student()}
                </Modal>
                <Row>
					<Col span={4}><a href={MConfig.request_url + '/studentExample.xlsx'}><Button icon="download">点击此处下载模板</Button></a></Col>
					<Col span={4}>
						<Upload {...props}><Button> <Icon type="upload" /> 批量导入账号 </Button></Upload>
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
                <br/>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        )
    }
}
export default Form.create()(StudentList);