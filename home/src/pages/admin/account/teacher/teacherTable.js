import React from 'react'
import { Table, Input, Button, Icon, Switch, Modal, Form, Popconfirm, message } from 'antd';
import Highlighter from 'react-highlight-words';
import MConfig from '../../../config'
// import getFormdata from '../../../public/js/getFormData'
import getFormdata from '../../../public/js/getFormData'
import JSEncrypt from 'jsencrypt'
import Axios from 'axios'
class TeacherList extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data:[],
        loading: false,
        visible: false,
        formData:{},
        submit:false
    };
    sys_error = (msg) => {
        message.error(msg)
    }
    sys_success = (msg) => {
        message.success(msg)
    }
    
    componentDidMount() {
        let self = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(
            MConfig.request_url + '/admin/teacherlist', 
        )
        .then(function (response) {
            if (response.data.code === 200) {
                let result = new Array()
                for (let key in response.data.data) {
                    result.push(
                        {
                            key:                response.data.data[key]["id"],
                            name:               response.data.data[key]["teacher_name"],
                            teacher_id:         response.data.data[key]["teacher_id"],
                            phone:              response.data.data[key]["phone_number"],
                            another_contact:    response.data.data[key]["another_contact"],
                            status:             response.data.data[key]["teacher_status"],
                        }
                    )
                }
                self.setState({
                    data: result
                })
            } else {
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

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
    //禁用或者启用
    disable_OR_enable = (checked,id, index) => {
        
        console.log(checked)
        console.log(id)
        console.log(index)
        
        let _this = this
        let send = getFormdata({
            id:     id,
            status: checked===false?"0":"1"
        })
        const _data = this.state.data
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.post(
            MConfig.request_url + '/admin/setStatus',
            send
        )
        .then(function (response) {
            console.log(response.data)
            if (response.data.code === 10001) {
                _this.sys_success("ok")
                _data[index].status = checked===true?"1":"0"
                _this.setState({
                    data: _data
                })
            } else {
                _this.sys_error("发生了错误")
            }
        })


        
        
    }
    //删除教师
    delete_teacher = (id, index) => {
        let _data = this.state.data
        let _this = this
        console.log(id, index)
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(
            MConfig.request_url + '/admin/delete/'+id,
        )
        .then(function (response) {
            console.log(response)
            if (response.data.code === 10001) {
                _this.sys_success("删除成功")
                _data.splice(index, 1)
                _this.setState({
                    data:_data
                })
            } else {
                _this.sys_error("发生了错误")
            }
        })

    }
    //编辑账号
    edit_teacher = (data) => {
        this.setState({
            visible: true,
            submit:true,
        });
        data = JSON.stringify(data)
        localStorage.setItem("teacher_form_data", data)
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ visible: false, submit:false });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let _this = this
				let publicSecritKey = localStorage.getItem("publicSecritKey")
                let encrypt = new JSEncrypt()
                encrypt.setPublicKey(publicSecritKey);

                let teacher_id = encrypt.encrypt(values.teacher_id)
                
				let send = getFormdata({
                    id:             values.id,
					teacher_name: 	values.name,
					teacher_id: 	teacher_id,
					phone:     		values.phone.length > 0 ? values.phone:"",
					another_contact:values.another_contact.length > 0 ? values.another_contact:""
                })
                let data = this.state.data
                Axios.defaults.headers.common["token"] = localStorage.getItem("token");
                Axios.post(
					MConfig.request_url + '/admin/editTeacher', 
					send
                )
                .then(function (response) {
					if (response.data.code === 10001) {
                        _this.sys_success("修改成功")
                        
                        data[values.key]["teacher_name"]     = values.name
                        data[values.key]["teacher_id"]       = values.teacher_id
                        data[values.key]["phone"]            = values.phone
                        data[values.key]["another_contact"]  = values.another_contact
                        _this.setState({
                            data:data
                        })
					} else {
						_this.sys_error("发生了错误，请检查教号")
					}
                })
                .catch(function (error) {
                    console.log(error);
                })
            } else {
                
            }
        });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    edit_teacher_getForm() {
        let form_data = localStorage.getItem("teacher_form_data")
        if( this.state.submit === false) {
            return <div></div>
        } else {
            form_data = JSON.parse(form_data)
            const { getFieldDecorator } = this.props.form;
            return (
                
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <br/>
                    <h3 align="center">信息修改</h3>
                    <Form.Item>
                        {getFieldDecorator('id', {
                            initialValue: form_data.id,
                        })(
                            <Input
                            type="hidden"
                            placeholder="姓名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('key', {
        
                            initialValue: form_data.key,
                        })(
                            <Input
                            type="hidden"
                            placeholder="姓名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入姓名' },
                                { min:2, message:"教号最短为2位"}
                            ],
                            initialValue: form_data.name,
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
                            initialValue: form_data.teacher_id,
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
                            initialValue: form_data.phone,
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
                            initialValue: form_data.another_contact,
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
    }

    render() {
        const { visible } = this.state;
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '教号',
                dataIndex: 'teacher_id',
                key: 'teacher_id',
                width: '20%',
                ...this.getColumnSearchProps('teacher_id'),
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
            },{
                title: '状态',
                key: '联系人',
                render: (text, record, index)=> 
                <div>
                    <Switch 
                        checkedChildren="启用"
                        unCheckedChildren="禁用"
                        checked={this.state.data[index].status==="1"?true:false}
                        onClick={(checked)=>this.disable_OR_enable(checked, this.state.data[index].key, index)}
                        />
                </div>
            },
            {
                title: '操作',
                key: 'cz',
                render: (text, record, index) => 
                <div>
                    <Popconfirm
                        title="你确定要删除这个账号吗?"
                        onConfirm={()=>this.delete_teacher(record.key, index)}
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
                    <Button 
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
                        </Button>
                </div>
            }
        ];
        return (
            
            <div>
                <Modal
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    mask={false}
                    footer={null}
                >
                    {this.edit_teacher_getForm()}
                </Modal>
                <br/>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        )
    }
}
export default Form.create()(TeacherList);