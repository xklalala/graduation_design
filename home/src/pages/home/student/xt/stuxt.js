import React from 'react'
import Axios from 'axios'
import MConfig from '../../../config'
import getFormdata from '../../../public/js/getFormData'

class StuXt extends React.Component {
    componentDidMount() {
        let _this = this
      Axios.defaults.headers.common["token"] = localStorage.getItem("token");
      Axios.get(
          MConfig.request_url + '/stu/xt/self', 
      )
      .then(function (response) {
          console.log(response.data.data)
          if (response.data.code === 10001) {
              
          } else {
            
          }
      })
      .catch(function (error) {
      })
  }
    render() {
        return (
            <div>学生选题</div>
        )
    }
}
export default StuXt