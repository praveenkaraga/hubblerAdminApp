import React, { Component } from 'react';
import './console.scss'
import AllUserSelect from '../allUserSelect/allUserSelect'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getTableColumnData,
    getConsoleUserData,
    commonConsoleAction,
    tableColumnSetting,
    addUserDataForm
} from '../../store/actions/actions'
import UserInfoSlider from '../common/UserInfoSlider/UserInfoSlider'

class Console extends Component {

    constructor(props) {
        super(props)
        this.state = {
            popUpActive: false,
            UserInfoVisible: false,
            userId: "",
            userData: {}
        }
    }


    userSearchData = (e) => {
        const searchData = e.target.value
        const { rowsPerPage, activeheading, sortingType } = this.props.consoleReducer
        this.props.getConsoleUserData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ currentPageNumber: 1, searchData, searchLoader: true })
    }


    onChangeCheckBox = (value) => {
        const selectedUsers = value
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
        // const { consoleUserData } = this.props.consoleReducer
        this.props.getConsoleUserData(30)
        this.props.getTableColumnData()
    }

    onClickHeadingColumn = (activeheading, sortingType) => {
        const { currentPageNumber, rowsPerPage, searchData } = this.props.consoleReducer
        this.props.getConsoleUserData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ activeheading, sortingType })
    }

    onClickColumnSetting = () => {
        const { columnSettingDataOriginal } = this.props.consoleReducer
        if (!Object.keys(columnSettingDataOriginal).length) {
            this.props.tableColumnSetting()
        }
    }


    onClickUserActions = (typeOfAction) => {
        switch (typeOfAction) {
            case "activate":
                console.log("activate")
                break;

            case "deactivate":
                console.log("deactivate")
                break;

            case "delete":
                console.log("delete")
                break;

            case "edit":
                console.log("edit")
                break;

            default:
                console.log("default")
        }
    }


    searchSecondButtonClick = (status) => {
        if (status && !this.props.consoleReducer.addUserDataFormMain.length) {
            this.props.addUserDataForm()
        }
        this.setState({
            popUpActive: status
        })
    }

    searchFirstButtonClick = () => {
        console.log("searchFirstButtonClick")
    }

    onRowClick = (rowData) => {
        console.log(rowData)
        this.onCloseUserInfo(true, rowData._id, rowData)
    }

    onCloseUserInfo = (status, userId = "", userData = {}) => {
        this.setState({
            UserInfoVisible: status,
            userId,
            userData
        })
    }


    render() {

        const { consoleColumnData, consoleUserData, totalUsers, currentPageNumber, searchLoader, columnSettingData, addUserDataForm } = this.props.consoleReducer

        const { popUpActive, UserInfoVisible, userId, userData } = this.state
        return (
            <div className="console_main">
                <div className="console_heading"><h3>Console</h3></div>

                <AllUserSelect
                    //all Search and button component props
                    userData={consoleUserData} searchFirstButtonName={"IMPORT USERS"} searchSecondButtonName={"ADD USER"}
                    searchFirstButtonClick={this.searchFirstButtonClick} searchSecondButtonClick={() => this.searchSecondButtonClick(true)}
                    onSearch={this.userSearchData} searchPlaceHolder={"Search Users / Managers / Designation"} searchFirstButtonLoader={false}
                    searchSecondButtonLoader={false} searchLoader={searchLoader} typeOfData="Total Users"


                    // props for main AllUser component
                    onChangeCheckBox={this.onChangeCheckBox} totalUsers={totalUsers} onChangeRowsPerPage={this.onChangeRowsPerPage} goPrevPage={() => this.changePage(-1)}
                    goNextPage={() => this.changePage(1)} currentPageNumber={currentPageNumber} headingClickData={this.onClickHeadingColumn}
                    allHeadingsData={consoleColumnData}

                    //props of column setting component
                    onClickColumnSetting={this.onClickColumnSetting} columnSettingData={columnSettingData}

                    //props for all the actions to be done on user
                    onClickUserActivate={() => this.onClickUserActions("activate")} onClickUserDeactivate={() => this.onClickUserActions("deactivate")}
                    onClickUserDelete={() => this.onClickUserActions("delete")} onClickUserEdit={() => this.onClickUserActions("edit")}

                    //props for add user component
                    addUserPopUpActive={popUpActive} addUserCloseButton={() => this.searchSecondButtonClick(false)} addUserDataForm={addUserDataForm}

                    //to check if it is userData or not
                    isUserData={true}

                    //columnConfigurable
                    columnConfigurable={true}

                    //table fn
                    onClickTableRow={this.onRowClick}
                />

                <UserInfoSlider visible={UserInfoVisible} onCloseFunction={() => this.onCloseUserInfo(false)}  teamUserData={userData} sourceTeamView={false}
                                url={`/reportees/organization/${userId}/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=`}
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
            commonConsoleAction,
            tableColumnSetting,
            addUserDataForm
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Console)