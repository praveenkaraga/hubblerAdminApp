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
    NavLink,
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
        path: "/webApps",
        main: () => 'Web Apps',
        name: "Web Apps",
        class_name: 'web-apps'
    },
    {
        path: "/accounts",
        main: () => 'Accounts',
        name: "Accounts",
        class_name: 'accounts'
    },

];

class AdminNav extends Component {

    render() {
        const {consoleDrawerVisible} = this.props.firstReducer
        return (
            <div className={'admin-nav'}>
                <div className={'admin-nav-header'}>
                    <div className={'hamburger-icon'} onClick={() => this.props.hamburgerIconClick(true)}></div>
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
                                    onClick={() => this.props.hamburgerIconClick(false)}>{route.name}</NavLink>
                            ))}
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

