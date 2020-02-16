import React from 'react'
import {Form, Switch, Col, Row, Card, Icon} from 'antd'
import Axios from 'axios'
import MConfig from '../../config'
import getFormdata from '../../public/js/getFormData'
import { message } from 'antd';

class SysConfig extends React.Component {

    setSysEntrySuccess = () => {
        message.success("设置成功")
    }
    setSysEntryError = () => {
        message.error("系统发生错误")
    }

    constructor(props) {
        super(props);
        this.state={
            teaStatus:false,
            stuStatus:false,
        }
    
    }
    componentDidMount() {
        let teaStatus
        let stuStatus
        let _this = this
        Axios.get(
            MConfig.request_url + '/admin/getTeaAndStuStatus', 
        )
        .then(function (response){
            console.log(response.data.code)
            if (response.data.code === 10001) {
                teaStatus = response.data.data.TEACHER_ENTRY==="true"?true:false
                stuStatus = response.data.data.STUDENT_ENTRY==="true"?true:false
                console.log(teaStatus)
                console.log(stuStatus)
                _this.setState({
                    teaStatus:teaStatus,
                    stuStatus:stuStatus,
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    stuOnChange = (checked) => {
        this.setState({
            stuStatus:checked,
        })
        let self = this
        console.log(checked)
        let data = getFormdata({
            status: checked
        })
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.post(
            MConfig.request_url + '/admin/setStuEntry', 
            data
        )
        .then(function (response){
           console.log(response)
           self.setSysEntrySuccess()
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    teaOnChange = (checked) => {
        this.setState({
            teaStatus:checked,
        })
        let data = getFormdata({
            status: checked
        })
        let self = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.post(
            MConfig.request_url + '/admin/setTeaEntry', 
            data
        )
        .then(function (response){
           if (response.data.code === 10001) {
               self.setSysEntrySuccess()
           } else {
               self.setSysEntryError()
           }
           
        })
        .catch(function (error) {
            console.log(error);
        })


    }
    render() {
        return (
            <div>
                <Row>
                <Col span={2}></Col>
                    <Col span={8}>
                        <Card title="系统开启状态" bordered={true}>
                            <Row>
                                教师系统： &nbsp;
                                <Switch
                                    checkedChildren={<Icon type="check" />}
                                    unCheckedChildren={<Icon type="close" />}
                                    checked={this.state.teaStatus}
                                    onChange={this.teaOnChange}
                                />
                            </Row>
                            <br/>
                            <Row>
                                学生系统： &nbsp;
                                <Switch
                                        checkedChildren={<Icon type="check" />}
                                        unCheckedChildren={<Icon type="close" />}
                                        checked={this.state.stuStatus}
                                        onChange={this.stuOnChange}
                                    />
                                </Row>
                        </Card>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8}>
                        <Card title="公钥私钥" bordered={true}>
                            公钥私钥上次更换时间为：2020-02-16<br/>
                            <a>点击此处</a>可更新公钥私钥
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Form.create()(SysConfig);