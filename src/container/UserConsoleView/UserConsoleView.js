import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, createActiveLink } from '../../store/actions/actions'
import Console from '../../components/console/Console'
import TeamView from '../../components/teamView/TeamView'
import Departments from '../../components/departments/departments'
import Designations from '../../components/designations/designations'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
} from "react-router-dom";
import './userConsoleView.scss'


const routes = [
    {
        path: "/console",
        exact: true,
        main: () => <Console />,
        name: 'Console',
        link_name: 'console',
        class_name: 'console'
    },
    {
        path: "/teamView",
        main: () => <TeamView />,
        name: 'Team View',
        link_name: 'teamView',
        class_name: 'team-view'
    },
    {
        path: "/departments",
        main: () => <Departments />,
        name: 'Departments',
        link_name: 'departments',
        class_name: 'departments'
    },
    {
        path: "/designations",
        main: () => <Designations />,
        name: 'Designations',
        link_name: 'designations',
        class_name: 'designations'
    },
];

class UserConsoleView extends Component {

    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.createActiveLink(window.location.pathname.substr(1))
    }

    render() {

        const { activeLinkName } = this.props.firstReducer
        return (
            <div className={'user-console-view'}>
                <Router>
                    <div className={'user-console-view-wrap'}>
                        <div className={'left-panel'}>
                            <div className={'people'}>People</div>
                            <div className={'nav-link-wrap'}>
                                {routes.map((route, index) => (
                                    <NavLink
                                        to={`/people${route.path}`}
                                        className={`nav-link ${activeLinkName === route.link_name ? `link-active ${route.class_name}-link-active` : `list-item ${route.class_name}-link`}`}
                                        key={index}
                                        activeClassName={'nav-link-active'}
                                        onClick={() => this.props.createActiveLink(route.link_name)}>{route.name}
                                    </NavLink>
                                ))}
                            </div>

                        </div>

                        <div className={'route-wrap'}>
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={`/people${route.path}`}
                                        exact={route.exact}
                                        children={<route.main />}
                                    />
                                ))}
                            </Switch>
                        </div>
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
            getUserData,
            createActiveLink
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConsoleView);


