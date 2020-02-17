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
import CommonRouting from '../../components/common/CommonRouting/CommonRouting'

const routes = [
    {
        path: "/holidayProfile",
        exact: false,
        main: () => <HolidayProfile/>,
        name: "Holiday",
        class_name: 'holiday',
        link_name: 'holiday',
    },
    {
        path: "/workingDayProfile",
        main: () => 'Working Day Profile Component',
        name: "Working Day",
        class_name: 'working-day',
        link_name: 'working-day',
    },
    {
        path: "/leaveProfile",
        main: () => 'Leave Profile Component',
        name: "Leave",
        class_name: 'leave',
        link_name: 'leave',
    },
    {
        path: "/reimbursementProfile",
        main: () => 'Reimbursement Profile Component',
        name: "Reimbursement",
        class_name: 'reimbursement',
        link_name: 'reimbursement',
    },
    {
        path: "/trackingProfile",
        main: () => 'Tracking Profile Component',
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
                    <CommonRouting routes={routes} leftPanelTitle={'Profile'} activeLinkHandler={this.createActiveLink}
                                   activeLinkName={activeLinkName} path={"holidayProfile"}/>
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

