import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Row, Col, Card, Modal, Form, Input, Select , Popconfirm, message, Table} from 'antd'
import MConfig from '../../../config'
import getFormdata from '../../../public/js/getFormData'
import Axios from 'axios'
const { TextArea } = Input

  
class XtDetail extends React.Component {
    state = {
        data: null,
        visible: false,
        editVisible:false,
        selectStudentVisible:false,
        StuInfoVisible: false,
        selectStuList:null,
        StuInfo: {
            name: "",
            id: "",
            cname: "",
            phone: "",
            another: ""
        },
        tempdata: {
            title:"",
            xt_type:"应用实践",
            hard:"简单",
            describe:""
        },
    }
    sys_success = (msg) => {
        message.success(msg)
    }
    sys_error = (msg) => {
        message.error(msg)
    }
    confirm = (id, index)=> {
        console.log(id, index);
        let _data = this.state.data
        let _this = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.delete(MConfig.request_url + '/tea/xt/'+id, )
        .then(function (response) {
            if (response.data.code === 10001) {
                _this.sys_success("删除成功");
                _data.splice(index, 1)
                _this.setState({
                    data:_data
                })
            } else if (response.data.code === 10008) {
                _this.sys_error(response.data.data.msg)
            }else {
                _this.sys_error("网络错误，请重试")
            }
        })
        .catch(function (error) {
                console.log(error);
        }) 
    }
    cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }
    componentDidMount() {
        let _this = this

        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(MConfig.request_url + '/tea/xt/'+this.props.match.params.year, )
        .then(function (response) {
            console.log(response.data)

            if (response.data.code === 10001) {
                let res  = []
                for(let i in response.data.data) {
                    res.push(response.data.data[i])
                }
                _this.setState({
                    data: res
                })
            }
             else {
                _this.sys_error("网络错误，请重试")
            }
        })
        .catch(function (error) {
                console.log(error);
        }) 
    }
    handleCancel = () => {
		this.setState({ visible: false });
    }
    editHandleCancel = () => {
		this.setState({ editVisible: false });
    }
    edit = (id, index) => {
        console.log("edit")
        console.log(id)
        let _data = this.state.data[index]
        this.setState({
            editVisible:true,
            tempdata: _data
        })
    }
    selectStu_handleOk = () => {
        this.setState({
            selectStudentVisible:false
        })
    }
    selectStu_show =  (id) => {
        console.log(id)
        let _this = this

        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(MConfig.request_url + '/tea/xt/'+this.props.match.params.year+'/'+id, )
        .then(function (response) {
            console.log(response.data)
            if (response.data.code === 10001) {
                _this.setState({
                    selectStuList:response.data.data
                })
            } else {
                _this.sys_error("网络错误，请重试")
            }
        })
        .catch(function (error) {
                console.log(error);
        }) 



        this.setState({
            selectStudentVisible:true
        })
    }
    selectStu_handleCancel = () => {
        this.setState({
            selectStudentVisible:false
        })
    }
    showStuInfo = (i) => {
        let _data = this.state.data
        console.log(_data[i])
        let stuinfo = {
            name: _data[i].student_name,
            id: _data[i].student_id,
            cname: _data[i].student_class_name,
            phone: _data[i].phone,
            another: _data[i].another_contact
        }
        this.setState({
            StuInfoVisible:true,
            StuInfo: stuinfo
        })
    }
    showCard = () => {
        let card = []
        let _data = this.state.data
        if (_data != null) {
            for (let i in _data) {
                card.push(
                    <Col span={8} key={i}>
                        <Card 
                                    size="small"
                                    title= {_data[i].title}
                                    extra={
                                        <span>
                                            <a onClick={()=>this.edit(_data[i].id, i)}>修改</a> |  
                                        <Popconfirm
                                        title="你确定要删除这个选题吗（当有学生选择后无法删除）?"
                                        onConfirm={ () =>this.confirm(_data[i].id, i)}
                                        onCancel={this.cancel}
                                        okText="是"
                                        cancelText="否"
                                        >
                                            <a href="#"> 删除</a>
                                        </Popconfirm>
                                        </span>
                                        } style={{ width: 300 }}>
                                            {console.log(_data[i].status )}
                            <p><b>选题类型：</b>{_data[i].xt_type}</p>
                            <p><b>选题难度：</b>{_data[i].hard}</p>
                            <p><b>选题学生：</b>{_data[i].status ==="0"?<a onClick={()=>this.selectStu_show(_data[i].id)}>待选择（点击查看）</a>:<a onClick={()=>this.showStuInfo(i)}>{_data[i].student_name}</a>}</p>
                            <p><b>选题描述：</b>{_data[i].describe}</p>
                        </Card>
                        <br/>
                    </Col>
                )
            }
            return card
        } else {
            return null
        }
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                console.log("success")
                let _this = this
                let send = getFormdata({
                    title: values.title,
                    type: values.type,
                    hard: values.hard,
                    describe: values.describe
                })
                Axios.defaults.headers.common["token"] = localStorage.getItem("token");
                Axios.post(
                    MConfig.request_url + '/tea/xt/'+this.props.match.params.year, 
                    send
                )
                .then(function (response) {
                    console.log(response.data)
                    if (response.data.code === 10001) {
                        _this.setState({
                            visible:false
                        })
                        _this.sys_success("添加成功")
                        setTimeout(() => {
                            window.location.reload()
                        }, 50);
                        
                    } else {
                        _this.sys_error("网络错误，请重试")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        });
    };
    editHandleSubmit = e => {
        console.log("editsubmit")
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
			
            }
        });
    };
    selectStu_confirm = (value) => {
        console.log(value)
        let _this = this
        let send = getFormdata({
            id: value.id,
            xt_id: value.xt_id,
        })
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
                Axios.post(
                    MConfig.request_url + '/tea/selectStu', 
                    send
                )
                .then(function (response) {
                    console.log(response.data)
                    if (response.data.code === 10001) {
                        _this.sys_success("ok")
                        setTimeout(() => {
                            window.location.reload()
                        }, 50);
                    } else {
                        _this.sys_error("网络错误，请重试")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
    }
    StuInfo_handleOk = () => {
        this.setState({
            StuInfoVisible: false
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
              title: '姓名',
              dataIndex: 'student_name',
              key: 'student_name',
            },
            {
              title: '班级',
              dataIndex: 'student_class_name',
              key: 'student_class_name',
            },
            {
              title: '学号',
              dataIndex: 'student_id',
              key: 'student_id',
            },
            {
              title: '操作',
              key: 'action',
              render: (text) => (
                    <Popconfirm
                        title="你确定要选择该学生吗？"
                        onConfirm={()=>this.selectStu_confirm(text)}
                        okText="Yes"
                        cancelText="No"
                    >
                    <a href="#">选择</a>
                </Popconfirm>
              ),
            },
          ];
        return (
            <div>
                         <Modal
                            title="选择学生"
                            visible={this.state.selectStudentVisible}
                            onOk={this.selectStu_handleOk}
                            onCancel={this.selectStu_handleCancel}
                            >
                            <Table columns={columns} dataSource={this.state.selectStuList} />
                        </Modal>
                        <Modal
                            title="学生信息"
                            visible={this.state.StuInfoVisible}
                            onOk={this.StuInfo_handleOk}
                            onCancel={this.StuInfo_handleOk}
                            >
                            <p><b>姓名：</b>{this.state.StuInfo.name}</p>
                            <p><b>班级：</b>{this.state.StuInfo.cname}</p>
                            <p><b>学号：</b>{this.state.StuInfo.id}</p>
                            <p><b>手机号：</b>{this.state.StuInfo.phone}</p>
                            <p><b>其它联系方式：</b>{this.state.StuInfo.another}</p>
                        </Modal>
                <Modal
                    visible={this.state.editVisible}
                    onOk={this.editHandleOk}
                    onCancel={this.editHandleCancel}
                    mask={false}
                    footer={null}
                >
<Form onSubmit={this.editHandleSubmit} className="login-form">
                        <Form.Item label="选题题目">
                            {getFieldDecorator('title', {
                                initialValue:this.state.tempdata.title,
                                rules: [
                                    { required: true, message: '请输入选题' },
                                    { min: 2, message: '最少为2位' },
                                ],
                            })(
                                <Input
                                type="text"
                                placeholder="选题题目"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="选题类型">
                            {getFieldDecorator('type', {
                                initialValue:this.state.tempdata.xt_type
                            })(
                                <Select>
                                    <Select.Option value="应用实践">应用实践</Select.Option>
                                    <Select.Option value="理论研究">理论研究</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="选题难度">
                            {getFieldDecorator('hard', {
                                initialValue:this.state.tempdata.hard
                            })(
                                <Select>
                                    <Select.Option value="简单">简单</Select.Option>
                                    <Select.Option value="中等">中等</Select.Option>
                                    <Select.Option value="困难">困难</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="选题描述">
                            {getFieldDecorator('describe', {
                                initialValue:this.state.tempdata.describe
                            })(
                                <TextArea
                                rows={4}
                                cols={4}
                                placeholder="选题题目"
                                />,
                            )}
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            确定
                        </Button>
                        &nbsp;
                        <Button key="back" onClick={this.editHandleCancel}>
                            取消
                        </Button>,
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    mask={false}
                    footer={null}
                >
                    <h3 align="center">新增选题</h3>
                    <br/>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item label="选题题目">
                            {getFieldDecorator('title', {
                                rules: [
                                    { required: true, message: '请输入选题' },
                                    { min: 2, message: '最少为2位' },
                                ],
                            })(
                                <Input
                                type="text"
                                placeholder="选题题目"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="选题类型">
                            {getFieldDecorator('type', {
                                initialValue: "应用实践"
                            })(
                                <Select>
                                    <Select.Option value="应用实践">应用实践</Select.Option>
                                    <Select.Option value="理论研究">理论研究</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="选题难度">
                            {getFieldDecorator('hard', {
                                initialValue: "简单"
                            })(
                                <Select>
                                    <Select.Option value="简单">简单</Select.Option>
                                    <Select.Option value="中等">中等</Select.Option>
                                    <Select.Option value="困难">困难</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="选题描述">
                            {getFieldDecorator('describe', {
                                rules: [
                                  
                                ],
                            })(
                                <TextArea
                                rows={4}
                                cols={4}
                                placeholder="选题题目"
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
                </Modal>
                <Row>
                    <Button type="dashed"><Link to="/teacher/setItem/">返回上一页</Link></Button>
                    &nbsp;
                    <Button type="dashed"
                        onClick={()=>{
                            this.setState({
                                visible: true
                            })
                        }}
                    >新增选题</Button>
                    <br/>
                </Row>
                <Row>
                    <h3>我的课题：</h3>
                </Row>
                   <Row>
                   {this.showCard()}
                   </Row>
            </div>
        )
    }
}
export default Form.create()(XtDetail)