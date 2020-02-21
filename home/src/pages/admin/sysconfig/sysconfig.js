import React from 'react'
import {Form, Switch, Col, Row, Card, Icon} from 'antd'
import Axios from 'axios'
import MConfig from '../../config'
import getFormdata from '../../public/js/getFormData'
import { message } from 'antd';

class SysConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            teaStatus:false,
            stuStatus:false,
        }
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
                            <a onClick={this.updateSecretKey}>点击此处</a>可更新公钥私钥<br/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
    setSysEntrySuccess = () => {
        message.success("设置成功")
    }
    setSysEntryError = (msg) => {
        message.error(msg)
    }
    authError = (msg) => {
        message.error(msg)
    }
    componentDidMount() {
        let teaStatus
        let stuStatus
        let _this = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(
            MConfig.request_url + '/admin/getTeaAndStuStatus', 
        )
        .then(function (response){
            if (response.data.code === 10001) {
                teaStatus = response.data.data.TEACHER_ENTRY==="true"?true:false
                stuStatus = response.data.data.STUDENT_ENTRY==="true"?true:false
                _this.setState({
                    teaStatus:teaStatus,
                    stuStatus:stuStatus,
                })
            } else {
                _this.authError(response.data.message)
                localStorage.clear()
                return
            }
        })
        .catch(function (error) {
        })
    }
    stuOnChange = (checked) => {
        this.setState({
            stuStatus:checked,
        })
        let self = this
        let data = getFormdata({
            status: checked
        })
        Axios.post(
            MConfig.request_url + '/admin/setStuEntry', 
            data
        )
        .then(function (response){
            if (response.data.code === 10001) {
                self.setSysEntrySuccess()
            } else {
                self.setSysEntryError(response.data.message)
            }
        })
        .catch(function (error) {
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
        Axios.post(
            MConfig.request_url + '/admin/setTeaEntry', 
            data
        )
        .then(function (response){
           if (response.data.code === 10001) {
               self.setSysEntrySuccess()
           } else {
               self.setSysEntryError(response.data.message)
           }
           
        })
        .catch(function (error) {
        })
    }
    updateSecretKey = ()=> {
        let self = this
        Axios.get(
            MConfig.request_url + '/admin/updateSecretKey', 
        )
        .then(function (response){
           if (response.data.code === 10001) {
               self.setSysEntrySuccess()
           } else {
               self.setSysEntryError()
           }
           
        })
        .catch(function (error) {
        })
    }
}
export default Form.create()(SysConfig);