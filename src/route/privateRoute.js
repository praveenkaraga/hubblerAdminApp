import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class privateRoute extends Component {




    render() {

        const { path, name, component, loggedIn } = this.props

        return
        (
            <>
                {loggedIn ?
                    <Route path={path} exact={path} name={name} component={component} />
                    : <Redirect to="/dashboard/index.html#login" />
                }
            </>

        )

            ;
    }
}

export default privateRoute;