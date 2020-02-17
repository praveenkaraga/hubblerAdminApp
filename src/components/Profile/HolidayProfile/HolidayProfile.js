import React, {Component} from "react";
import './holidayProfile.scss'
import AllUserSelect from '../../common/allUserSelect/allUserSelect'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    commonHolidayAction,
    getHolidayTableColumnData,
    getHolidayProfileData,
    postCreateDeptData,
    getAddableUsersData,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    patchImportUsersData, editUserDataForm
} from "../../../store/actions/PeopleActions/peopleActions";
import {withRouter} from "react-router-dom";
import CreationPopUp from '../../common/CreationPopUp/CreationPopUp'
import {message} from "antd";


class HolidayProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeHeading: "",
            sortingType: "",
            searchData: "",
            creationPopUpVisibility : false,
            creationPopUpMode: 'add',
            newHolidayName : '',
            checkedDataKeys: [],
        }
    }

    componentDidMount() {
        this.props.getHolidayTableColumnData();
        this.props.getHolidayProfileData(30)
    }

    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        let editRowName = "";
        let editRowId = "";

        if (selectedRows[0]) {
            editRowName = selectedRows[0].holiday_profile;
            editRowId = selectedRows[0]._id
        }
        this.setState({
            checkedDataKeys: selectedRowsKeys,
            editRowName,
            editRowId,
            newHolidayName: editRowName
        })
    };

    onClickHeadingColumn = (activeHeading, sortingType) => {
        const {rowsPerPage, searchData, currentPageNumber} = this.state
        const activeHeadingModified = activeHeading === "departments" ? "name" : "count"
        this.props.getHolidayProfileData(rowsPerPage, currentPageNumber, searchData, activeHeadingModified, sortingType)
        this.setState({
            activeHeading: activeHeadingModified,
            sortingType
        })
    };

    onChangeRowsPerPage = (rowsPerPage) => {
        this.props.getHolidayProfileData(rowsPerPage, 1)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    };

    changePage = (calcData) => {
        const {currentPageNumber, rowsPerPage} = this.state
        const goToPage = currentPageNumber + calcData
        this.props.getHolidayProfileData(rowsPerPage, goToPage)
        this.setState({
            currentPageNumber: goToPage
        })
    };

    holidaySearchData = (e) => {
        const {rowsPerPage, activeheading, sortingType} = this.state
        const searchData = e.target.value
        this.props.getHolidayProfileData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.props.commonHolidayAction({currentPageNumber: 1, searchData, searchLoader: true})
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    };

    creationPopUpInput = (e) => {
        const { editRowName } = this.state;
        const inputData = e.target.value;
        this.setState({ newHolidayName: inputData, editRowName: inputData ? editRowName : "" })
    };

    onSaveNewHoliday = async () => {
        const { newHolidayName } = this.state;
        await this.props.postCommonCreateData("holiday", { name: newHolidayName });

        const { newDataCreatedSuccessfully, newCreatedDataId, errorMsg } = this.props.commonReducer; // will be true if success is true from above post api and pop up will be closed
        if (newDataCreatedSuccessfully) {
            this.setState({ creationPopUpVisibility: false });
            message.success("Holiday Profile Created Successfully");
            this.props.commonActionForCommonReducer({ newDataCreatedSuccessfully: false });
            this.props.history.push(`/profile/holidayProfile/${newCreatedDataId}`)
        } else {
            message.error(errorMsg);
        }
    };

    onSaveEditedHoliday = async () => {
        const { newHolidayName, editRowId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType } = this.state
        await this.props.patchCommonCreateData("holiday", editRowId, { name: newHolidayName });
        const { patchDataCreatedSuccessfully, patchSuccessMessage, errorMsg } = this.props.commonReducer
        if (patchDataCreatedSuccessfully) {
            this.setState({ creationPopUpVisibility: false, checkedDataKeys: [] });
            message.success(patchSuccessMessage || "Saved Successfully");
            this.props.commonActionForCommonReducer({ newDataCreatedSuccessfully: false });
            this.props.designationsData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        } else {
            message.error(errorMsg);
        }
    };

    onClickDepartmentActions = (actionType) => {
        this.setState({ creationPopUpVisibility: true, creationPopUpMode: "edit" })
    };

    render() {
        const {holidayColumnData, holidayProfilesData, totalUsers, searchLoader} = this.props.holidayReducer
        const {creationPopUpVisibility,creationPopUpMode,newHolidayName,editRowName,checkedDataKeys} = this.state;
        console.log(holidayProfilesData);
        return (
            <div className="holiday-profile-main">
                <div className="holiday-profile-heading"><h3>Holiday Profiles</h3></div>
                <AllUserSelect allHeadingsData={holidayColumnData} userData={holidayProfilesData || []}
                               isUserData={false} totalUsers={totalUsers}
                               searchSecondButtonName={"ADD HOLIDAY"}
                               searchSecondButtonClick={() => this.setState({ creationPopUpVisibility: true, creationPopUpMode: "add" })}
                               onChangeCheckBox={this.onChangeCheckBox}
                               onChangeRowsPerPage={this.onChangeRowsPerPage}
                               headingClickData={this.onClickHeadingColumn}
                               goPrevPage={() => this.changePage(-1)}
                               goNextPage={() => this.changePage(1)}
                               onSearch={this.holidaySearchData}
                               currentPageNumber={this.state.currentPageNumber}
                               onClickTableRow={this.onRowThisClick}
                               searchLoader={searchLoader}
                               showHeaderButtons={[{ id: "edit", label: "Edit Holiday" }, { id: "delete", label: "Delete Holiday" }, { id: "duplicate", label: "Duplicate Holiday" }]}
                               disableButtonNames={[checkedDataKeys.length > 1 ? "edit" : ""]}
                               selectedDataCount={checkedDataKeys.length}
                               onClickUserDelete={() => this.onClickDepartmentActions("delete")}
                               onClickUserEdit={() => this.onClickDepartmentActions("edit")}/>

                <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                               creationPopUpTitle={creationPopUpMode === "add" ? "Add New Holiday Profile" : "Edit Holiday Profile"}
                               creationPopFirstButtonName={"Cancel"}
                               creationPopSecondButtonName={creationPopUpMode === "add" ? "Create" : "Save"}
                               fieldHeader={"Profile Name"}
                               fieldPlaceHolder={"Enter Holiday Profile"}
                               inputValue={newHolidayName || editRowName}
                               creationPopFirstButtonHandler={() => this.setState({ creationPopUpVisibility: false })}
                               creationPopSecondButtonHandler={creationPopUpMode === "add" ? this.onSaveNewHoliday : this.onSaveEditedHoliday}
                               secondButtonDisable={newHolidayName.length < 3 || newHolidayName === editRowName ? true : false}
                               afterClose={() => this.setState({ newHolidayName: "" })}
                               creationPopUpFirstFieldChangeHandler={this.creationPopUpInput}
                />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        holidayReducer: state.holidayReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            commonHolidayAction,
            getHolidayTableColumnData,
            getHolidayProfileData,
            postCreateDeptData, getAddableUsersData,
            onClickOfDownloadExcel,
            getImportUserUploadDetails,
            patchImportUsersData, editUserDataForm
        },
        dispatch
    );
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(HolidayProfile))


