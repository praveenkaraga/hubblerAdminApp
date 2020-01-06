import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData, createActiveLink, getCirclesData, getCustomFields } from '../../store/actions/actions'
import Console from '../../components/console/Console'
import TeamView from '../../components/teamView/TeamView'
import Departments from '../../components/departments/Departments'
import Designations from '../../components/designations/designations'
import CustomDropdown from '../../components/common/CustomDropdown/customDropdown'
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
        this.state = {
            clickValue: false
        }
    }



    componentDidMount() {
        this.props.createActiveLink(window.location.pathname.substr(1))
        this.props.getCirclesData()
        this.props.getCustomFields()
    }

    onPanelSearch = (e, type) => {
        const searchData = e.target.value
        if (type === "circles") {
            console.log(searchData, "circles")
        } else {
            console.log(searchData, "fields")
        }

    }

    onSinglePanelClick = (data, type) => {
        if (type === "circles") {
            console.log(data, "circles")
        } else {
            console.log(data, "fields")
        }
    }

    render() {

        const { activeLinkName } = this.props.firstReducer
        const { circlesData, customFieldsData } = this.props.userConsoleMainReducer
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

                            <CustomDropdown panelDataype="circles" searchPlaceHolder={"Search Circles"} panelData={circlesData} onSearch={(e) => this.onPanelSearch(e, "circles")}
                                onSinglePanelClick={(data) => this.onSinglePanelClick(data, "circles")} headingName={"Circles"} />

                            <CustomDropdown panelDataype="fields" searchPlaceHolder={"Search Fields"} panelData={customFieldsData} onSearch={(e) => this.onPanelSearch(e, "fields")}
                                onSinglePanelClick={(data) => this.onSinglePanelClick(data, "fields")} headingName={"Custom Fields"} />

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
        firstReducer: state.firstReducer,
        userConsoleMainReducer: state.userConsoleMainReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUserData,
            createActiveLink,
            getCirclesData,
            getCustomFields
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConsoleView);


