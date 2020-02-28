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
import {createActiveLink, hamburgerIconClick} from "../../store/actions/PeopleActions/peopleActions";

import './profileView.scss'
import HolidayProfile from "../../components/Profile/HolidayProfile/HolidayProfile";
import ProfileRouting from '../../components/Profile/profileRouting/profileRouting';
import CommonLandingView from '../../components/Profile/commonLandingView/commonLandingView'

const navLinkRoutes = [
    {
        path: "/holiday",
        exact: false,
        main: <CommonLandingView viewType="holiday"/>,
        name: "Holiday",
        class_name: 'holiday',
        link_name: 'holiday',
    },
    {
        path: "/workingDay",
        main: <CommonLandingView viewType="workingDay"/>,
        name: "Working Day",
        class_name: 'working-day',
        link_name: 'workingDay',
    },
    {
        path: "/leave",
        main: <CommonLandingView viewType="leave"/>,
        name: "Leave",
        class_name: 'leave',
        link_name: 'leave',
    },
    {
        path: "/reimbursement",
        main: <CommonLandingView viewType="reimbursement"/>,
        name: "Reimbursement",
        class_name: 'reimbursement',
        link_name: 'reimbursement',
    },
    {
        path: "/tracking",
        main: <CommonLandingView viewType="tracking"/>,
        name: "Tracking",
        class_name: 'tracking',
        link_name: 'tracking',
    },
]

class ProfileView extends Component {

    createActiveLink = (route) => {
        this.props.createActiveLink(route.link_name)
    };

    render() {
        const {activeLinkName} = this.props.firstReducer;
        return (
            <div className={'profile-view'}>
                <div className={'profile-view-wrap'}>
                    <ProfileRouting navLinkRoutes={navLinkRoutes} leftPanelTitle={'Profile'} activeLinkHandler={this.createActiveLink}
                        activeLinkName={activeLinkName} className={"profile-routing-view"}/>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        firstReducer: state.firstReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            createActiveLink,
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileView)

