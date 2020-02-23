import React from 'react'
import { Row, Button } from 'antd'
import StudentYearPanel from './yearpanel'
class Student extends React.Component {
    
    render() {
        
        return (
            <div>
                <Row>
                    <Button>按钮</Button>
                    
                </Row>
                <br/>
                <Row>
                    <StudentYearPanel />
                </Row>
            </div>
        )
    }
}

export default Student