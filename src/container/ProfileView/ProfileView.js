import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    Switch,
    Route,
    NavLink,
    Redirect,
    withRouter
} from "react-router-dom";
import './profileView.scss'
import HolidayProfile from "../../components/HolidayProfile/HolidayProfile";
import CommonRouting from '../../components/common/CommonRouting/CommonRouting'

const routes = [
    {
        path: "/holidayProfile",
        exact: false,
        main: () => <HolidayProfile/>,
        name: "Holiday",
        class_name: 'holiday',
    },
    {
        path: "/workingDayProfile",
        main: () => 'Working Day Profile Component',
        name: "Working Day",
        class_name: 'working-day'
    },
]

class ProfileView extends Component {
    render() {
        return (
            <div className={'profile-view'}>
                <div className={'profile-view-wrap'}>
                    <CommonRouting routes={routes} leftPanelTitle={'Profiles'}/>
                </div>
            </div>
        )
    }
}

export default ProfileView