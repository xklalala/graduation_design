import React from 'react'
import './myheader.less'
import { Link } from 'react-router-dom'
class MyHeader extends React.Component {
    is_login = () => {
        let token = localStorage.getItem('token')
        if (token === null) {
        }
    }
    exitSys = () => {
        localStorage.clear()
    }

    getUserName = () => {
        
        let username = localStorage.getItem("name")
        console.log(username)
        if (username === null) {     
           return null
        } else {
            return (
                <div className="header">
                   欢迎 {username} ，<Link to="/exit">退出系统</Link>
               </div>
           )
        }
    }
    render() {
        return (
            <div>
                {this.getUserName()}
            </div>
        )
    }
}
export default MyHeader