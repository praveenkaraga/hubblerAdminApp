import React, {Component} from 'react';
import DefaultImageMale from '../../../images/profile-male.svg'
import DefaultImageFemale from '../../../images/profile-female.svg'
import {Tabs} from 'antd';
import Personal from './Personal'
import Organization from'./Organization'
import Apps from './Apps'
import map from "lodash/map";
import AppsProfileTemplate from "./AppsProfileTemplate";

const {TabPane} = Tabs;


class UserInfoSliderContent extends Component {
    componentDidMount() {
    }

    render() {
        function callback(key) {
            console.log(key);
        }

        const {teamUserData,userId,onCloseFunction} = this.props
        return (
            <div className={'user-info-slider-content'}>
                <div className={'user-details-header-content'}>
                    <div className={'user-info-slider-close'} onClick={() => onCloseFunction(false)}></div>
                    <div className={'edit-button'}>Edit</div>
                </div>
                <div className={'user-profile-hold'}>
                    {teamUserData ? <div className={'user-profile-details'}>

                        {teamUserData ? teamUserData.profile_image ?
                            <div className={'user-icon'}
                                 style={{backgroundImage: `url(${teamUserData.profile_image.thumbnail})`}}></div>
                            : teamUserData.gender === 'female' ? <div className={'user-template-icon'}
                                                                      style={{backgroundImage: `url(${DefaultImageFemale})`}}></div> :
                                <div className={'user-icon'}
                                     style={{backgroundImage: `url(${DefaultImageMale})`}}></div>
                            : ''}
                        <div className={'user-name'}>{teamUserData.firstname} {teamUserData.lastname}</div>
                        <div className={'user-designation'}>{teamUserData.designations ? teamUserData.designations.length ? teamUserData.designations[0].name : '' : ''}</div>
                        {/*<div className={'user-location'}>Location : Bangalore</div>*/}
                    </div> : ''}

                </div>
                <div className={'user-details-content'}>
                    <Tabs defaultActiveKey="1" onChange={callback} className={'user-slider-tab'}>
                        <TabPane tab="Personal" key="personal" >
                            <div className={'tab-content'}>
                               <Personal teamUserData={teamUserData} userId={userId}/>
                            </div>

                        </TabPane>
                        <TabPane tab="Organization" key="organization">
                            <div className={'tab-content'}>
                               <Organization userId={userId}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Apps" key="apps">
                            <div className={'tab-content'}>
                               <Apps teamUserData={teamUserData} userId={userId}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Profiles" key="profiles" >
                            <div className={'tab-content'}>
                                <div className={'app-profile-wrap'}>
                                    {map(teamUserData ? teamUserData.profiles : [], ele =>
                                        <AppsProfileTemplate data={ele}/>)}
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>


            </div>
        )
    }
}

export default UserInfoSliderContent
