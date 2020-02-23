import React from 'react'
import { Collapse, List, Button } from 'antd';
class YearPanel extends React.Component {
    callback = (key)=> {
        console.log(key);
      }
    render() {
        const { Panel } = Collapse;
        const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const data = [
    '学生数量：290',
    '理论选题：150',
    '系统类型选题：140',
    '困难选题：50',
    '中等选题：150',
    '简单选题：90'
  ];
        return (
            
            <div>
                <Collapse onChange={this.callback}>
                        <Panel header="2020届选题" key="1">
                            <List
                                size="small"
                                header={<Button>查看详情</Button>}
                                bordered
                                dataSource={data}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </Panel>
                        <Panel header="2019届选题" key="2">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="2018届选题" key="3">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="4">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="5">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="6">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="7">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="8">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="9">
                            <p>{text}</p>
                        </Panel>

                    </Collapse>
            </div>
        )
    }
}
export default YearPanel