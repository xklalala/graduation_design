import React from 'react'
import {Link} from 'react-router-dom'
import { Button, Row, Col, Card, Modal, Form, Input, Select , Popconfirm, message} from 'antd'
const { TextArea } = Input
class XtDetail extends React.Component {
    state = {
        data: null,
        visible: false
    }
    confirm = (e)=> {
        console.log(e);
        message.success('Click on Yes');
    }
    cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    }
    componentDidMount() {
        let data = [
            {
                id: 1,
                title:"毕业选题系统",
                question_type: "系统",
                hard: "简单",
                student: <Link to="/">待确定</Link>,
                status: "未提交",
                describe:"智能辅助驾驶，智能监控，智能"+
                "机器人等领域。基于统计学习的方法是行人检测的常用方法，即根据大量的样本构建行人检测分类器。"+"提取的特征主要包含目标的灰度、边缘、纹理、颜色、梯度直方图等信息。想要获得较好的检测效果可以采取多特征融合"+
                "的方法以及级联分类器，常用的特征有：Hog特征、LBT特征等。学生通过实现一个基于视频处理行人检测与跟踪系统，一方面该技术拥有很高的实用价值，另"
            },
            {
                id: 2,
                title:"基于JAVA的袜子后台管理系统",
                question_type: "理论研究",
                hard: "中等",
                student: <Link to="/">未名</Link>,
                status: "未提交"
            },
            {
                id: 4,
                title:"小朱哥云盘",
                question_type: "系统",
                hard: "困难",
                student: <Link to="/">狗子根</Link>,
                status: "未提交"
            }
        ]
        this.setState({
            data: data
        })
    }
    handleCancel = () => {
		this.setState({ visible: false });
    }
    showCard = () => {
        let card = []
        let _data = this.state.data
        if (_data != null) {
            for (let i in _data) {
                card.push(
                    <Col span={8} key={_data[i].id}>
                        <Card 
                                    size="small" title="毕业选题系统"
                                    extra={
                                        <span>
                                            <a href="#">修改</a> |  
                                        <Popconfirm
                                        title="你确定要删除这个选题吗（当确定学生后无法删除）?"
                                        onConfirm={this.confirm}
                                        onCancel={this.cancel}
                                        okText="是"
                                        cancelText="否"
                                        >
                                            <a href="#"> 删除</a>
                                        </Popconfirm>
                                        </span>
                                        } style={{ width: 300 }}>
                            <p><b>选题类型：</b>{_data[i].question_type}</p>
                            <p><b>选题难度：</b>{_data[i].hard}</p>
                            <p><b>选题学生：</b>{_data[i].student}</p>
                            <p><b>选题状态：</b>{_data[i].status}</p>
                            <p><b>选题描述：</b>{_data[i].describe}</p>
                        </Card>
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
				
            }
        });
	};
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
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