import React, {Component} from 'react';
import {connect} from "react-redux";
import './departments.scss'
import {Button} from 'antd';
import 'antd/dist/antd.css';
import {bindActionCreators} from "redux";
import {getDepartmentData, commonDepartmentAction, getDeptTableColumnData} from "../../store/actions/actions";
import AllUserSelect from '../allUserSelect/allUserSelect'

class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30)
    }

    render() {
        const {departmentColumnData, departmentsData,totalUsers} = this.props.departmentReducer;

        return (
            <div className="departments-main">
                <div className="departments-heading"><h3>Departments</h3></div>
                <AllUserSelect allHeadingsData={departmentColumnData} userData={departmentsData}
                               searchPlaceHolder={"Search Department"} searchFirstButtonName={"IMPORT RESOURCES"}
                               searchSecondButtonName={"ADD USER"} totalUsers={totalUsers}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        departmentReducer: state.departmentReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDepartmentData, commonDepartmentAction, getDeptTableColumnData
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Departments);


