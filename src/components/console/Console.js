import React, { Component } from 'react';
//import { connect } from "react-redux";
import './console.scss'
import AllUserSelect from '../allUserSelect/allUserSelect'


class Console extends Component {
    render() {
        return (
            <div className="console_main">
                <div className="console_heading"><h3>Console</h3></div>
                <AllUserSelect />
            </div>
        )
    }
}

export default Console