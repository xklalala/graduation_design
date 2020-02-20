import React from 'react'
import { Table, Input, Button, Icon, Switch, Modal, Form, Popconfirm, message } from 'antd';
import Highlighter from 'react-highlight-words';
import MConfig from '../../../config'
// import getFormdata from '../../../public/js/getFormData'
import EditTeacher from './editTeacher'
import Axios from 'axios'
class TeacherList extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data:[],
        loading: false,
        visible: false,
        formData:{}
    };
    
    componentDidMount() {
        let self = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(
            MConfig.request_url + '/teacherlist', 
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
        const _data = this.state.data
        _data[id].status = checked===true?"1":"0"
        this.setState({
            data: _data
        })
    }
    //删除教师
    delete_teacher = (id) => {
        console.log(id)
    }
    //编辑账号
    edit_teacher = (data) => {
        this.setState({
            visible: true,
            formData: data
          });
          localStorage.setItem("teacher_edit_form_data", data)
    }
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
    handleCancel = () => {
        this.setState({ visible: false });
    };
    edit_teacher_getForm(type) {
        if( JSON.stringify(this.state.formData) === "{}") {
            return <div></div>
        } else {
            console.log(this.state.formData)
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
                        initialValue: this.state.formData.name,
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
                        initialValue: this.state.formData.teacher_id,
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
                        initialValue: this.state.formData.phone,
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
                        initialValue: this.state.formData.another_contact,
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
                        checked={this.state.data[record.key].status==="1"?true:false}
                        onClick={(checked)=>this.disable_OR_enable(checked, record.key, index)}
                        />
                </div>
            },
            {
                title: '操作',
                key: 'cz',
                render: (text, record) => 
                <div>
                    <Popconfirm
                        title="你确定要删除这个账号吗?"
                        onConfirm={()=>this.delete_teacher(record.key)}
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