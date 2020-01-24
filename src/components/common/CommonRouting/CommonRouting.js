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
import {
    commonActionForCommonReducer,
    commonDepartmentAction,
    createActiveLink, getAddSelectedUsersPostedData,
    getCirclesData,
    getCustomFields, getDepartmentData,
    getDeptTableColumnData, getTableColumnsData,
    getUserData, patchCommonCreateData
} from "../../../store/actions/actions";
import './commonRouting.scss'
import HolidayProfile from '../../../components/HolidayProfile/HolidayProfile'
import Console from "../../console/Console";
import Departments from "../../departments/Departments";
import Designations from "../../designations/designations";
import CircleOpenView from "../../nodeOpenView/circleOpenView";
import FieldOpenView from "../../nodeOpenView/fieldOpenView";
import ChangeViewRouting from "../ChangeViewRouting/ChangeViewRouting";
import DesignationOpenView from "../../nodeOpenView/designationOpenView";

class CommonRouting extends Component {
    createActiveLink = (route) => {
        this.props.createActiveLink(route.link_name)
    };

    render() {
        const {activeLinkName} = this.props.firstReducer;
        const {routes, leftPanelTitle} = this.props;
        let leftPanelTitleToLower = leftPanelTitle.toLowerCase();
        return (
            <div className={'common-routing-view'}>
                <div className={'common-routing-view-wrap'}>
                    <div className={'left-panel'}>
                        <div className={leftPanelTitleToLower}>{leftPanelTitle}</div>
                        <div className={'nav-link-wrap'}>
                            {routes.map((route, index) => (
                                    <NavLink
                                        to={`/${leftPanelTitleToLower}${route.path}`}
                                        className={`nav-link ${activeLinkName === route.link_name ? `link-active ${route.class_name}-link-active` : `list-item ${route.class_name}-link`}`}
                                        key={index}
                                        activeClassName={'nav-link-active'}
                                        onClick={() => this.createActiveLink(route)}>{route.name}</NavLink>))
                            }
                        </div>
                    </div>
                    <div className={'route-wrap'}>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={`/${leftPanelTitleToLower}${route.path}`}
                                    exact={route.exact}
                                    component={route.main}/>
                            ))}
                            <Route exact path={`/${leftPanelTitleToLower}`}>
                                <Redirect to={`${leftPanelTitleToLower}/holidayProfile`}/>
                            </Route>
                            <Route exact path={`${leftPanelTitleToLower}/holidayProfile`} children={<HolidayProfile/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        firstReducer: state.firstReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUserData,
            createActiveLink,
            getCirclesData,
            getCustomFields,
            getDeptTableColumnData,
            commonDepartmentAction,
            getTableColumnsData,
            getAddSelectedUsersPostedData,
            getDepartmentData,
            patchCommonCreateData,
            commonActionForCommonReducer
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommonRouting))
