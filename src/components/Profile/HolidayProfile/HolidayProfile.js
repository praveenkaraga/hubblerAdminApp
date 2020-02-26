import React, {Component} from "react";
import './holidayProfile.scss'
import AllUserSelect from '../../common/allUserSelect/allUserSelect'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    commonHolidayAction,
    getHolidayTableColumnData,
    getHolidayProfileData,
    postProfileCommonDelete,commonActionForCommonProfileReducer,patchCommonCreatedData,postCommonProfileCreatedData
    /*postCreateDeptData,
    getAddableUsersData,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    patchImportUsersData, editUserDataForm*/
} from "../../../store/actions/ProfileActions/profileActions";
import {withRouter} from "react-router-dom";
import CreationPopUp from '../../common/CreationPopUp/CreationPopUp'
import {message, Modal} from "antd";
import isEmpty from "lodash/isEmpty";


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
            visibilityOfDeletePopUp: false,
            loaderOfDeletePopUp: false,
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
        /*const { newHolidayName } = this.state;
        await this.props.postCommonProfileCreatedData("holiday","holiday-profiles", { name: newHolidayName });
        const { newDataCreatedSuccessfully, newCreatedDataId, errorMsg ,createdProfileData} = this.props.commonProfileReducer; // will be true if success is true from above post api and pop up will be closed
        if (newDataCreatedSuccessfully) {
            this.setState({ creationPopUpVisibility: false });
            message.success("Holiday Profile Created Successfully");
            this.props.commonActionForCommonReducer({ newDataCreatedSuccessfully: false });
            this.props.history.push(`/profile/holidayProfile/${newCreatedDataId}`)
        } else {
            message.error(errorMsg);
        }
*/

        const { newHolidayName, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType } = this.state
        let data = { name: newHolidayName};
        await this.props.postCommonProfileCreatedData("holiday","holiday-profiles", data);
        const {errorMsg ,createdProfileData} = this.props.commonProfileReducer; // will be true if success is true from above post api and pop up will be closed
        if (!isEmpty(createdProfileData)) {
            this.setState({ creationPopUpVisibility: false, newHolidayName: '' })
            message.success("Holiday Profile Created Successfully");
            this.props.commonActionForCommonProfileReducer({ newDataCreatedSuccessfully: false })
            this.props.getHolidayProfileData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        } else {
            message.error(errorMsg);
        }
    };

    onSaveEditedHoliday = async () => {
        const { newHolidayName, editRowId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType } = this.state
        await this.props.patchCommonCreatedData("holiday","holiday-profiles", editRowId, { name: newHolidayName });
        const { patchDataCreatedSuccessfully, patchSuccessMessage, errorMsg } = this.props.commonProfileReducer
        if (patchDataCreatedSuccessfully) {
            this.setState({ creationPopUpVisibility: false, checkedDataKeys: [] });
            message.success(patchSuccessMessage || "Saved Successfully");
            this.props.commonActionForCommonProfileReducer({ newDataCreatedSuccessfully: false });
            this.props.getHolidayProfileData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        } else {
            message.error(errorMsg);
        }
    };

    onClickHolidayActions = async (actionType) => {
        const { checkedDataKeys, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType } = this.state
        if (actionType === "edit") {
            this.setState({ creationPopUpVisibility: true, creationPopUpMode: "edit", commonCreationViewHeaderName : this.state.editRowName   })
        } else {
            this.setState({ loaderOfDeletePopUp: true })
            await this.props.postProfileCommonDelete("holiday", { ids: checkedDataKeys })
            const { postDeletedDataSuccessfulMessage, postDeletedDataSuccessfully, errorMsg } = this.props.commonProfileReducer
            if (postDeletedDataSuccessfully) {
                message.success(postDeletedDataSuccessfulMessage)
                this.props.getHolidayProfileData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
                this.props.commonActionForCommonProfileReducer({ postDeletedDataSuccessfully: false })
            } else {
                message.error(errorMsg)
                this.props.getHolidayProfileData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
            }
            this.setState({ checkedDataKeys: [],loaderOfDeletePopUp: false, visibilityOfDeletePopUp: false})
        }

    };

    render() {
        const {holidayColumnData, holidayProfilesData, totalUsers, searchLoader} = this.props.holidayReducer
        const {creationPopUpVisibility,creationPopUpMode,newHolidayName,editRowName,checkedDataKeys,loaderOfDeletePopUp,visibilityOfDeletePopUp} = this.state;
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
                               onClickUserDelete={() => this.setState({ visibilityOfDeletePopUp: true })}
                               onClickUserEdit={() => this.onClickHolidayActions("edit")}/>

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

                <Modal // used this modal for confirmation before deleting department items
                    title={`Delete Holiday(s)`}
                    visible={visibilityOfDeletePopUp}
                    onOk={() => this.onClickHolidayActions("delete")}
                    confirmLoading={loaderOfDeletePopUp}
                    onCancel={() => this.setState({ visibilityOfDeletePopUp: false })}
                    centered
                    closable
                    okText={"Delete"}
                    maskClosable={false}
                    okType={"danger"}
                    wrapClassName={"departments-delete-popup"}
                    destroyOnClose={true}>
                    <p>{`Are you sure you want to delete the selected ${checkedDataKeys.length} Holiday(s)`}</p>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        holidayReducer: state.holidayReducer,
        commonProfileReducer : state.commonProfileReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            commonHolidayAction,
            getHolidayTableColumnData,
            getHolidayProfileData,postProfileCommonDelete,commonActionForCommonProfileReducer,patchCommonCreatedData,postCommonProfileCreatedData
            /*postCreateDeptData, getAddableUsersData,
            onClickOfDownloadExcel,
            getImportUserUploadDetails,
            patchImportUsersData, editUserDataForm*/
        },
        dispatch
    );
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(HolidayProfile))


