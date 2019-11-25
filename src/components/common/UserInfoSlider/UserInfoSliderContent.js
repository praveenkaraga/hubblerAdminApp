import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import DefaultImageMale from '../../../images/profile-male.svg'
import DefaultImageFemale from '../../../images/profile-female.svg'
import { Tabs } from 'antd';
const { TabPane } = Tabs;


class UserInfoSliderContent extends Component {
    componentDidMount() {
    }

    render() {
        function callback(key) {
            console.log(key);
        }


        return (
            <div className={'user-info-slider-content'}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

export default UserInfoSliderContent
