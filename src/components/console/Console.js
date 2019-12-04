import React, { Component } from 'react';
import './console.scss'
import AllUserSelect from '../allUserSelect/allUserSelect'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTableColumnData, getConsoleUserData, commonConsoleAction } from '../../store/actions/actions'


class Console extends Component {


    userSearchData = (e) => {
        const searchData = e.target.value
        const { rowsPerPage, activeheading, sortingType } = this.props.consoleReducer
        this.props.getConsoleUserData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ currentPageNumber: 1, searchData, searchLoader: true })
    }


    onChangeCheckBox = (value) => {
        console.log(value)
    }

    onChangeRowsPerPage = (rowsPerPage) => {
        const { searchData, activeheading, sortingType } = this.props.consoleReducer
        this.props.getConsoleUserData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ rowsPerPage, currentPageNumber: 1 })
    }

    changePage = (calcData) => {
        const { currentPageNumber, rowsPerPage, searchData, activeheading, sortingType } = this.props.consoleReducer
        const goToPage = currentPageNumber + calcData
        this.props.getConsoleUserData(rowsPerPage, goToPage, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ currentPageNumber: goToPage })
    }

    componentDidMount() {
        this.props.getTableColumnData()
        this.props.getConsoleUserData(30)
    }

    onClickHeadingColumn = (activeheading, sortingType) => {
        const { currentPageNumber, rowsPerPage, searchData } = this.props.consoleReducer
        this.props.getConsoleUserData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ activeheading, sortingType })
    }



    render() {

        const { consoleColumnData, consoleUserData, totalUsers, currentPageNumber, searchLoader } = this.props.consoleReducer
        return (
            <div className="console_main">
                <div className="console_heading"><h3>Console</h3></div>
                <AllUserSelect allHeadingsData={consoleColumnData} userData={consoleUserData} searchFirstButtonName={"IMPORT USERS"} searchSecondButtonName={"ADD USER"} onSearch={this.userSearchData}
                    searchPlaceHolder={"Search Users / Managers / Designation"} searchFirstButtonLoader={false} searchSecondButtonLoader={false} searchLoader={searchLoader} onChangeCheckBox={this.onChangeCheckBox}
                    totalUsers={totalUsers} onChangeRowsPerPage={this.onChangeRowsPerPage} goPrevPage={() => this.changePage(-1)} goNextPage={() => this.changePage(1)} currentPageNumber={currentPageNumber}
                    headingClickData={this.onClickHeadingColumn}
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