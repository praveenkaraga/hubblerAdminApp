import React, {Component} from 'react';
import DefaultImageMale from '../../../images/profile-male.svg'
import DefaultImageFemale from '../../../images/profile-female.svg'
import {Tabs} from 'antd';
import Personal from './Personal'
import Organization from './Organization'
import Apps from './Apps'
import map from "lodash/map";
import AppsProfileTemplate from "./AppsProfileTemplate";

const {TabPane} = Tabs;


class UserInfoSliderContent extends Component {
    componentDidMount() {
    }

    render() {
        function callback(key, getTeamViewOrgData, userId,changeLoaderStatus) {
            if (key === 'organization') {
                changeLoaderStatus(true)
                getTeamViewOrgData(userId)
            }
        }

        const {teamUserData, userId, onCloseFunction, getTeamViewOrgData, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count, clickedMemberData, contentLoader,changeLoaderStatus} = this.props
        return (
            <div className={'user-info-slider-content'} key={userId}>
                <div className={'user-details-header-content'}>
                    <div className={'user-info-slider-close'} onClick={() => onCloseFunction(false)}></div>
                    <div className={'edit-button'}>Edit</div>
                </div>
                <div className={'user-profile-hold'}>
                    {clickedMemberData ? <div className={'user-profile-details'}>
                        {clickedMemberData ? clickedMemberData.profile_image ?
                            <div className={'user-icon'}
                                 style={{backgroundImage: `url(${clickedMemberData.profile_image.thumbnail})`}}></div>
                            : clickedMemberData.gender === 'female' ? <div className={'user-template-icon'}
                                                                           style={{backgroundImage: `url(${DefaultImageFemale})`}}></div> :
                                <div className={'user-icon'}
                                     style={{backgroundImage: `url(${DefaultImageMale})`}}></div>
                            : ''}
                        <div className={'user-name'}>{clickedMemberData.firstname} {clickedMemberData.lastname}</div>
                        <div
                            className={'user-designation'}>{clickedMemberData.designations ? clickedMemberData.designations.length ? clickedMemberData.designations[0].name : '' : ''}</div>
                        {/*<div className={'user-location'}>Location : Bangalore</div>*/}
                    </div> : ''}

                </div>
                <div className={'user-details-content'}>
                    <Tabs defaultActiveKey="personal"
                          onChange={(key) => callback(key, this.props.getTeamViewOrgData.bind(this), userId ,changeLoaderStatus.bind(this))}
                          className={'user-slider-tab'}>
                        <TabPane tab="Personal" key="personal">
                            {contentLoader ? <div className={'content-loader'}></div> : <div className={'tab-content'}>
                                <Personal teamUserData={teamUserData} userId={userId}/>
                            </div>}
                        </TabPane>
                        <TabPane tab="Organization" key="organization">
                            <div className={'tab-content'}>
                                {contentLoader ? <div className={'content-loader'}></div> : <div className={'tab-content'}>
                                    <Organization userId={userId} getTeamViewOrgData={getTeamViewOrgData}
                                                  clickedUserOrgManagerData={clickedUserOrgManagerData}
                                                  clickedUserOrgReporteesData={clickedUserOrgReporteesData}
                                                  total_Count={total_Count}/>
                                </div>}

                            </div>
                        </TabPane>
                        <TabPane tab="Apps" key="apps">
                            <div className={'tab-content'}>
                                <Apps teamUserData={teamUserData} userId={userId}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Profiles" key="profiles">
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
