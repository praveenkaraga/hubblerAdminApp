import React, { Component } from 'react';
//import { connect } from "react-redux";
import './console.scss'
import SingleUserDetails from '../singleUserDetails/singleUserDetails'


class Console extends Component {
    render() {
        return (
            <div className="console_main">
                <SingleUserDetails />
            </div>
        )
    }
}

export default Console