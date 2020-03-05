import React from 'react'
import Axios from 'axios'
import MConfig from '../../../config'
import getFormdata from '../../../public/js/getFormData'
import {Tag, Table, Row, Input, Col, Select} from 'antd'
  const { Option } = Select;
const columns = [
    {
      title: '选题',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '类型',
      dataIndex: 'xt_type',
      key: 'xt_type',
    },
    {
      title: '难度',
      dataIndex: 'hard',
      key: 'hard',
    },
    {
      title: '出题人',
      key: 'teacher_name',
      dataIndex: 'teacher_name',
      // render: tags => (
      //   <span>
      //     {tags.map(tag => {
      //       let color = tag.length > 5 ? 'geekblue' : 'green';
      //       if (tag === 'loser') {
      //         color = 'volcano';
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </span>
      // ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (


        <span>
          {
                    // console.log(text.id)
          }
          <a>选择</a>
        </span>
      ),
    },
  ];

class XtuXt extends React.Component {
    state = {
        searchCondition: [],
        data:null
    }
    search_hard = (value) => {
		let search_arr  = []
		for(let i in value) {
			search_arr.push(value[i])
		}
		let _searchCondition = this.state.searchCondition
		_searchCondition.search_hard = search_arr
		this.setState({
			searchCondition:_searchCondition
		})
      }
    componentDidMount() {
      let _this = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.get(
            MConfig.request_url + '/stu/xt', 
        )
        .then(function (response) {
            console.log(response.data)
            if (response.data.code === 10001) {
              _this.setState({
                data:response.data.data
              })
                
            } else {
              
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    search_question = ( event) => {
        console.log(event.target.value)
		let _searchCondition = this.state.searchCondition
		_searchCondition.title = event.target.value
        this.setState({
            searchCondition:_searchCondition
		})
		this.preparationCondition()
	}
	search_teacher_name = (event) => {
		let _searchCondition = this.state.searchCondition
		_searchCondition.teacher_name = event.target.value
        this.setState({
            searchCondition:_searchCondition
		})
		this.preparationCondition()
		
		console.log(event.target.value)
	}
    showSearch = ()=> {
        
	}
	search_type = (value) => {
		console.log(value)
	}
	preparationCondition = () => {
		let condition = this.state.searchCondition
		console.log(condition)
	}

    render() {
        const children = [];
        return (
            <div>
                <Row>
                    <Col span={5}>
                    <Input 
                    allowClear={true}
                    placeholder="请输入要搜索的题目"
                    onChange={this.search_question}
                    />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={5}>
                    <Input 
                    allowClear={true}
					placeholder="请输入要搜索的姓名"
					onChange={this.search_teacher_name}
                    />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={5}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="选题难度"
                        name = "hard"
                        onChange={this.search_hard}
                    >
                        <Option key="简单">简单</Option>
                        <Option key="中等">中等</Option>
                        <Option key="困难">困难</Option>
                    </Select>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={5}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="选题类型"
                        onChange={this.search_type}
                    >
                        <Option key="应用实践">应用实践</Option>
                        <Option key="理论研究">理论研究</Option>
                    </Select>
                    </Col>
                </Row>
                <Row>
                     <Table columns={columns} dataSource={this.state.data} />
                </Row>
               
            </div>
        )
    }
}
export default XtuXt