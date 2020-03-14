import React from 'react'
import {Timeline, message} from 'antd'
import {Link} from 'react-router-dom'
import MConfig from '../../../config'
import Axios from 'axios'
class TeacherSetItem extends React.Component {
    state = {
        data: null
    }

sys_success = (msg) => {
    message.success(msg)
}
sys_error = (msg) => {
    message.error(msg)
}

componentDidMount() {
    Axios.defaults.headers.common["token"] = localStorage.getItem("token");
    Axios.get(
        MConfig.request_url + '/tea/getStuYearList', 
    )
    .then((response) => {
        if (response.data.code === 10001) {
            this.setState({
                data:response.data.data
            })
        } else {
            message.error("网络错误，请重试")
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
        let url = "/teacher/setItem/" + data[i].year
        arr.push(
            <Timeline.Item key={i}><Link to={url}>{data[i].year} 届</Link></Timeline.Item>
        )
    }
    return arr
}
render() {
        return (
            <div>
                <h2 text-align="center">选题管理(请选择毕业年份)</h2>
                <Timeline>
                    {this.showItem()}
                </Timeline>
            </div>
        )
    }
}
export default TeacherSetItem