import React from 'react'
import Axios from 'axios'
import MConfig from '../../../config'
import getFormdata from '../../../public/js/getFormData'
class XtuXt extends React.Component {
    componentDidMount() {
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(
            MConfig.request_url + '/stu/xt', 
        )
        .then(function (response) {
            console.log(response.data)
            if (response.data.code === 10001) {
              
                
            } else {
              
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    render() {
        return (
            <div>
                xuanti
            </div>
        )
    }
}
export default XtuXt