import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import './commonLandingView.scss'
import AllUserSelect from '../../common/allUserSelect/allUserSelect'
import {columnData} from '../commonLandingView/columnData'
import {
    getCommonProfilesLandingViewTableData,
    commonActionForCommonProfileReducer,
    commonActionsOnProfileData
} from '../../../store/actions/ProfileActions/profileActions'
import {capitalFirstLetter} from '../../../utils/helper'
import {Modal, message} from 'antd'
import VehicleReimCreatePopUp from '../../common/VehicleReimCreatePopUp/VehicleReimCreatePopUp'


class CommonLandingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTypeEdited: "", //for api call
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeheading: "",
            sortingType: "",
            searchData: "",

            checkedDataKeys: [],
            editRowName: "",
            editRowId: "",
            editRowNewName: "",
            typeOfActionOnProfile: "",
            visibilityOfConfirmationPopUp: false,
            loaderOfConfirmationPopUp: false
        }
    }


    componentDidMount() {
        const {viewType} = this.props
        this.props.commonActionForCommonProfileReducer({tableLoading: true})
        this.props.getCommonProfilesLandingViewTableData(viewType.replace("ing_day", "days"), 30)
        this.setState({viewTypeEdited: viewType.replace("ing_day", "days")})
    }

    onClickHeadingColumn = (activeheading, sortingType) => {
        const {viewTypeEdited, rowsPerPage, searchData, currentPageNumber} = this.state
        this.props.commonActionForCommonProfileReducer({tableLoading: true})
        this.props.getCommonProfilesLandingViewTableData(viewTypeEdited, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        this.setState({
            activeheading,
            sortingType
        })
    }

    //on change of rows per page of the table
    onChangeRowsPerPage = (rowsPerPage) => {
        const {viewTypeEdited, searchData, activeheading, sortingType} = this.state
        this.props.commonActionForCommonProfileReducer({tableLoading: true})
        this.props.getCommonProfilesLandingViewTableData(viewTypeEdited, rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    //on change of pages of the table
    changePage = (calcData) => {
        const {viewTypeEdited, currentPageNumber, rowsPerPage, searchData, activeheading, sortingType} = this.state
        const goToPage = currentPageNumber + calcData
        this.props.commonActionForCommonProfileReducer({tableLoading: true})
        this.props.getCommonProfilesLandingViewTableData(viewTypeEdited, rowsPerPage, goToPage, searchData, activeheading, sortingType)
        this.setState({
            currentPageNumber: goToPage
        })
    }

    //on search in the designaiton table
    onSearchProfile = (searchData) => {
        const {viewTypeEdited, rowsPerPage, activeheading, sortingType} = this.state

        this.props.getCommonProfilesLandingViewTableData(viewTypeEdited, rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    }


    commonProfileLandingViewSearch = (searchData) => {
        const {viewTypeEdited, rowsPerPage, activeheading, sortingType} = this.state
        this.props.commonActionForCommonProfileReducer({searchLoader: true})
        this.props.getCommonProfilesLandingViewTableData(viewTypeEdited, rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    }


    //on select and unselect of checkbox
    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        let editRowName = ""
        let editRowId = ""

        if (selectedRows[0]) { // saving data of latest selected one
            editRowName = selectedRows[0].name
            editRowId = selectedRows[0]._id
        }
        this.setState({
            checkedDataKeys: selectedRowsKeys,
            editRowName,
            editRowId,
            editRowNewName: editRowName
        })
    }

    onClickProfileLandingViewActions = async (type) => {
        const {checkedDataKeys, viewTypeEdited, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType} = this.state
        if (type === "edit") {

        } else {
            this.setState({loaderOfConfirmationPopUp: true})
            await this.props.commonActionsOnProfileData(viewTypeEdited, type === "duplicate" ? "copy" : type, {ids: checkedDataKeys})

            const {landingViewProfileActionSuccess, landingViewProfileActionSuccessMessage, errorMsg} = this.props.commonProfileReducer
            if (landingViewProfileActionSuccess) {
                message.success(landingViewProfileActionSuccessMessage)
            } else {
                message.error(errorMsg)
            }
            this.setState({loaderOfConfirmationPopUp: false, visibilityOfConfirmationPopUp: false, checkedDataKeys: []})
            this.props.commonActionForCommonProfileReducer({tableLoading: true, landingViewProfileActionSuccess: false})
            this.props.getCommonProfilesLandingViewTableData(viewTypeEdited, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)

        }
    }

    render() {
        const {viewType} = this.props
        const {profileLandingDataCount, profileLandingData, tableLoading, searchLoader} = this.props.commonProfileReducer
        const {currentPageNumber, checkedDataKeys, typeOfActionOnProfile, visibilityOfConfirmationPopUp, loaderOfConfirmationPopUp} = this.state
        const viewTypeSpaceLetter = viewType.replace("_", " ")
        const viewTypeCapitalLetter = viewTypeSpaceLetter.toLocaleUpperCase()
        const viewTypeFirstLetterCapital = capitalFirstLetter(viewTypeSpaceLetter)
        return (
            <div className="commonLandingView_main">
                <div className="commonLandingView-heading"><h3>{`${viewTypeSpaceLetter} Profiles`}</h3></div>


                <AllUserSelect
                    allHeadingsData={columnData(viewType)}
                    userData={profileLandingData}
                    totalUsers={profileLandingDataCount}
                    isUserData={false}
                    headingClickData={this.onClickHeadingColumn}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                    tableLoading={tableLoading}
                    goPrevPage={() => this.changePage(-1)}
                    goNextPage={() => this.changePage(1)}
                    currentPageNumber={currentPageNumber}
                    onSearch={this.commonProfileLandingViewSearch}
                    debounceTimeUserSearch={300}
                    selectedDataCount={checkedDataKeys.length}
                    onChangeCheckBox={this.onChangeCheckBox}
                    searchSecondButtonName={`ADD ${viewTypeCapitalLetter} PROFILE`}
                    searchSecondButtonClick={() => this.setState({
                        creationPopUpVisibility: true,
                        creationPopUpMode: "add"
                    })}
                    showHeaderButtons={[{id: "edit", label: `Edit ${viewTypeFirstLetterCapital} Profile`},
                        {id: "delete", label: `Delete ${viewTypeFirstLetterCapital} Profile`},
                        !(viewType === "tracking") ? {
                            id: "duplicate",
                            label: `Duplicate ${viewTypeFirstLetterCapital} Profile`
                        } : {}]}
                    disableButtonNames={checkedDataKeys.length > 1 ? ["edit", "duplicate"] : []} // when more than one selected..disabling the edit and duplicate button
                    onClickUserDelete={() => this.setState({
                        visibilityOfConfirmationPopUp: true,
                        typeOfActionOnProfile: "delete"
                    })}
                    onClickUserEdit={() => this.onClickProfileLandingViewActions("edit")}
                    onClickUserDuplicate={() => this.setState({
                        visibilityOfConfirmationPopUp: true,
                        typeOfActionOnProfile: "duplicate"
                    })}
                    //  onClickTableRow={this.onRowThisClick}
                    searchLoader={searchLoader}
                />

{/*
                <VehicleReimCreatePopUp createNewVisibility={true}/>
*/}

                {/*

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
                /> */}

                <Modal //used this modal for confirmation before doing any action on Profiles
                    title={`${capitalFirstLetter(typeOfActionOnProfile)} ${viewTypeFirstLetterCapital} ${checkedDataKeys.length > 1 ? "Profiles" : "Profile"}`}
                    visible={visibilityOfConfirmationPopUp}
                    onOk={() => this.onClickProfileLandingViewActions(typeOfActionOnProfile)}
                    confirmLoading={loaderOfConfirmationPopUp}
                    onCancel={() => this.setState({visibilityOfConfirmationPopUp: false})}
                    centered
                    closable
                    okText={typeOfActionOnProfile.toUpperCase()}
                    maskClosable={false}
                    okType={typeOfActionOnProfile === "delete" ? "danger" : "primary"}
                    wrapClassName={"profileLandingPage_delete_popup"}
                    destroyOnClose={true}
                >
                    <p>{`Are you sure you want to ${typeOfActionOnProfile} selected ${checkedDataKeys.length} ${viewTypeFirstLetterCapital}  ${checkedDataKeys.length > 1 ? "Profiles" : "Profile"}`}</p>
                </Modal>

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        commonProfileReducer: state.commonProfileReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCommonProfilesLandingViewTableData,
            commonActionForCommonProfileReducer,
            commonActionsOnProfileData
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonLandingView)

