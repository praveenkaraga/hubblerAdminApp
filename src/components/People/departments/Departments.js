import React, {Component} from 'react';
import {connect} from "react-redux";
import './departments.scss'
import {Modal, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import {bindActionCreators} from "redux";
import isEmpty from 'lodash/isEmpty'
import {
    getDepartmentData,
    commonDepartmentAction,
    getDeptTableColumnData,
    postCreateDeptData,
    getAddableUsersData,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    commonTeamReducerAction,
    patchImportUsersData,
    editUserDataForm,
    commonActionForCommonReducer,
    patchCommonCreateData,
    postCommonCreateData,
    postCommonDelete
} from "../../../store/actions/PeopleActions/peopleActions";
import AllUserSelect from '../../common/allUserSelect/allUserSelect'
import filter from "lodash/filter";
import {withRouter} from "react-router-dom";
import ImportUsersPopUp from '../../../components/common/ImportUsersPopUp/ImportUsersPopUp'
import {message} from 'antd'

import CreationPopUp from "../../common/CreationPopUp/CreationPopUp";


class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeToCreatedView: false,  //changeToDepartmentCreatedView
            showAddUsersPopUp: false, //showUsersList
            usersIdArray: [], //usersIdArray
            creationPopUpVisibility: false,
            commonCreationViewHeaderName: "", /**/
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeHeading: "",
            sortingType: "",
            searchData: "",
            allSelectedUsersCurrentPageNumber: 1,/**/
            allSelectedUsersRowsPerPage: 30,
            allSelectedUsersActiveHeading: "",
            allSelectedUsersSortingType: "",
            allSelectedUsersSearchData: "", /*addUsers*/
            addUsersCurrentPageNumber: 1,/**/
            addUsersRowsPerPage: 30,
            addUsersActiveHeading: "",
            addUsersSortingType: "",
            addUsersSearchData: "",
            importUsersPopUpVisibility: false,
            formPopUpActive: false,
            newDepartmentName: "",
            checkedDataKeys: [],
            creationPopUpMode: "add",
            editRowName: "",
            editRowId: "",
            visibilityOfDeletePopUp: false,
            creationLoader: false,
            multiCreationLoader: false,
        }
    }

    componentDidMount() {
        this.props.commonDepartmentAction({tableLoading: true})
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30)
        this.props.onClickOfDownloadExcel()
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onInputChange = (e) => {
        this.setState({
            departmentName: e.target.value
        })
    };

    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        let editRowName = ""
        let editRowId = ""
        if (selectedRows[0]) {
            editRowName = selectedRows[0].departments
            editRowId = selectedRows[0]._id
        }
        this.setState({
            checkedDataKeys: selectedRowsKeys,
            editRowName,
            editRowId,
            commonCreationViewHeaderName: editRowName,
        })
    };

    createDepartment() {
        let data = {name: this.state.departmentName};
        this.props.postCreateDeptData(data);
        this.setState({
            changeToDepartmentCreatedView: true,
            visible: false,
        })
    }

    backToMainDepartmentView = () => {
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30);
        this.setState({
            changeToDepartmentCreatedView: false
        })
    };

    addFromUsersClick = () => {
        const {createdDepartmentData} = this.props.departmentReducer;
        this.setState({
            showUsersList: true,
        });
        this.props.getAddableUsersData(createdDepartmentData ? createdDepartmentData.id : '')
        this.props.commonDepartmentAction({populateSelectedUsersView: false})
    };

    onUserListCancel = () => {
        this.setState({
            showUsersList: false,
        });
    };

    onClickFirst = () => {
        const {createdDepartmentData} = this.props.departmentReducer;
        let data = {
            users: this.state.usersIdArray,
            _id: createdDepartmentData.id
        };
    };

    onChangeAddUsersCheckBox = (value) => {
        this.setState({
            usersIdArray: value,
        })
    };

    //retain this
    searchSecondButtonClick = (status) => {
        this.setState({
            creationPopUpVisibility: true,
            creationPopUpMode: "add",
            commonCreationViewHeaderName: ''
        })
    }

    //new stuff
    creationPopFirstButtonHandler = () => {
        this.setState({
            creationPopUpVisibility: false,
            commonCreationViewHeaderName: ''
        })
    };


    creationPopSecondButtonHandler = async (e) => {
        const {rowsPerPage, currentPageNumber, searchData, activeHeading, sortingType} = this.state
        this.setState({creationLoader: true})
        let data = {name: this.state.commonCreationViewHeaderName};
        await this.props.postCreateDeptData(data);
        const {errorMsg} = this.props.commonReducer // will be true if success is true from above post api and pop up will be closed
        if (!isEmpty(this.props.departmentReducer.createdDepartmentData)) {
            this.setState({creationPopUpVisibility: false, commonCreationViewHeaderName: ''})
            message.success("Department Created Successfully");
            this.props.commonDepartmentAction({newDataCreatedSuccessfully: false})
            this.props.getDepartmentData(rowsPerPage, currentPageNumber, searchData, activeHeading, sortingType)
            // this.props.history.push(`/people/department/${this.props.departmentReducer.createdDepartmentData.id}`, {headerName: this.props.departmentReducer.createdDepartmentData.result.name})
        } else {
            message.error(errorMsg);
        }
        this.setState({creationLoader: false})
    }

    creationPopThirdButtonHandler = async (e) => {
        const {rowsPerPage, currentPageNumber, searchData, activeHeading, sortingType} = this.state

        let data = {name: this.state.commonCreationViewHeaderName};
        this.setState({multiCreationLoader: true})


        await this.props.postCreateDeptData(data);
        const {errorMsg} = this.props.commonReducer // will be true if success is true from above post api and pop up will be closed
        if (!isEmpty(this.props.departmentReducer.createdDepartmentData)) {
            this.setState({commonCreationViewHeaderName: ''})
            message.success("Department Created Successfully");
            this.props.commonDepartmentAction({newDataCreatedSuccessfully: false})
            this.props.getDepartmentData(rowsPerPage, currentPageNumber, searchData, activeHeading, sortingType)

            // this.props.history.push(`/people/department/${this.props.departmentReducer.createdDepartmentData.id}`, {headerName: this.props.departmentReducer.createdDepartmentData.result.name})
        } else {
            message.error(errorMsg);
        }
        this.setState({multiCreationLoader : false})
    }


    onSaveEditedDepartment = async () => {
        const {editRowId, rowsPerPage, currentPageNumber, searchData, activeHeading, sortingType} = this.state
        await this.props.patchCommonCreateData("departments", editRowId, {name: this.state.commonCreationViewHeaderName}) //waiting for the api to be posted
        const {patchDataCreatedSuccessfully, patchSuccessMessage, errorMsg} = this.props.commonReducer // will be true if success is true from above post api and pop up will be closed
        if (patchDataCreatedSuccessfully) {
            this.setState({creationPopUpVisibility: false, checkedDataKeys: []})
            message.success(patchSuccessMessage || "Saved Successfully");
            this.props.commonActionForCommonReducer({newDataCreatedSuccessfully: false})
            this.props.getDepartmentData(rowsPerPage, currentPageNumber, searchData, activeHeading, sortingType)
        } else {
            message.error(errorMsg);
        }

    }

    creationPopUpFirstFieldChangeHandler = (e) => {
        const {editRowName} = this.state
        const inputData = e.target.value
        this.setState({commonCreationViewHeaderName: inputData, /*editRowName: inputData ? editRowName : ""*/})

    };


    addUsersCommonCardButtonClick = () => {
        const {createdDepartmentData} = this.props.departmentReducer;
        this.setState({
            showAddUsersPopUp: true,
        });

        this.props.getAddableUsersData(createdDepartmentData ? createdDepartmentData.id : '')
        this.props.commonDepartmentAction({viewDecider: false})

    }

    allSelectedUsersOnChangeCheckBox = (value) => {
        this.setState({
            usersIdArray: value,
        })
    }

    allSelectedUsersFirstButtonClick = () => {
        console.log('yet to write the function : allSelectedUsersFirstButtonClick')
    }

    commonCreationViewBackButtonClick = () => { //backToMainDepartmentView
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30)
        this.props.commonDepartmentAction({commonViewLoader: true})

        this.setState({
            changeToCreatedView: false, //changeToDepartmentCreatedView
            commonCreationViewHeaderName: ''
        })
    }


    addUsersPopUpClose = () => {
        this.setState({
            showAddUsersPopUp: false
        })
    };

    addUsersPopUpFirstButtonClick = () => { // onClickFirst
        const {createdDepartmentData} = this.props.departmentReducer;
        let data = {
            users: this.state.usersIdArray,
            _id: createdDepartmentData.id
        };
        this.setState({
            showAddUsersPopUp: false
        })
        this.props.commonDepartmentAction({commonViewLoader: true})
    };

    addUsersPopUpOnChangeCheckBox = (value) => { //onChangeAddUsersCheckBox
        this.setState({
            usersIdArray: value,
        })
    };


    onClickHeadingColumn = (activeHeading, sortingType) => {
        const {rowsPerPage, searchData, currentPageNumber} = this.state

        const activeHeadingModified = activeHeading === "departments" ? "name" : "count"
        this.props.commonDepartmentAction({tableLoading: true})
        this.props.getDepartmentData(rowsPerPage, currentPageNumber, searchData, activeHeadingModified, sortingType)
        this.setState({
            activeHeading: activeHeadingModified,
            sortingType
        })
    }

    onChangeRowsPerPage = (rowsPerPage) => {
        const {searchData, activeHeading, sortingType} = this.state
        this.props.commonDepartmentAction({tableLoading: true})
        this.props.getDepartmentData(rowsPerPage, 1, searchData, activeHeading, sortingType)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    changePage = (calcData) => {
        const {currentPageNumber, rowsPerPage, searchData, activeHeading, sortingType} = this.state
        const goToPage = currentPageNumber + calcData
        this.props.commonDepartmentAction({tableLoading: true})
        this.props.getDepartmentData(rowsPerPage, goToPage, searchData, activeHeading, sortingType)
        this.setState({
            currentPageNumber: goToPage
        })
    }

    departmentSearchData = (searchData) => {
        const {rowsPerPage, activeHeading, sortingType} = this.state
        this.props.commonDepartmentAction({tableLoading: true})
        this.props.getDepartmentData(rowsPerPage, 1, searchData, activeHeading, sortingType)
        this.props.commonDepartmentAction({currentPageNumber: 1, searchData, searchLoader: true})
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    }

    creationPopUpSecondFieldChangeHandler = (value) => {
        console.log(`creationPopUpSecondField value choosen ${value}`);
    }
    creationPopUpThirdFieldChangeHandler = (checked) => {
        console.log(`switch to ${checked}`);
    }

    /*allSelected*/

    allSelectedUsersOnClickHeadingColumn = (activeHeading, sortingType) => {

        this.setState({
            allSelectedUsersActiveHeading: activeHeading,
            sortingType
        })
    }

    allSelectedUsersOnChangeRowsPerPage = (rowsPerPage) => {
        this.setState({
            rowsPerPage,
            allSelectedUsersCurrentPageNumber: 1
        })
    }

    allSelectedUsersChangePage = (calcData) => {

        const {allSelectedUsersCurrentPageNumber} = this.state
        const goToPage = allSelectedUsersCurrentPageNumber + calcData
        this.setState({
            allSelectedUsersCurrentPageNumber: goToPage
        })
    }

    allSelectedUsersDepartmentSearchData = (e) => {
        const searchData = e.target.value
        this.props.commonDepartmentAction({
            allSelectedUsersCurrentPageNumber: 1,
            allSelectedUsersSearchData: searchData,
            allSelectedUsersSearchLoader: true
        })
        this.setState({
            searchData,
            allSelectedUsersCurrentPageNumber: 1
        })
    }

    /*addableFunc*/
    addUsersOnClickHeadingColumn = (activeHeading, sortingType) => {
        const {createdDepartmentData} = this.props.departmentReducer;

        const {addUsersRowsPerPage, addUsersSearchData, addUsersCurrentPageNumber} = this.state
        this.props.getAddableUsersData(createdDepartmentData.id, addUsersRowsPerPage, addUsersCurrentPageNumber, addUsersSearchData, activeHeading, sortingType)
        this.setState({
            addUsersActiveHeading: activeHeading,
            sortingType
        })
    }

    addUsersOnChangeRowsPerPage = (rowsPerPage) => {
        const {createdDepartmentData} = this.props.departmentReducer;

        this.props.getAddableUsersData(createdDepartmentData.id, rowsPerPage, 1)
        this.setState({
            rowsPerPage,
            addUsersCurrentPageNumber: 1
        })
    }

    addUsersChangePage = (calcData) => {
        const {createdDepartmentData} = this.props.departmentReducer;

        const {addUsersCurrentPageNumber, addUsersRowsPerPage} = this.state
        const goToPage = addUsersCurrentPageNumber + calcData
        this.props.getAddableUsersData(createdDepartmentData.id, addUsersRowsPerPage, goToPage)
        this.setState({
            addUsersCurrentPageNumber: goToPage
        })
    }

    addUsersDepartmentSearchData = (e) => {
        const {createdDepartmentData} = this.props.departmentReducer;

        const {addUsersRowsPerPage, addUsersActiveHeading, addUsersSortingType} = this.state;
        const searchData = e.target.value
        this.props.getAddableUsersData(createdDepartmentData.id, addUsersRowsPerPage, 1, searchData, addUsersActiveHeading, addUsersSortingType)
        this.props.commonDepartmentAction({searchData, addUsersSearchLoader: true})

        this.setState({
            searchData,
            addUsersCurrentPageNumber: 1
        })
    }

    afterClose = () => {
        console.log("afterClose Triggered")
    }

    onRowThisClick = (rowData) => {
        this.setState({
            changeToCreatedView: true,
            commonCreationViewHeaderName: rowData.departments
        })
        this.props.history.push(`/people/department/${rowData._id}`, {headerName: rowData.departments})

        this.props.commonDepartmentAction({commonViewLoader: true, headerNameWhenRouted: rowData.departments})
    }

    onSearchDropdownSelect = () => {
        console.log('SearchDropdownSelect')
    }

    onChangeSearchDropdown = () => {
        console.log('onChangeSearchDropdown')
    }

    importUsersClick = () => {
        this.props.commonTeamReducerAction({importUsersPopUpVisiblity: true})
    }

    importUsersModalCloseHandler = () => {
        this.props.commonTeamReducerAction({importUsersPopUpVisiblity: false})
    }

    startUploadHandler = () => {
        this.props.commonTeamReducerAction({startUploadStatus: 'true'})
        this.props.getImportUserUploadDetails()
    }

    patchImportUserData = (id, mappings, skipFirstRow, uploadType) => {
        let patchData = {
            mappings: mappings,
            skip_first_row: skipFirstRow,
            upload_type: uploadType,
        }
        this.props.commonTeamReducerAction({uploadFileStatus: 'true'});
        this.props.patchImportUsersData(id, patchData)
    }

    onClickUserEditAction = (status) => {
        if (status && !this.props.departmentReducer.editUserDataFormMain.length) {
            this.props.editUserDataForm()
        }
        this.setState({
            formPopUpActive: status
        })
    }

    onClickDepartmentActions = async (actionType) => {
        const {checkedDataKeys, rowsPerPage, currentPageNumber, searchData, activeHeading, sortingType} = this.state
        if (actionType === "edit") {
            this.setState({
                creationPopUpVisibility: true,
                creationPopUpMode: "edit",
                commonCreationViewHeaderName:this.state.editRowName
            })
        } else {
            this.setState({loaderOfDeletePopUp: true})
            await this.props.postCommonDelete("departments", {departments: checkedDataKeys})
            const {postDeletedDataSuccessfulMessage, postDeletedDataSuccessfully, errorMsg} = this.props.commonReducer
            this.props.commonDepartmentAction({tableLoading: true})
            if (postDeletedDataSuccessfully) {
                message.success(postDeletedDataSuccessfulMessage)
                this.props.commonActionForCommonReducer({postDeletedDataSuccessfully: false})
            } else {
                message.error(errorMsg)
            }
            this.props.getDepartmentData(rowsPerPage, currentPageNumber, searchData, activeHeading, sortingType)
            this.setState({checkedDataKeys: [], loaderOfDeletePopUp: false, visibilityOfDeletePopUp: false})
        }
    };


    render() {
        const {departmentColumnData, departmentsData, addableUsersData, totalUsers, addedUsersData, tableColumnsData, viewDecider, commonViewLoader, totalAddableUsers, totalAllSelectedUsers, commonViewHeader, searchLoader, allSelectedUsersSearchLoader, addUsersSearchLoader, editUserDataForm, tableLoading} = this.props.departmentReducer;

        const columnData = tableColumnsData ? filter(tableColumnsData, ele => ele._id !== 'departments') : [];

        const {importUsersPopUpVisiblity, sampleExcelFile, uploadPopUpData, uploadPopUpVisibility, startUploadStatus, uploadFileStatus, importUsersUploadResponseData, isFileUploaded} = this.props.teamViewReducer;

        const {creationPopUpVisibility, showAddUsersPopUp, commonCreationViewHeaderName, changeToCreatedView, formPopUpActive, creationPopUpMode, checkedDataKeys, loaderOfDeletePopUp, visibilityOfDeletePopUp,creationLoader,multiCreationLoader} = this.state;
        return (
            <div className="departments-main">
                {!changeToCreatedView ? <div className={'departments-main-view'}>
                    <div className="departments-heading"><h3>Departments</h3></div>
                    <AllUserSelect allHeadingsData={departmentColumnData} userData={departmentsData || []}
                                   searchPlaceHolder={"Search Department"} searchFirstButtonName={"IMPORT RESOURCES"}
                                   searchFirstButtonClick={this.importUsersClick}
                                   searchSecondButtonName={"ADD DEPARTMENT"} totalUsers={totalUsers}
                                   searchSecondButtonClick={() => this.searchSecondButtonClick(true)} isUserData={false}
                                   onChangeCheckBox={this.onChangeCheckBox}
                                   onChangeRowsPerPage={this.onChangeRowsPerPage}
                                   headingClickData={this.onClickHeadingColumn}
                                   goPrevPage={() => this.changePage(-1)}
                                   goNextPage={() => this.changePage(1)}
                                   onSearch={this.departmentSearchData}
                                   currentPageNumber={this.state.currentPageNumber}
                                   onClickTableRow={this.onRowThisClick}
                                   searchLoader={searchLoader}
                        // onClickUserEdit={() => this.onClickUserEditAction(true)}
                                   addUserPopUpActive={formPopUpActive}
                                   addUserDataForm={editUserDataForm}
                                   showHeaderButtons={[{id: "edit", label: "Edit Department"}, {
                                       id: "delete",
                                       label: "Delete Department"
                                   }]}
                                   disableButtonNames={[checkedDataKeys.length > 1 ? "edit" : ""]}
                                   selectedDataCount={checkedDataKeys.length}
                                   onClickUserDelete={() => this.setState({visibilityOfDeletePopUp: true})}
                                   tableLoading={tableLoading}
                                   onClickUserEdit={() => this.onClickDepartmentActions("edit")}

                    />
                    <ImportUsersPopUp visible={importUsersPopUpVisiblity}
                                      secondButtonClickHandler={this.props.onClickOfDownloadExcel}
                                      sampleExcelFile={sampleExcelFile}
                                      thirdButtonClickHandler={this.importUsersModalCloseHandler}
                                      fourthButtonClickHandler={this.startUploadHandler}
                                      fourthButtonLoaderStatus={startUploadStatus}
                                      importUsersUploadPopUpVisibility={uploadPopUpVisibility}
                                      uploadPopUpData={uploadPopUpData}
                                      importUsersPopUpCloseHandler={() => this.props.commonTeamReducerAction({uploadPopUpVisibility: false})}
                                      patchImportUsersDataHandler={this.patchImportUserData}
                                      importUsersUploadResponseData={importUsersUploadResponseData}
                                      uploadFileLoadingStatus={uploadFileStatus}
                                      isFileUploaded={isFileUploaded}
                                      commonAction={this.props.commonTeamReducerAction}
                    />
                </div> : ""}


                <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                               creationPopUpTitle={creationPopUpMode === "add" ? "Add New Department" : "Edit Department"}
                               creationPopFirstButtonHandler={this.creationPopFirstButtonHandler}
                               creationPopSecondButtonHandler={creationPopUpMode === "add" ? this.creationPopSecondButtonHandler : this.onSaveEditedDepartment}
                               creationPopUpFirstFieldChangeHandler={this.creationPopUpFirstFieldChangeHandler}
                               customField={'default'} fieldHeader={"Department Name"}
                               fieldPlaceHolder={'Enter Department'}
                               secondFieldHeader={`Type`}
                               creationPopUpSecondFieldChangeHandler={this.creationPopUpSecondFieldChangeHandler}
                               thirdFieldHeader={'Required'}
                               creationPopUpThirdFieldChangeHandler={this.creationPopUpThirdFieldChangeHandler}
                               inputValue={commonCreationViewHeaderName}
                               secondButtonDisable={!commonCreationViewHeaderName ? true : false}
                               thirdButtonDisable={!commonCreationViewHeaderName ? true : false}
                               afterClose={this.afterClose}
                               inputMaxLength={50}
                               creationPopSecondButtonName={creationPopUpMode === "add" ? "Create" : "Save"}
                               creationPopThirdButtonHandler={this.creationPopThirdButtonHandler}
                               creationPopUpMode={creationPopUpMode}
                               creationPopSecondButtonLoader={creationLoader}
                               creationPopThirdButtonLoader={multiCreationLoader}
                />


                {/*<CreationPopViewCombined creationPopUpVisibility={creationPopUpVisibility}
                    //implies the visibility status of creation PopUP = boolean
                                         creationPopFirstButtonHandler={this.creationPopFirstButtonHandler}
                    //function that gets invoked on click of the the first button of create pop
                                         creationPopSecondButtonHandler={creationPopUpMode === "add" ? this.creationPopSecondButtonHandler : this.onSaveEditedDepartment}
                    //function that gets invoked on click of the second button of create popup
                                         creationPopUpFirstFieldChangeHandler={this.creationPopUpFirstFieldChangeHandler}
                    //function that gets invoked for first fieldType (input) of the creation popup
                                         fieldHeader={"Department Name"}
                    //value for fieldType header
                                         fieldPlaceHolder={'Enter Department'}
                    //value for fieldType placeholder
                                         secondFieldHeader={`Type`}
                    //value for second fieldType header
                                         creationPopUpSecondFieldChangeHandler={this.creationPopUpSecondFieldChangeHandler}
                    //function that gets invoked for second fieldType (select) of the creation popup
                                         thirdFieldHeader={'Required'}
                    //value for third fieldType header
                                         creationPopUpThirdFieldChangeHandler={this.creationPopUpThirdFieldChangeHandler}
                    //function that gets invoked for third fieldType (toggle) of the creation popup
                                         customField={'default'} // custom field type ('add' or 'edit') that implies the type of fields that can be added
                                         secondButtonDisable={!commonCreationViewHeaderName ? true : false}
                                         afterClose={this.afterClose}
                                         inputValue={commonCreationViewHeaderName}
                                         inputMaxLength={50}
                    //maximum number of charecters a user can enter in the input field
                                         creationPopUpTitle={creationPopUpMode === "add" ? "Add New Designation" : "Edit Designation"}
                                         creationPopSecondButtonName={creationPopUpMode === "add" ? "Create" : "Save"}


                    // *end of CreationPopUp props*
                                         commonCreationViewBackButtonClick={this.commonCreationViewBackButtonClick}
                    //function that gets invoked on click of the back button of commonCreationView
                                         commonCreationViewHeaderName={commonCreationViewHeaderName || commonViewHeader}
                    //name of the header (usually the value obtained from first fieldType of creation popu)
                                         backButton={true}
                    //implies whether back button is required or not = boolean
                                         viewDecider={viewDecider}
                    //implies value(true or false or 0 or 1) that dicides whether to show the AddUsersCommonCardView or AllUserSelectTable
                                         addUsersCommonCardButtonClick={this.addUsersCommonCardButtonClick}
                    //function that gets invoked on click of the addUsersCommonCardButton
                                         allSelectedUsersHeadingsData={columnData}
                    //column data (array) for allHeadingsData of AllUsersSelect
                                         allSelectedUsersUsersData={addedUsersData ? addedUsersData.result : []}
                    //users data (array) for userData AllUsersSelect
                                         allSelectedUsersTotalUsers={totalAllSelectedUsers}
                    //total count of users for totalUsers AllUsersSelect
                                         allSelectedUsersIsUserData={true}
                    //boolean value for isUserData of AllUsersSelect
                                         allSelectedUsersAllSelect={true}
                    //boolean value to show suggestion search kind of component
                                         allSelectedUsersOnChangeCheckBox={this.allSelectedUsersOnChangeCheckBox}
                    //function that gets invoked on click of checkbox of AllUsersSelect
                                         allSelectedUsersOnlySelectAndAdd={true}
                    //boolean value for onlySelectAndAdd AllUsersSelect
                                         allSelectedUsersFirstButtonClick={this.allSelectedUsersFirstButtonClick}
                    //function that gets invoked on click of first button of AllUsersSelect
                                         allSelectedUsersOnClickHeadingColumn={this.allSelectedUsersOnClickHeadingColumn}
                    //function that gets invoked for headingClickData of AllUsersSelect
                                         allSelectedUsersOnChangeRowsPerPage={this.allSelectedUsersOnChangeRowsPerPage}
                    //function that gets invoked for onChangeRowsPerPage of AllUsersSelect
                                         allSelectedUsersChangePage={this.allSelectedUsersChangePage}
                    //function that gets invoked for goNextPage of AllUsersSelect
                                         allSelectedUsersSearchData={this.allSelectedUsersDepartmentSearchData}
                    //function that gets invoked for onSearch of AllUsersSelect
                                         allSelectedUsersSearchLoader={allSelectedUsersSearchLoader}
                    //boolean value for the search loader in AllUsers of AllUsersSelect
                                         allSelectedUsersCurrentPageNumber={this.state.allSelectedUsersCurrentPageNumber}
                    //value for currentPageNumber of AllUsersSelect
                                         showAddUsersPopUp={showAddUsersPopUp}
                    //boolean value that enables the visibility of AddUsersPopUp
                                         addUsersPopUpClose={this.addUsersPopUpClose}
                    //function that gets invoked on click of close icon of AddUsersPopUp
                                         addUsersPopUpFirstButtonClick={this.addUsersPopUpFirstButtonClick}
                    //function that gets invoked on click of first button of AddUsersPopUp
                                         addUsersPopUpOnChangeCheckBox={this.addUsersPopUpOnChangeCheckBox}
                    //function that gets invoked on click of checkbox of AddUsersPopUp
                                         addUsersPopUpTableColumnsData={tableColumnsData}
                    //column data (array) for allHeadingsData of AllUsersSelect of AddUsersPopUp
                                         addUsersPopUpUsersData={addableUsersData}
                    //users data (array) for userData of AllUsersSelect of AddUsersPopUp
                                         addUsersPopUpTotalUsers={totalAddableUsers}
                    //total count of users for totalUsers of AllUsersSelect of AddUsersPopUp
                                         addUsersPopUpIsUserData={true}
                    //boolean value for isUserData of AllUsersSelect of AddUsersPopUp
                                         addUsersPopUpOnlySelectAndAdd={true}
                    //boolean value for onlySelectAndAdd of AllUsersSelect of AddUsersPopUp
                                         addUsersOnClickHeadingColumn={this.addUsersOnClickHeadingColumn}
                    //function that gets invoked for headingClickData of AllUsersSelect of AddUsers Component
                                         addUsersOnChangeRowsPerPage={this.addUsersOnChangeRowsPerPage}
                    //function that gets invoked for onChangeRowsPerPage of AllUsersSelect of AddUsers Component
                                         addUsersChangePage={this.addUsersChangePage}
                    //function that gets invoked for goNextPage of AllUsersSelect of AddUsers Component
                                         addUsersSearchData={this.addUsersDepartmentSearchData}
                    //function that gets invoked for onSearch of AllUsersSelect of AddUsers Component
                                         addUsersSearchLoader={addUsersSearchLoader}
                    //boolean value for search loader of AddUsers of AllUsersSelect component
                                         addUsersCurrentPageNumber={this.state.addUsersCurrentPageNumber}
                    //value for currentPageNumber of AllUsersSelect of AddUsers Component
                                         changeToCreatedView={changeToCreatedView}
                    //boolean value to shift to CommonCreationView
                                         commonViewLoader={commonViewLoader}
                    //boolean value for viewChanging - loader
                                         allSelectedUsersOnSearchDropdownSelect={this.onSearchDropdownSelect}
                                         allSelectedUsersSearchDropdownPlaceholder={'Search and Add'}
                                         allSelectedUsersSearchDropdownData={[]}
                                         allSelectedUsersOnChangeSearchDropdown={this.onChangeSearchDropdown}

                    // *end of CommonCreationView props*
                />*/}
                <Modal // used this modal for confirmation before deleting department items
                    title={`Delete Designation(s)`}
                    visible={visibilityOfDeletePopUp}
                    onOk={() => this.onClickDepartmentActions("delete")}
                    confirmLoading={loaderOfDeletePopUp}
                    onCancel={() => this.setState({visibilityOfDeletePopUp: false})}
                    centered
                    closable
                    okText={"Delete"}
                    maskClosable={false}
                    okType={"danger"}
                    wrapClassName={"departments-delete-popup"}
                    destroyOnClose={true}>
                    <p>{`Are you sure you want to delete the selected ${checkedDataKeys.length} Designation(s)`}</p>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        departmentReducer: state.departmentReducer,
        teamViewReducer: state.teamViewReducer,
        commonReducer: state.commonReducer

    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDepartmentData,
            commonDepartmentAction,
            getDeptTableColumnData,
            postCreateDeptData,
            getAddableUsersData,
            onClickOfDownloadExcel,
            getImportUserUploadDetails,
            commonTeamReducerAction,
            patchImportUsersData,
            editUserDataForm,
            patchCommonCreateData,
            postCommonCreateData,
            commonActionForCommonReducer, postCommonDelete
        },
        dispatch
    );
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Departments))






