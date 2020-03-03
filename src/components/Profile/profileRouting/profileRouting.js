import React, {Component} from 'react';
import {
    Switch,
    Route,
    NavLink,
    Redirect,
} from "react-router-dom";
import './profileRouting.scss'
import HolidayProfile from '../HolidayProfile/HolidayProfile'
import CommonLandingView from '../commonLandingView/commonLandingView'

class ProfileRouting extends Component {

    render() {
        const {navLinkRoutes, leftPanelTitle,activeLinkHandler,activeLinkName,path, className} = this.props;
        let leftPanelTitleToLower = leftPanelTitle.toLowerCase();
        return (
            <div className={className}>
                <div className={`${className}-wrap`}>
                    <div className={'left-panel'}>
                        <div className={leftPanelTitleToLower}>{leftPanelTitle}</div>
                        <div className={'nav-link-wrap'}>
                            {navLinkRoutes.map((route, index) => (
                                <NavLink
                                    to={`/${leftPanelTitleToLower}${route.path}`}
                                    className={`nav-link ${activeLinkName === route.link_name ? `link-active ${route.class_name}-link-active` : `list-item ${route.class_name}-link-black`}`}
                                    key={index}
                                    activeClassName={`${route.class_name}-link-active nav-link-active`}
                                    onClick={() => activeLinkHandler(route)}>{route.name}</NavLink>))
                            }
                        </div>
                    </div>
                    <div className={'route-wrap'}>
                        <Switch>
                            {navLinkRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={`/${leftPanelTitleToLower}${route.path}`}
                                    exact={route.exact}
                                    children={route.main}/>
                            ))}
                        </Switch>

                        <Route exact path={["/profile"]}>
                            <Redirect to={"/profile/holiday"} />
                        </Route>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileRouting
