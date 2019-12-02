import React, { Component } from 'react';
//import { connect } from "react-redux";
import './console.scss'
import AllUserSelect from '../allUserSelect/allUserSelect'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTableColumnData, getConsoleUserData, commonConsoleAction } from '../../store/actions/actions'


class Console extends Component {


    userSearchData = (e) => {
        console.log(e.target.value)
    }

    componentDidMount() {
        this.props.getTableColumnData()
        this.props.getConsoleUserData(30)
    }

    onChangeCheckBox = (value) => {
        console.log(value)
    }

    onChangeRowsPerPage = (rowsPerPage) => {
        this.props.getConsoleUserData(rowsPerPage, this.props.consoleReducer.currentPageNumber)
        this.props.commonConsoleAction({ rowsPerPage })
    }

    goPrevPage = () => {
        const prevPageNUmber = this.props.consoleReducer.currentPageNumber - 1
        this.props.getConsoleUserData(this.props.consoleReducer.rowsPerPage, prevPageNUmber)
        this.props.commonConsoleAction({ currentPageNumber: prevPageNUmber })

    }

    goNextPage = () => {
        const nextPageNUmber = this.props.consoleReducer.currentPageNumber + 1
        this.props.getConsoleUserData(this.props.consoleReducer.rowsPerPage, nextPageNUmber)
        this.props.commonConsoleAction({ currentPageNumber: nextPageNUmber })
    }


    render() {

        const { consoleColumnData, consoleUserData, totalUsers, currentPageNumber } = this.props.consoleReducer
        return (
            <div className="console_main">
                <div className="console_heading"><h3>Console</h3></div>
                <AllUserSelect allHeadingsData={consoleColumnData} userData={consoleUserData} searchFirstButtonName={"IMPORT USERS"} searchSecondButtonName={"ADD USER"} onSearch={this.userSearchData}
                    searchPlaceHolder={"Search Users / Managers / Designation"} searchFirstButtonLoader={false} searchSecondButtonLoader={false} searchLoader={false} onChangeCheckBox={this.onChangeCheckBox}
                    totalUsers={totalUsers} onChangeRowsPerPage={this.onChangeRowsPerPage} goPrevPage={this.goPrevPage} goNextPage={this.goNextPage} currentPageNumber={currentPageNumber}
                />
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
            getConsoleUserData,
            commonConsoleAction
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Console)