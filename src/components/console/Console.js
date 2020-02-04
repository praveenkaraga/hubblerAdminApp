import React, { Component } from 'react';
import './console.scss'
import AllUserSelect from '../allUserSelect/allUserSelect'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getConsoleUserData,
    commonConsoleAction,
    tableColumnSetting,
    addUserDataForm,
    getClickedTeamUserData,
    commonTeamReducerAction,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    patchImportUsersData,
    postCommonActionOnUser,
    patchTableColumnSetting,
    getLoginSessionData
} from '../../store/actions/actions'
import UserInfoSlider from '../common/UserInfoSlider/UserInfoSlider'
import ImportUsersPopUp from '../common/ImportUsersPopUp/ImportUsersPopUp'
import { message } from 'antd'

class Console extends Component {

    constructor(props) {
        super(props)
        this.state = {
            popUpActive: false,
            UserInfoVisible: false,
            userId: "",
            userData: {},
            checkedDataKeys: [],
            disableHeaderButtonNames: []
        }
        this.selectedUsers = []
    }

    componentDidMount() {
        this.props.getConsoleUserData(30)
        this.props.onClickOfDownloadExcel()
    }


    userSearchData = (e) => {
        const searchData = e.target.value
        const { rowsPerPage, activeheading, sortingType } = this.props.consoleReducer
        this.props.getConsoleUserData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ currentPageNumber: 1, searchData, searchLoader: true })
    }


    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        const checkedDataKeys = selectedRowsKeys
        selectedRows.forEach(element => { // taking all the id and status of deactivate of selected data from any page
            if (!this.selectedUsers.find(data => data._id === element._id)) { // making the data unique
                this.selectedUsers.push({ _id: element._id, deactivate: element.deactivate })
            }
        });
        this.setState({ checkedDataKeys })
    }

    changeStatusOfUserAction = (selectedDataOriginal) => { //handelling the case to enable and disable the activate and deactivate button on selection

        const selectedData = selectedDataOriginal.map(data => data.deactivate)
        let disableHeaderButtonNames = []
        if (selectedData.includes(true) && (selectedData.includes(false) || selectedData.includes(undefined))) {
            disableHeaderButtonNames = ["edit", "activate", "deactivate"]
        } else if ((selectedData.includes(false) || selectedData.includes(undefined))) {
            disableHeaderButtonNames = selectedDataOriginal.length > 1 ? ["edit", "activate"] : ["activate"]
        } else {
            disableHeaderButtonNames = selectedDataOriginal.length > 1 ? ["edit", "deactivate"] : ["deactivate"]
        }

        this.setState({ disableHeaderButtonNames })
    }

    onSelectRow = (record, selected) => {
        if (!selected) { // removing the unselected data from the array 
            const indexOfRemovedData = this.selectedUsers.map(data => data._id).indexOf(record._id) //taking the index from the array of objects
            this.selectedUsers.splice(indexOfRemovedData, 1)
        }
        this.changeStatusOfUserAction(this.selectedUsers)
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
                this.actionOnUser("activate")
                break;
            case "deactivate":
                this.actionOnUser("deactivate")
                break;
            case "delete":
                this.actionOnUser("delete")
                break;

            case "edit":
                console.log("edit")
                break;

            default:
                alert("Some error occured")
        }
    }


    actionOnUser = async (actionType) => {
        const { checkedDataKeys } = this.state
        await this.props.postCommonActionOnUser(actionType, { users: checkedDataKeys })
        const { actionSuccessMessage, errorMsg, actionOnUserSuccess, rowsPerPage, activeheading, sortingType, searchData, currentPageNumber } = this.props.consoleReducer
        if (actionOnUserSuccess) {
            message.success(actionSuccessMessage)
            this.props.commonConsoleAction({ actionOnUserSuccess: false })
            this.props.getConsoleUserData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
            this.setState({ checkedDataKeys: [] })
            this.selectedUsers = []
        } else {
            message.error(errorMsg)
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
        this.props.commonTeamReducerAction({ importUsersPopUpVisiblity: true })
    }

    onRowClick = (rowData) => {
        this.props.commonTeamReducerAction({ contentLoader: true })
        this.props.getClickedTeamUserData(rowData._id)
        this.setState({
            clickedMemberData: rowData
        })
        // const { clickedTeamUserData } = this.props.teamViewReducer
        this.onCloseUserInfo(true, rowData._id)
    }

    onCloseUserInfo = (status, userId = "", userData = {}) => {
        this.setState({
            UserInfoVisible: status,
            userId,
            userData
        })
    }

    showButtons = () => {
        return [{ id: "activate", label: "Activate User" }, { id: "deactivate", label: "Deactivate User" },
        { id: "edit", label: "Edit User" }, { id: "delete", label: "Delete User" }]

    }


    startUploadHandler = () => {
        this.props.commonTeamReducerAction({ startUploadStatus: 'true' })
        this.props.getImportUserUploadDetails()
    }

    patchImportUserData = (id, mappings, skipFirstRow, uploadType) => {
        let patchData = {
            mappings: mappings,
            skip_first_row: skipFirstRow,
            upload_type: uploadType,
        }
        this.props.commonTeamReducerAction({ uploadFileStatus: 'true' });
        this.props.patchImportUsersData(id, patchData)
    }


    onColumnSettingSave = async (settingData) => { // on save of table column setting 
        const copySavedSettingData = JSON.parse(JSON.stringify(settingData)) //making a deep copy of setting data
        const removeKeys = ["sorter", "title", "dataIndex", "sortDirections", "ellipsis"] //keys to remove from each object
        copySavedSettingData.forEach(data => removeKeys.forEach(key => delete data[key])) //removing all keys that we don't want to send to backend
        await this.props.patchTableColumnSetting({ fields: copySavedSettingData })
        const { patchColumnSettingStatus, errorMsg, rowsPerPage, activeheading, sortingType, searchData, currentPageNumber } = this.props.consoleReducer
        if (patchColumnSettingStatus) {
            message.success("Table Column Setting Saved")
            this.props.getLoginSessionData()
            this.props.getConsoleUserData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)

        } else {
            message.error(errorMsg)
        }
    }



    render() {
        const { consoleUserData, totalUsers, currentPageNumber, searchLoader, columnSettingData, addUserDataForm } = this.props.consoleReducer
        const { importUsersPopUpVisiblity, sampleExcelFile, uploadPopUpData, uploadPopUpVisibility, startUploadStatus, uploadFileStatus,
            importUsersUploadResponseData, isFileUploaded, clickedTeamUserData, contentLoader } = this.props.teamViewReducer;
        const { tableColumnData } = this.props.commonReducer

        const { popUpActive, UserInfoVisible, userId, userData, checkedDataKeys, disableHeaderButtonNames } = this.state;
        return (
            <div className="console_main">
                <div className="console_heading"><h3>Console</h3></div>

                <AllUserSelect
                    //all Search and button component props
                    searchFirstButtonName={"IMPORT USERS"}
                    searchSecondButtonName={"ADD USER"}
                    searchFirstButtonClick={this.searchFirstButtonClick}
                    searchSecondButtonClick={() => this.searchSecondButtonClick(true)}
                    onSearch={this.userSearchData} searchPlaceHolder={"Search Users / Managers / Designation"}
                    searchFirstButtonLoader={false}
                    searchSecondButtonLoader={false} searchLoader={searchLoader} typeOfData="Total Users"


                    // props for main AllUser component
                    onChangeCheckBox={this.onChangeCheckBox} totalUsers={totalUsers}
                    onChangeRowsPerPage={this.onChangeRowsPerPage} goPrevPage={() => this.changePage(-1)}
                    goNextPage={() => this.changePage(1)} currentPageNumber={currentPageNumber}
                    headingClickData={this.onClickHeadingColumn}
                    allHeadingsData={tableColumnData}
                    userData={consoleUserData}
                    onSelectRow={this.onSelectRow}

                    //props of column setting component
                    onClickColumnSetting={this.onClickColumnSetting} columnSettingData={columnSettingData}
                    columnConfigurable={true} onColumnSettingSave={this.onColumnSettingSave}

                    //props for all the actions to be done on user
                    onClickUserActivate={() => this.onClickUserActions("activate")}
                    onClickUserDeactivate={() => this.onClickUserActions("deactivate")}
                    onClickUserDelete={() => this.onClickUserActions("delete")}
                    onClickUserEdit={() => this.onClickUserActions("edit")}

                    //props for add user component
                    addUserPopUpActive={popUpActive} addUserCloseButton={() => this.searchSecondButtonClick(false)}
                    addUserDataForm={addUserDataForm}

                    //to check if it is userData or not
                    isUserData={true}

                    //table fn
                    onClickTableRow={this.onRowClick}

                    //buttons to show and hide 
                    showHeaderButtons={this.showButtons()}
                    disableButtonNames={disableHeaderButtonNames}

                    //to empty the selected Data
                    selectedDataCount={checkedDataKeys.length}


                />

                <UserInfoSlider visible={UserInfoVisible} onCloseFunction={() => this.onCloseUserInfo(false)}
                    teamUserData={clickedTeamUserData}
                    sourceTeamView={true}
                    url={`/reportees/organization/${userId}/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=`}
                    contentLoader={contentLoader}
                    clickedMemberData={this.state.clickedMemberData}
                />


                <ImportUsersPopUp visible={importUsersPopUpVisiblity}
                    secondButtonClickHandler={this.props.onClickOfDownloadExcel}
                    sampleExcelFile={sampleExcelFile}
                    thirdButtonClickHandler={() => this.props.commonTeamReducerAction({ importUsersPopUpVisiblity: false })}
                    fourthButtonClickHandler={this.startUploadHandler}
                    fourthButtonLoaderStatus={startUploadStatus}
                    importUsersUploadPopUpVisibility={uploadPopUpVisibility}
                    uploadPopUpData={uploadPopUpData}
                    importUsersPopUpCloseHandler={() => this.props.commonTeamReducerAction({ uploadPopUpVisibility: false })}
                    patchImportUsersDataHandler={this.patchImportUserData}
                    importUsersUploadResponseData={importUsersUploadResponseData}
                    uploadFileLoadingStatus={uploadFileStatus}
                    isFileUploaded={isFileUploaded}
                />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        consoleReducer: state.consoleReducer,
        teamViewReducer: state.teamViewReducer,
        commonReducer: state.commonReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getConsoleUserData,
            commonConsoleAction,
            tableColumnSetting,
            addUserDataForm,
            getClickedTeamUserData,
            commonTeamReducerAction,
            onClickOfDownloadExcel,
            getImportUserUploadDetails,
            patchImportUsersData,
            postCommonActionOnUser,
            patchTableColumnSetting,
            getLoginSessionData
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Console)