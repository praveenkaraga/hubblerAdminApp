import React, {Component} from 'react';
import {
    Switch,
    Route,
    NavLink,
    Redirect,
} from "react-router-dom";
import './commonRouting.scss'
import HolidayProfile from '../../../components/HolidayProfile/HolidayProfile'

class CommonRouting extends Component {

    render() {
        const {routes, leftPanelTitle,activeLinkHandler,activeLinkName,path} = this.props;
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
                                    activeClassName={`${route.class_name}-link-active nav-link-active`}
                                    onClick={() => activeLinkHandler(route)}>{route.name}</NavLink>))
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
                                <Redirect to={`${leftPanelTitleToLower}/${path}`}/>
                            </Route>
                            <Route path={`${leftPanelTitleToLower}/${path}`} children={<HolidayProfile/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommonRouting
