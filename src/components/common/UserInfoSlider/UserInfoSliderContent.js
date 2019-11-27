import React, {Component} from 'react';
import DefaultImageMale from '../../../images/profile-male.svg'
import DefaultImageFemale from '../../../images/profile-female.svg'
import {Tabs} from 'antd';
import Personal from './Personal'

const {TabPane} = Tabs;


class UserInfoSliderContent extends Component {
    componentDidMount() {
    }

    render() {
        function callback(key) {
            console.log(key);
        }

        const {teamUserData} = this.props
        return (
            <div className={'user-info-slider-content'}>
                <div className={'user-details-header-content'}>
                    <div className={'user-info-slider-close'}></div>
                    <div className={'edit-button'}>Edit</div>
                </div>
                <div className={'user-profile-hold'}>
                    <div className={'user-profile-details'}>
                        <div className={'user-icon'} style={{backgroundImage: `url(${DefaultImageMale})`}}></div>
                        <div className={'user-name'}>Vinay Aggarwal</div>
                        <div className={'user-designation'}>Founder</div>
                        {/*<div className={'user-location'}>Location : Bangalore</div>*/}
                    </div>
                </div>
                <div className={'user-details-content'}>
                    <Tabs defaultActiveKey="1" onChange={callback} className={'user-slider-tab'}>
                        <TabPane tab="Personal" key="personal" >
                            <div className={'tab-content'}>
                               <Personal teamUserData={teamUserData}/>
                            </div>

                        </TabPane>
                        <TabPane tab="Organization" key="organization">
                            <div className={'tab-content'}>
                                Content of Tab Pane 2
                            </div>
                        </TabPane>
                        <TabPane tab="Apps" key="apps">
                            <div className={'tab-content'}>
                                Content of Tab Pane 3
                            </div>
                        </TabPane>
                        <TabPane tab="Profiles" key="profiles" >
                            <div className={'tab-content'}>
                                Content of Tab Pane 4
                            </div>
                        </TabPane>
                    </Tabs>
                </div>


            </div>
        )
    }
}

export default UserInfoSliderContent
