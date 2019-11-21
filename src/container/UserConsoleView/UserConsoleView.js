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
} from "react-router-dom";
import './userConsoleView.scss'


const routes = [
    {
        path: "/",
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


    componentDidMount() {
        this.props.getUserData()
    }

    render() {

        const {activeLinkName} = this.props.firstReducer
        return (
            <div className={'user-console-view'}>
                <Router>
                    <div className={'user-console-view-wrap'}>
                        <div className={'left-panel'}>
                            <div className={'people'}>People</div>
                            <ul style={{listStyleType: "none", padding: 0}}>
                                <li className={`${activeLinkName === 'console' ? `link-active console-link-active` : `list-item console-link` }`} onClick={()=>this.props.createActiveLink("console")}>
                                    <NavLink to="/console" className={'nav-link'} activeClassName={'nav-link-active'}>Console</NavLink>
                                </li>
                                <li className={`${activeLinkName === 'teamView' ? `link-active team-view-link-active`  : `list-item team-view-link` }`} onClick={()=>this.props.createActiveLink("teamView")}>
                                    <NavLink to="/teamView" className={'nav-link'} activeClassName={'nav-link-active'}>Team View</NavLink>
                                </li>
                                <li className={`${activeLinkName === 'departments' ? `link-active departments-link-active` : `list-item departments-link` }`} onClick={()=>this.props.createActiveLink("departments")}>
                                    <NavLink to="/departments" className={'nav-link'} activeClassName={'nav-link-active'}>Departments</NavLink>
                                </li>
                                <li className={`${activeLinkName === 'designations' ? `link-active designations-link-active`  : `list-item designations-link` }`} onClick={()=>this.props.createActiveLink("designations")}>
                                    <NavLink to="/designations" className={'nav-link'} activeClassName={'nav-link-active'}>Designations</NavLink>
                                </li>
                            </ul>

                        </div>

                        <div style={{flex: 1, padding: "10px"}}>
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


