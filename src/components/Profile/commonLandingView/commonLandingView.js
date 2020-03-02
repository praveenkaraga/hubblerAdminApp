
import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import './commonLandingView.scss'
import AllUserSelect from '../../common/allUserSelect/allUserSelect'
import {columnData} from '../commonLandingView/columnData'
import {getCommonProfilesLandingViewTableData} from '../../../store/actions/ProfileActions/profileActions'

class CommonLandingView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type: "", //for api call
            subtype :"", //for api call
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeheading: "",
            sortingType: "",
            searchData: "",
        }
    }


    componentDidMount(){
        const {viewType} = this.props
        let type = "holiday"
        let subType = "holiday-profiles"
        switch(viewType){
        case "workingDay":
            type = "workdays"
            subType = "profiles"
            break;
        
        case "leave":
            type = "leave"
            subType = "leave_profiles"
            break;
        
        case "reimbursement":
            type = "reimbursement"
            subType = "profiles"
            break;
        
        case "tracking":
            type = "tracking"
            subType = "profiles"
            break;
        
        default:
            type = "holiday"
            subType = "holiday-profiles"
                
        }
        this.props.getCommonProfilesLandingViewTableData(type, subType, 30)
        this.setState({type, subType})
    }

    onClickHeadingColumn = (activeheading, sortingType) =>{
        const { type, subType, rowsPerPage, searchData, currentPageNumber } = this.state
        //  this.props.commonDesignationAction({tableLoading : true})
        this.props.getCommonProfilesLandingViewTableData(type, subType, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        this.setState({
            activeheading,
            sortingType
        })
    }

     //on change of rows per page of the table
     onChangeRowsPerPage = (rowsPerPage) => {
         const { type, subType, searchData, activeheading, sortingType } = this.state
         // this.props.commonDesignationAction({tableLoading : true})
         this.props.getCommonProfilesLandingViewTableData(type, subType, rowsPerPage, 1, searchData, activeheading, sortingType)
         this.setState({
             rowsPerPage,
             currentPageNumber: 1
         })
     }

     //on change of pages of the table
    changePage = (calcData) => {
        const { type, subType, currentPageNumber, rowsPerPage, searchData, activeheading, sortingType } = this.state
        const goToPage = currentPageNumber + calcData
        //  this.props.commonDesignationAction({tableLoading : true})
        this.props.getCommonProfilesLandingViewTableData(type, subType, rowsPerPage, goToPage, searchData, activeheading, sortingType)
        this.setState({
            currentPageNumber: goToPage
        })
    }

    //on search in the designaiton table
    onSearchProfile = (searchData) => {
        const {type, subType, rowsPerPage, activeheading, sortingType } = this.state
        
        this.props.getCommonProfilesLandingViewTableData(type, subType, rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    }

    render() { 
        const {viewType} = this.props
        const { profileLandingDataCount, profileLandingData, tableLoading} =  this.props.commonProfileReducer
        const {currentPageNumber} = this.state
        return ( 
            <div className="commonLandingView_main">
                <div className="commonLandingView-heading"><h3>Holiday Profiles</h3></div>
                {/* <AllUserSelect allHeadingsData={holidayColumnData} userData={holidayProfilesData || []}
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
                /> */}

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
                />
            </div>
        );
    }
}
 

const mapStateToProps = state => {
    return {
        commonProfileReducer : state.commonProfileReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCommonProfilesLandingViewTableData
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonLandingView)

