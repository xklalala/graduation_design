import React from 'react'
import {Timeline} from 'antd'
import {Link} from 'react-router-dom'
class TeacherSetItem extends React.Component {
    render() {
        let url = "/teacher/setItem/2020"
        return (
            <div>
                <Timeline>
                    <Timeline.Item><Link to={url}>2020 届</Link></Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
            </div>
        )
    }
}
export default TeacherSetItem