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
    postAddSelectedUsers,
    getAddSelectedUsersPostedData,
    getAddableUsersData,
    getTableColumnsData,
    getCommonViewHeaderName,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    commonTeamReducerAction,
    patchImportUsersData,editUserDataForm
} from "../../store/actions/actions";
import AllUserSelect from '../allUserSelect/allUserSelect'
import filter from "lodash/filter";
import CreationPopViewCombined from '../common/CreationPopViewCombined/CreationPopViewCombined'
import {withRouter} from "react-router-dom";
import ImportUsersPopUp from '../../components/common/ImportUsersPopUp/ImportUsersPopUp'


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
            formPopUpActive:false,
        }
    }

    componentDidMount() {
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

    onChangeCheckBox = (value) => {
        console.log(value)
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
        this.props.getTableColumnsData();
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
        this.props.postAddSelectedUsers(data);

        this.props.getAddSelectedUsersPostedData(createdDepartmentData.id)
    };

    onChangeAddUsersCheckBox = (value) => {
        this.setState({
            usersIdArray: value,
        })
    };

    //retain this
    searchSecondButtonClick = (status) => {
        this.setState({
            creationPopUpVisibility: true

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
        let data = {name: this.state.commonCreationViewHeaderName};
        await this.props.postCreateDeptData(data);
        if (!isEmpty(this.props.departmentReducer.createdDepartmentData)) {
            this.props.history.push(`/people/department/${this.props.departmentReducer.createdDepartmentData.id}`, {headerName: this.props.departmentReducer.createdDepartmentData.result.name})
        }
        this.setState({
            changeToCreatedView: true,
            creationPopUpVisibility: false,
        })
    }

    creationPopUpFirstFieldChangeHandler = (e) => {
        const inputData = e.target.value
        this.setState({
            commonCreationViewHeaderName: inputData
        })
    };


    addUsersCommonCardButtonClick = () => {
        const {createdDepartmentData} = this.props.departmentReducer;
        this.setState({
            showAddUsersPopUp: true,
        });
        this.props.getTableColumnsData();

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
        this.props.postAddSelectedUsers(data);
        this.props.commonDepartmentAction({commonViewLoader: true})
        this.props.getAddSelectedUsersPostedData(createdDepartmentData.id)
    };

    addUsersPopUpOnChangeCheckBox = (value) => { //onChangeAddUsersCheckBox
        this.setState({
            usersIdArray: value,
        })
    };


    onClickHeadingColumn = (activeHeading, sortingType) => {
        const {rowsPerPage, searchData, currentPageNumber} = this.state
        const activeHeadingModified = activeHeading === "departments" ? "name" : "count"
        this.props.getDepartmentData(rowsPerPage, currentPageNumber, searchData, activeHeadingModified, sortingType)
        this.setState({
            activeHeading: activeHeadingModified,
            sortingType
        })
    }

    onChangeRowsPerPage = (rowsPerPage) => {
        this.props.getDepartmentData(rowsPerPage, 1)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    changePage = (calcData) => {
        const {currentPageNumber, rowsPerPage} = this.state
        const goToPage = currentPageNumber + calcData
        this.props.getDepartmentData(rowsPerPage, goToPage)
        this.setState({
            currentPageNumber: goToPage
        })
    }

    departmentSearchData = (e) => {
        const {rowsPerPage, activeheading, sortingType} = this.state
        const searchData = e.target.value
        this.props.getDepartmentData(rowsPerPage, 1, searchData, activeheading, sortingType)
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
        const {createdDepartmentData} = this.props.departmentReducer;

        const {allSelectedUsersRowsPerPage, allSelectedUsersSearchData, allSelectedUsersCurrentPageNumber} = this.state
        this.props.getAddSelectedUsersPostedData(createdDepartmentData.id, allSelectedUsersRowsPerPage, allSelectedUsersCurrentPageNumber, allSelectedUsersSearchData, activeHeading, sortingType)
        this.setState({
            allSelectedUsersActiveHeading: activeHeading,
            sortingType
        })
    }

    allSelectedUsersOnChangeRowsPerPage = (rowsPerPage) => {
        const {createdDepartmentData} = this.props.departmentReducer;

        this.props.getAddSelectedUsersPostedData(createdDepartmentData.id, rowsPerPage, 1)
        this.setState({
            rowsPerPage,
            allSelectedUsersCurrentPageNumber: 1
        })
    }

    allSelectedUsersChangePage = (calcData) => {
        const {createdDepartmentData} = this.props.departmentReducer;

        const {allSelectedUsersCurrentPageNumber, allSelectedUsersRowsPerPage} = this.state
        const goToPage = allSelectedUsersCurrentPageNumber + calcData
        this.props.getAddSelectedUsersPostedData(createdDepartmentData.id, allSelectedUsersRowsPerPage, goToPage)
        this.setState({
            allSelectedUsersCurrentPageNumber: goToPage
        })
    }

    allSelectedUsersDepartmentSearchData = (e) => {
        const {createdDepartmentData} = this.props.departmentReducer;

        const {allSelectedUsersRowsPerPage, allSelectedUsersActiveHeading, allSelectedUsersSortingType} = this.state
        const searchData = e.target.value
        this.props.getAddSelectedUsersPostedData(createdDepartmentData.id, allSelectedUsersRowsPerPage, 1, searchData, allSelectedUsersActiveHeading, allSelectedUsersSortingType)
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
        console.log("nn")
    }

    onRowThisClick = (rowData) => {
        this.setState({
            changeToCreatedView: true,
            commonCreationViewHeaderName: rowData.departments
        })
        this.props.history.push(`/people/department/${rowData._id}`, {headerName: rowData.departments})

        this.props.commonDepartmentAction({commonViewLoader: true, headerNameWhenRouted: rowData.departments})

        // await this.props.getCommonViewHeaderName(rowData._id)
        this.props.getTableColumnsData();
        this.props.getAddSelectedUsersPostedData(rowData._id)
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


    render() {
        const {departmentColumnData, departmentsData, addableUsersData, totalUsers, addedUsersData, tableColumnsData, viewDecider, commonViewLoader, totalAddableUsers, totalAllSelectedUsers, commonViewHeader, searchLoader, allSelectedUsersSearchLoader, addUsersSearchLoader,editUserDataForm} = this.props.departmentReducer;

        const columnData = tableColumnsData ? filter(tableColumnsData, ele => ele._id !== 'departments') : [];

        const {importUsersPopUpVisiblity, sampleExcelFile, uploadPopUpData, uploadPopUpVisibility, startUploadStatus, uploadFileStatus, importUsersUploadResponseData, isFileUploaded} = this.props.teamViewReducer;

        const {creationPopUpVisibility, showAddUsersPopUp, commonCreationViewHeaderName, changeToCreatedView,formPopUpActive} = this.state;
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
                                   onClickUserEdit={() => this.onClickUserEditAction(true)}
                                   addUserPopUpActive={formPopUpActive}
                                   addUserDataForm={editUserDataForm}

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
                                      patchImportUsersData={this.patchImportUserData}
                                      importUsersUploadResponseData={importUsersUploadResponseData}
                                      uploadFileLoadingStatus={uploadFileStatus}
                                      isFileUploaded={isFileUploaded}
                    />
                </div> : ""}

                <CreationPopViewCombined creationPopUpVisibility={creationPopUpVisibility}
                    //implies the visibility status of creation PopUP = boolean
                                         creationPopFirstButtonHandler={this.creationPopFirstButtonHandler}
                    //function that gets invoked on click of the the first button of create pop
                                         creationPopSecondButtonHandler={this.creationPopSecondButtonHandler}
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
                                         customField={'edit'} // custom field type ('add' or 'edit') that implies the type of fields that can be added
                                         secondButtonDisable={!commonCreationViewHeaderName ? true : false}
                                         afterClose={this.afterClose}
                                         inputValue={commonCreationViewHeaderName}

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
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        departmentReducer: state.departmentReducer,
        teamViewReducer: state.teamViewReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDepartmentData,
            commonDepartmentAction,
            getDeptTableColumnData,
            postCreateDeptData,
            postAddSelectedUsers,
            getAddSelectedUsersPostedData,
            getAddableUsersData,
            getTableColumnsData,
            getCommonViewHeaderName,
            onClickOfDownloadExcel,
            getImportUserUploadDetails,
            commonTeamReducerAction, patchImportUsersData,editUserDataForm
        },
        dispatch
    );
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Departments))






