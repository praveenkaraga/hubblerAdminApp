import React, { Component } from 'react';
import AddUser from '../addUser/addUser'

class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="departments_main">
                <AddUser />
            </div>
        );
    }
}

export default Departments;