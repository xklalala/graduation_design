import React from 'react'
import { Timeline, message, Switch  } from 'antd';
import Axios from 'axios'
import MConfig from '../../../config'
import { Link } from 'react-router-dom';
import getFormdata from '../../../public/js/getFormData'
class YearPanel extends React.Component {
    state = {
        data: null
    }
    sys_error = (msg) => {
        message.error(msg)
    }
    sys_success = (msg) => {
        message.success(msg)
    }
    callback = (key)=> {
        console.log(key);
    }
    
    componentDidMount() {
        let _this = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(
            MConfig.request_url + '/admin/getStuYearList', 
        )
        .then(function (response) {
            console.log(response.data)
            if (response.data.code === 10001) {
                _this.setState({
                    data:response.data.data
                })
            } else {
                _this.sys_error("网络错误，请重试")
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    showItem = () => {
        let arr = []
        let data = this.state.data

        for (let i in data) {
            let url = "/admin/user/stulist/" + data[i].year
            arr.push(
            <Timeline.Item key={i}>
                <Link to={url}>{data[i].year} 届</Link>，学生人数 {data[i].number}; 账号状态：
                <Switch 
                    checkedChildren="启用"
                    unCheckedChildren="禁用"
                    checked={this.state.data[i].status==="1"?true:false}
                    onClick={(checked)=>this.onChange(checked, data[i].id, i)}
                />
            </Timeline.Item>
            )
        }
        return arr
    }
    render() {
        return (
            
            <div>
                <Timeline>
                    {this.showItem()}
                </Timeline>
            </div>
        )
    }
    onChange = (checked, id, index)=> {
        console.log(checked, id, index)
        let _data = this.state.data
        _data[index].status = checked===true?"1":"0"
        
        let send = getFormdata({
            id:     id,
            status: checked===false?"0":"1"
        })
        let _this = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.post(
            MConfig.request_url + '/admin/stuSetStatus', 
            send
        )
        .then(function (response) {
            console.log(response.data)
            if (response.data.code === 10001) {
                _this.sys_success("ok")
                _this.setState({
                    data:_data
                })
            } else {
                _this.sys_error("网络错误，请重试")
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    }
}
export default YearPanel