import React, { Component } from 'react';
import './console.scss'
import { message, Modal } from 'antd'
import AllUserSelect from '../../common/allUserSelect/allUserSelect'
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
    getLoginSessionData,
    getAddUsersProfileData
} from '../../../store/actions/PeopleActions/peopleActions'
import UserInfoSlider from '../../common/UserInfoSlider/UserInfoSlider'
import ImportUsersPopUp from '../../common/ImportUsersPopUp/ImportUsersPopUp'
import { capitalFirstLetter } from '../../../utils/helper'
import ConsoleAddUser from '../consoleAddUser/consoleAddUser'

class Console extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addUserspopUpStatus: false,
            UserInfoVisible: false,
            userId: "",
            userData: {},
            checkedDataKeys: [],
            disableHeaderButtonNames: [],
            visibleColumnSetting: false,
            typeOfActionOnUser: "",
            visibilityOfDeletePopUp: false,
            loaderOfDeletePopUp: false
        }
        this.selectedUsers = []
        this.ifSelectedAllData = []
    }

    componentDidMount() { // calling console data and same excel file api
        this.props.getConsoleUserData(30)
        this.props.onClickOfDownloadExcel()
    }


    userSearchData = (e) => { // on Search of console table
        const searchData = e.target.value
        const { rowsPerPage, activeheading, sortingType } = this.props.consoleReducer
        this.props.getConsoleUserData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ currentPageNumber: 1, searchData, searchLoader: true })
    }


    //for validation of activate and deactivate buttons 
    whenSelectingUsers = (selectedRows) => { // using this fn on Select of checkboxes to take thier ids and deactivate status
        selectedRows.forEach(element => { // taking all the id and status of deactivate of selected data from any page
            if (!this.selectedUsers.find(data => data._id === element._id)) { // making the data unique
                this.selectedUsers.push({ _id: element._id, deactivate: element.deactivate })
            }
        });
    }


    //for validation of activate and deactivate buttons 
    whenUnSelectingUsers = (toBeRemovedOne) => {// using this fn on unselect to remove their id 
        const indexOfRemovedData = this.selectedUsers.map(data => data._id).indexOf(toBeRemovedOne._id) //taking the index from the array of objects
        this.selectedUsers.splice(indexOfRemovedData, 1)
    }


    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        const checkedDataKeys = selectedRowsKeys
        this.whenSelectingUsers(selectedRows) //for validation of activate and deactivate buttons 
        this.setState({ checkedDataKeys })
    }

    changeStatusOfUserAction = (selectedDataOriginal) => { //handelling the case to enable and disable the activate and deactivate button on selection
        const selectedData = selectedDataOriginal.map(data => data.deactivate)
        let disableHeaderButtonNames = []

        /* if selected checkbox users are both active and deactive & also selected more 
        *than one user all three buttons{edit, activate, deactivate} will get disabled */
        if (selectedData.includes(true) && (selectedData.includes(false) || selectedData.includes(undefined))) {
            disableHeaderButtonNames = ["edit", "activate", "deactivate"]
        } else if ((selectedData.includes(false) || selectedData.includes(undefined))) {// if all selected users are active ones activate button will be disabled  
            disableHeaderButtonNames = selectedDataOriginal.length > 1 ? ["edit", "activate"] : ["activate"]
        } else {
            disableHeaderButtonNames = selectedDataOriginal.length > 1 ? ["edit", "deactivate"] : ["deactivate"] // if all selected users are deactive ones deactivate button will be disabled
        }

        this.setState({ disableHeaderButtonNames })
    }

    onSelectRow = (record, selected) => {
        if (!selected) { // removing the unselected data from the array
            this.whenUnSelectingUsers(record)//for validation of activate and deactivate buttons 
        }
        this.changeStatusOfUserAction(this.selectedUsers)
    }


    //on change of rows per page of the table
    onChangeRowsPerPage = (rowsPerPage) => {
        const { searchData, activeheading, sortingType } = this.props.consoleReducer
        this.props.getConsoleUserData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ rowsPerPage, currentPageNumber: 1 })
    }


    //on change of pages of the table
    changePage = (calcData) => {
        const { currentPageNumber, rowsPerPage, searchData, activeheading, sortingType } = this.props.consoleReducer
        const goToPage = currentPageNumber + calcData
        this.props.getConsoleUserData(rowsPerPage, goToPage, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ currentPageNumber: goToPage })
    }

    //on click of heading of all the rows of the table
    //will make ascend and descend that column
    onClickHeadingColumn = (activeheading, sortingType) => {
        const { currentPageNumber, rowsPerPage, searchData } = this.props.consoleReducer
        this.props.getConsoleUserData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        this.props.commonConsoleAction({ activeheading, sortingType })
    }

    //on click of gear icon
    //calling api of the column setting
    onClickColumnSetting = () => {
        const { visibleColumnSetting } = this.state
        if (!visibleColumnSetting) { //checking if gear icon is present or cross icon
            const { columnSettingDataOriginal } = this.props.consoleReducer
            if (!Object.keys(columnSettingDataOriginal).length) { //checking if data is availbale then not calling the api again
                this.props.tableColumnSetting()
            }
        }
        this.setState({ visibleColumnSetting: !visibleColumnSetting })

    }


    onClickUserActions = (typeOfAction) => {
        console.log(typeOfAction)
    }



    // on click of activate, deactivate and delete button
    // "actiontype" is type of action we are taking from the above three
    actionOnUser = async (actionType) => { // on click of activate 
        const { checkedDataKeys } = this.state
        this.setState({ loaderOfDeletePopUp: true })
        await this.props.postCommonActionOnUser(actionType, { users: checkedDataKeys })
        const { actionSuccessMessage, errorMsg, actionOnUserSuccess, rowsPerPage, activeheading, sortingType, searchData, currentPageNumber } = this.props.consoleReducer
        if (actionOnUserSuccess) { // if api call gives success
            message.success(actionSuccessMessage) // show success message
            this.props.commonConsoleAction({ actionOnUserSuccess: false })
            this.props.getConsoleUserData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
            this.setState({ checkedDataKeys: [] })
            this.selectedUsers = []
        } else {
            message.error(errorMsg)
        }
        this.setState({ loaderOfDeletePopUp: false, visibilityOfDeletePopUp: false })

    }



    //on click of each row of table
    // calling user data api and enabling user info slider
    onRowClick = (rowData) => {
        this.props.commonTeamReducerAction({ contentLoader: true })
        this.props.getClickedTeamUserData(rowData._id)
        this.setState({
            clickedMemberData: rowData
        })
        this.onCloseUserInfo(true, rowData._id)
    }

    onCloseUserInfo = (status, userId = "", userData = {}) => {
        this.setState({
            UserInfoVisible: status,
            userId,
            userData
        })
    }


    startUploadHandler = () => { // uploading the import users data
        this.props.commonTeamReducerAction({ startUploadStatus: 'true' })
        this.props.getImportUserUploadDetails()
    }

    //updating the data for import users
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


    //for validation of activate and deactivate buttons on click of selectAll checkbox
    onClickSelectAllCheckBox = (selected, selectedRows) => {
        if (selected) { // removing the unselected data from the array
            this.ifSelectedAllData = selectedRows
            this.whenSelectingUsers(selectedRows)
        } else {
            this.ifSelectedAllData.forEach(ifSelectedData => {
                this.whenUnSelectingUsers(ifSelectedData)
            })
        }
        this.changeStatusOfUserAction(this.selectedUsers)
    }

    //function will returns all the buttons which will be shown on selection of any user(s)
    showButtons = () => {
        return [{ id: "activate", label: "Activate User" }, { id: "deactivate", label: "Deactivate User" },
        { id: "edit", label: "Edit User" }, { id: "delete", label: "Delete User" }]

    }


    onSearchColumnSetting = (searchData) => { // on search inside column setting pop over
        this.props.tableColumnSetting(searchData)
    }


    render() {
        const { consoleUserData, totalUsers, currentPageNumber, searchLoader, columnSettingData, addUserDataForm } = this.props.consoleReducer
        const { importUsersPopUpVisiblity, sampleExcelFile, uploadPopUpData, uploadPopUpVisibility, startUploadStatus, uploadFileStatus,
            importUsersUploadResponseData, isFileUploaded, clickedTeamUserData, contentLoader } = this.props.teamViewReducer;
        const { tableColumnData } = this.props.commonReducer

        const { addUserspopUpStatus, UserInfoVisible, userId, checkedDataKeys, disableHeaderButtonNames, visibleColumnSetting, typeOfActionOnUser,
            visibilityOfDeletePopUp, loaderOfDeletePopUp } = this.state;
        return (
            <div className="console_main">
                <div className="console_heading"><h3>Console</h3></div>

                <AllUserSelect
                    //all Search and button component props
                    searchFirstButtonName={"IMPORT USERS"}
                    searchSecondButtonName={"ADD USER"}
                    searchFirstButtonClick={() => this.props.commonTeamReducerAction({ importUsersPopUpVisiblity: true })} //enabling the user info slider
                    searchSecondButtonClick={() => this.setState({ addUserspopUpStatus: true })}
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
                    onClickColumnSetting={this.onClickColumnSetting}
                    columnSettingData={columnSettingData}
                    columnConfigurable={true}
                    onColumnSettingSave={this.onColumnSettingSave}
                    visibleColumnSetting={visibleColumnSetting}
                    onColumnSettingCancel={() => this.setState({ visibleColumnSetting: false })}
                    onSearchColumnSetting={this.onSearchColumnSetting}

                    //props for all the actions to be done on user
                    onClickUserActivate={() => this.setState({ visibilityOfDeletePopUp: true, typeOfActionOnUser: "activate" })}
                    onClickUserDeactivate={() => this.setState({ visibilityOfDeletePopUp: true, typeOfActionOnUser: "deactivate" })}
                    onClickUserDelete={() => this.setState({ visibilityOfDeletePopUp: true, typeOfActionOnUser: "delete" })}
                    onClickUserEdit={() => this.onClickUserActions("edit")}


                    //to check if it is userData or not
                    isUserData={true}

                    //table fn
                    onClickTableRow={this.onRowClick}

                    //buttons to show and hide 
                    showHeaderButtons={this.showButtons()}
                    disableButtonNames={disableHeaderButtonNames}

                    //to empty the selected Data
                    selectedDataCount={checkedDataKeys.length}

                    onSelectAll={this.onClickSelectAllCheckBox}

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


                <Modal //used this modal for confirmation before deleting node items
                    title={`${capitalFirstLetter(typeOfActionOnUser)} User(s)`}
                    visible={visibilityOfDeletePopUp}
                    onOk={() => this.actionOnUser(typeOfActionOnUser)}
                    confirmLoading={loaderOfDeletePopUp}
                    onCancel={() => this.setState({ visibilityOfDeletePopUp: false })}
                    centered
                    closable
                    okText={typeOfActionOnUser.toUpperCase()}
                    maskClosable={false}
                    okType={typeOfActionOnUser === "activate" ? "primary" : "danger"}
                    wrapClassName={"console_delete_popup"}
                    destroyOnClose={true}
                >
                    <p>{`Are you sure you want to ${typeOfActionOnUser} selected ${checkedDataKeys.length} User(s)`}</p>
                </Modal>

                {addUserspopUpStatus ? <ConsoleAddUser addUserCloseButton={() => this.setState({ addUserspopUpStatus: false })} /> : null}
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
            getLoginSessionData,
            getAddUsersProfileData
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Console)