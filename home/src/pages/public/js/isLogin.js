import React from 'react'
import {withRouter} from "react-router-dom";
import { message } from 'antd';

class IsLogin extends React.Component {
    errorMessage = () => {
        message.error('请登录')
    }
    render() {
        if ( localStorage.getItem("token") === null ) {
            this.errorMessage()
            return (
                <div>
                    {this.props.history.push("/login")}
                </div>
            )
        }
        return (
            <div>

            </div>
        )
    }
}
export default withRouter(IsLogin);