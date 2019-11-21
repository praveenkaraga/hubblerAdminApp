import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUserData} from '../../store/actions/actions'
import Console from '../../components/console/Console'
import TeamView from '../../components/teamView/TeamView'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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
        return (
            <div className={'user-console-view'}>
                <Router>
                    <div className={'user-console-view-wrap'}>
                        <div className={'left-panel'}>
                            <ul style={{listStyleType: "none", padding: 0}}>
                                <li>
                                    <Link to="/">Console</Link>
                                </li>
                                <li>
                                    <Link to="/teamView">Team View</Link>
                                </li>
                                <li>
                                    <Link to="/departments">Departments</Link>
                                </li>
                                <li>
                                    <Link to="/designations">Designations</Link>
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
            getUserData
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConsoleView);


