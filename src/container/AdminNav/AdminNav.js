import React, {Component} from 'react';
import {connect} from "react-redux";
import UserConsoleView from '../UserConsoleView/UserConsoleView'
import ProfileView from '../ProfileView/ProfileView'
import {Drawer} from 'antd';
import 'antd/dist/antd.css';
import './adminNav.scss'
import {bindActionCreators} from "redux";
import {hamburgerIconClick, createActiveLink} from "../../store/actions/PeopleActions/peopleActions";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink, Redirect
} from "react-router-dom";


const routes = [
    {
        path: "/people",
        exact: false,
        main: () => <UserConsoleView/>,
        name: "People",
        class_name: 'people',
    },
    {
        path: "/profile",
        main: () => <ProfileView/>,
        name: "Profiles",
        class_name: 'profile'
    },
    {
        path: "/appStudio",
        main: () => 'App Studio',
        name: "App Studio",
        class_name: 'app-studio'
    },
    {
        path: "/linkApp",
        main: () => 'Link App',
        name: "Link App",
        class_name: 'link-app'
    },
    {
        path: "/webApps",
        main: () => 'Web Apps',
        name: "Web Apps",
        class_name: 'web-apps app-studio'
    },
    {
        path: "/accounts",
        main: () => 'Accounts',
        name: "Accounts",
        class_name: 'accounts'
    },
    {
        path: "/mis",
        main: () => 'MIS',
        name: "MIS",
        class_name: 'mis'
    },
    {
        path: "/tracking",
        main: () => 'Tracking',
        name: "Tracking",
        class_name: 'tracking'
    },
    {
        path: "/social",
        main: () => 'Social',
        name: "Social",
        class_name: 'social'
    },
    /*{
        path: "/leaderBoard",
        main: () => 'Leader Board',
        name: "Leader Board",
        class_name: 'leader-board'
    },
    {
        path: "/settings",
        main: () => 'Settings',
        name: "Settings",
        class_name: 'settings'
    },
    {
        path: "/rolesAndPolicies",
        main: () => 'Roles And Policies',
        name: "Roles And Policies",
        class_name: 'roles-policies'
    },
    {
        path: "/auditTrail",
        main: () => 'Audit Trail',
        name: "Audit Trail",
        class_name: 'audit-trail'
    },*/
];

class AdminNav extends Component {

    render() {
        const {consoleDrawerVisible} = this.props.firstReducer
        return (
            <div className={'admin-nav'}>
                <div className={'admin-nav-header'}>
                    <div className={'hamburger-icon'}
                         onClick={() => this.props.hamburgerIconClick(!consoleDrawerVisible)}></div>
                    <div className={'header-text-hubbler'}>hubbler</div>
                </div>
                <Router>
                    <Drawer
                        className={'admin-drawer'}
                        placement={'left'}
                        closable={false}
                        onClose={() => this.props.hamburgerIconClick(false)}
                        visible={consoleDrawerVisible}>
                        <div className={'admin-main-links'}>
                            {routes.map((route, index) => (
                                <NavLink
                                    className={`admin-link list-item ${route.class_name}-link`}
                                    key={index}
                                    to={route.path}
                                    activeClassName={`${route.class_name}-link-active nav-link-active`}
                                    onClick={() => this.props.hamburgerIconClick(false)}>{route.name}</NavLink>
                            ))}
                            <div className={'powered-by'}>Powered by</div>

                        </div>
                    </Drawer>
                    <div className={'console-main-route-wrap'}>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main/>}/>
                            ))}
                        </Switch>
                    </div>
                </Router>
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
            hamburgerIconClick,
            createActiveLink
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminNav)


{/*<Redirect from={"/mis"} exact to={`https://sandconsole.hubblerapp.com/dashboard/index.html#${"webAppStudioView"}`} />*/
}

