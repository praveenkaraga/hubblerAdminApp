import React, { Component } from 'react';
//import { connect } from "react-redux";
import './console.scss'
import AllUserSelect from '../allUserSelect/allUserSelect'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTableColumnData, getConsoleUserData } from '../../store/actions/actions'


class Console extends Component {


    userSearchData = (e) => {
        console.log(e.target.value)
    }

    componentDidMount() {
        this.props.getTableColumnData()
        this.props.getConsoleUserData()
    }

    onChangeCheckBox = (value) => {
        console.log(value)
    }


    render() {

        const { consoleColumnData, consoleUserData } = this.props.consoleReducer
        return (
            <div className="console_main">
                <div className="console_heading"><h3>Console</h3></div>
                <AllUserSelect allHeadingsData={consoleColumnData} userData={consoleUserData} searchFirstButtonName={"IMPORT USERS"} searchSecondButtonName={"ADD USER"} onSearch={this.userSearchData}
                    searchPlaceHolder={"Search Users / Managers / Designation"} searchFirstButtonLoader={false} searchSecondButtonLoader={false} searchLoader={false} onChangeCheckBox={this.onChangeCheckBox} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        consoleReducer: state.consoleReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTableColumnData,
            getConsoleUserData
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Console)