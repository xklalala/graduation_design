import React from 'react'
import Axios from 'axios'
import MConfig from '../../../config'
import getFormdata from '../../../public/js/getFormData'
import { Row, Col , Card, Tag, Popconfirm, message} from 'antd'

class StuXt extends React.Component {
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
        let _this = this
      Axios.defaults.headers.common["token"] = localStorage.getItem("token");
      Axios.get(
          MConfig.request_url + '/stu/xt/self', 
      )
      .then(function (response) {
          console.log(response.data.data)
          if (response.data.code === 10001) {
              _this.setState({
                  data: response.data.data
              })
          } else {
           
          }
      })
      .catch(function (error) {
      })
  }
  confirm = (id, index, status)=> {
      if(status == "1") {
        this.sys_error("对不起，选题已确定，无法删除！")
        return
      }
    console.log(id, index);
    let _this = this
    Axios.defaults.headers.common["token"] = localStorage.getItem("token");
    Axios.delete(MConfig.request_url + '/stu/xt/'+id, )
    .then(function (response) {
        if (response.data.code === 10001) {
            _this.sys_success("删除成功");
            setTimeout(() => {
                window.location.reload()
            }, 50);
        } else {
            _this.sys_error(response.data.data.msg)
        }
    })
    .catch(function (error) {
            console.log(error);
    }) 

}

  showCard = () => {
      let _data = this.state.data
      let res = []
      for(let i in _data) {
          res.push(
          <Col span={8} key={i}>
              <Card title={_data[i].title} extra={ <Popconfirm
                                        title="你确定要删除这个选题吗（当选题状态为确定时无法删除）?"
                                        onConfirm={ () =>this.confirm(_data[i].id, i, _data[i].status)}
                                        onCancel={this.cancel}
                                        okText="是"
                                        cancelText="否"
                                        >
                                            <a href="#"> 删除</a>
                                        </Popconfirm>} style={{ width: 300 }}>
                            <p><b>选题类型：</b>{_data[i].xt_type}</p>
                            <p><b>选题难度：</b>{_data[i].hard}</p>
                            <p><b>出题教师：</b>{_data[i].teacher_name}</p>
                            {_data[i].status==="1"?<p><b>手机号：</b>{_data[i].phone_number}</p>:""}
                            {_data[i].status==="1"?<p><b>其它联系方式：</b>{_data[i].another_contact}</p>:""}
                            <p><b>选题状态：</b>{_data[i].status==="0"?<Tag color="volcano" key="未确定">未确定</Tag>:<Tag color="green" key="已确定">已确定</Tag>}</p>
                            <p><b>选题描述：</b>{_data[i].describe}</p>
            </Card>
          </Col>)
      }
      return res
  }

    render() {
        return (
            <div>
                 <Row>
                     {this.showCard()}
                </Row>
            </div>
           
        )
    }
}
export default StuXt