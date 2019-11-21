import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUserData, createActiveLink} from '../../store/actions/actions'
import Console from '../../components/console/Console'
import TeamView from '../../components/teamView/TeamView'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    withRouter
} from "react-router-dom";
import './userConsoleView.scss'


const routes = [
    {
        path: "/console",
        exact: true,
        main: () => <Console/>
    },
    {
        path: "/teamView",
        main: () => <TeamView/>
    },
    {
        path: "/departments",
        main: () => <h2>Departments</h2>
    },
    {
        path: "/designations",
        main: () => <h2>Designations</h2>
    },
];

class UserConsoleView extends Component {

    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.getUserData()
        this.props.createActiveLink(window.location.pathname.substr(1))
    }

    render() {

        const {activeLinkName} = this.props.firstReducer
        return (
            <div className={'user-console-view'}>
                <Router>
                    <div className={'user-console-view-wrap'}>
                        <div className={'left-panel'}>
                            <div className={'people'}>People</div>
                            <div className={'nav-link-wrap'}>

                                <NavLink to="/console"
                                         className={`nav-link ${activeLinkName === 'console' ? `link-active console-link-active` : `list-item console-link`}`}
                                         activeClassName={'nav-link-active'}
                                         onClick={() => this.props.createActiveLink("console")}>Console</NavLink>


                                <NavLink to="/teamView"
                                         className={`nav-link ${activeLinkName === 'teamView' ? `link-active team-view-link-active` : `list-item team-view-link`}`}
                                         activeClassName={'nav-link-active'}
                                         onClick={() => this.props.createActiveLink("teamView")}>Team View</NavLink>


                                <NavLink to="/departments"
                                         className={`nav-link ${activeLinkName === 'departments' ? `link-active departments-link-active` : `list-item departments-link`}`}
                                         activeClassName={'nav-link-active'}
                                         onClick={() => this.props.createActiveLink("departments")}>Departments</NavLink>


                                <NavLink to="/designations"
                                         className={`nav-link ${activeLinkName === 'designations' ? `link-active designations-link-active` : `list-item designations-link`}`}
                                         activeClassName={'nav-link-active'}
                                         onClick={() => this.props.createActiveLink("designations")}>Designations</NavLink>

                            </div>

                        </div>

                        <div className={'route-wrap'}>
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={<route.main/>}
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


