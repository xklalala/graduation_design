import React from 'react'
import Axios from 'axios'
import MConfig from '../../../config'
import getFormdata from '../../../public/js/getFormData'
import {Tag, Table, Row, Input, Col, Select} from 'antd'
  const { Option } = Select;


class XtuXt extends React.Component {
    state = {
        searchCondition: [],
		data:null,
		search: false,
		origin:null
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
	  this.preparationCondition()
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
				data:response.data.data,
				origin:response.data.data
              })
                
            } else {
              
            }
        })
        .catch(function (error) {
            console.log(error);
        })
	}
	
	isSearch = () => {
		let _searchCondition = this.state.searchCondition
		for (let i in _searchCondition) {
			if(_searchCondition[i].length != 0) {
				return true
			}			
		}
		return false
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
	}
    showSearch = ()=> {
        
	}
	//选题类型
	search_type = (value) => {
		let search_arr  = []
		for(let i in value) {
		  search_arr.push(value[i])
		}
		let _searchCondition = this.state.searchCondition
		_searchCondition.search_type = search_arr
		this.setState({
		  searchCondition:_searchCondition
		})
		this.preparationCondition()
	}
	//条件筛选
	preparationCondition = () => {
		if(this.isSearch()) {//如果需要搜索
			console.log(this.state.searchCondition)
			console.log("issearch")
			console.log(this.isSearch())
			let condition = this.state.searchCondition
			let _data = this.state.origin
			// console.log(_data)
			let result = []
			//   1. 标题搜索
			console.log(condition)
			if (!this.isEmpty(condition.title)) {
				
				var reg = new RegExp(condition.title)
				for (let i in _data) {
					if (_data[i].title.match(reg)) {
						result.push(_data[i])
					}
				}
			} else {
				result = _data
			}
			
			
			//   2. 姓名搜索
			if ( !this.isEmpty(condition.teacher_name)) {
				var reg = new RegExp(condition.teacher_name)

				let result2 = []
				for (let i in result) {
					if (result[i].teacher_name.match(reg)) {
						result2.push(result[i])
					}
				}
				result = result2
			}

			// 3.选题难度
			
			if(!this.isEmpty(condition.search_hard) && condition.search_hard.length > 0){
				let result3 = []
				for (let i in result) {
					if (condition.search_hard.includes(result[i].hard)) {
						result3.push(result[i])
					}
				}
				result = result3
			}

			//  4. 选题类型
			if (!this.isEmpty(condition.search_type)) {
				let result4 = []
				for (let i in result) {
					if (condition.search_type.includes(result[i].xt_type)) {
						result4.push(result[i])
					}
				}
				result = result4
			}
			
			this.setState({
				data:result
			})
		}else {
			let origin = this.state.origin
			this.setState({
				data: origin
			})
		}
		// console.log(result)
	}
	isEmpty = (obj) => {
		if(typeof obj == "undefined" || obj == null || obj == ""){
			return true;
		}else{
			return false;
		}
	}
	stuSelectXt = (id) => {
		let _this = this
        Axios.defaults.headers.common["token"] = localStorage.getItem("token");
        Axios.put(
            MConfig.request_url + '/stu/xt/'+id, 
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
			  render: (text) => (
				<span>
				  <a  onClick={()=>this.stuSelectXt(text.id)}>选择</a>
				</span>
			  ),
			},
		  ];
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