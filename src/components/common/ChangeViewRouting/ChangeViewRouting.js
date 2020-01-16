import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    getDepartmentData,
    commonDepartmentAction,
    getDeptTableColumnData,
    postCreateDeptData,
    postAddSelectedUsers,
    getAddSelectedUsersPostedData,
    getAddableUsersData,
    getTableColumnsData,
    getCommonViewHeaderName
} from "../../../store/actions/actions";
import CommonCreationView from "../../common/CommonCreationView/CommonCreationView";
import filter from "lodash/filter";
import CreationPopViewCombined from "../CreationPopViewCombined/CreationPopViewCombined";


class ChangeViewRouting extends Component {
    constructor(props){
        super (props)
        this.state ={
            showAddUsersPopUp : false,
            usersIdArray: [],
            addUsersCurrentPageNumber: 1,
            addUsersRowsPerPage: 30,
            addUsersActiveHeading: "",
            addUsersSortingType: "",
            addUsersSearchData: "",
            allSelectedUsersCurrentPageNumber: 1,
            allSelectedUsersRowsPerPage: 30,
            allSelectedUsersActiveHeading: "",
            allSelectedUsersSortingType: "",
            allSelectedUsersSearchData: "",
        }

    }
    componentDidMount(){
        console.log(this.props)
        this.props.getDeptTableColumnData();
        if (this.props.match.params.id) {
            this.props.commonDepartmentAction({commonViewLoader: true, headerNameWhenRouted: this.props.history.location.state.headerName})
            this.props.getTableColumnsData();
            this.props.getAddSelectedUsersPostedData(this.props.match.params.id)
        } else {
            this.props.getDepartmentData(30)
        }
    }


    commonCreationViewBackButtonClick = () => {
        this.props.history.push(`/people/departments`)
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30)
        this.props.commonDepartmentAction({commonViewLoader: true})
    }

    addUsersCommonCardButtonClick =() =>{
        const {createdDepartmentData} = this.props.departmentReducer;
        this.setState({
            showAddUsersPopUp: true,
        });
        this.props.getTableColumnsData();
        this.props.getAddableUsersData(this.props.match.params.id)
        this.props.commonDepartmentAction({viewDecider: false})
    }

    addUsersPopUpClose = () => {
        this.setState({
            showAddUsersPopUp: false
        })
    };

    addUsersPopUpFirstButtonClick = () => { // onClickFirst
        let data = {
            users: this.state.usersIdArray,
            _id: this.props.match.params.id
        };
        this.setState({
            showAddUsersPopUp: false
        })
        this.props.postAddSelectedUsers(data);
        this.props.commonDepartmentAction({commonViewLoader: true})
        this.props.getAddSelectedUsersPostedData(this.props.match.params.id)
    };

    addUsersPopUpOnChangeCheckBox = (value) => { //onChangeAddUsersCheckBox
        this.setState({
            usersIdArray: value,
        })
    };

    addUsersOnClickHeadingColumn = (activeHeading, sortingType) => {

        const {addUsersRowsPerPage, addUsersSearchData, addUsersCurrentPageNumber} = this.state
        this.props.getAddableUsersData(this.props.match.params.id, addUsersRowsPerPage, addUsersCurrentPageNumber, addUsersSearchData, activeHeading, sortingType)
        this.setState({
            addUsersActiveHeading: activeHeading,
            sortingType
        })
    }

    addUsersOnChangeRowsPerPage = (rowsPerPage) => {
        this.props.getAddableUsersData(this.props.match.params.id, rowsPerPage, 1)
        this.setState({
            addUsersRowsPerPage :rowsPerPage,
            addUsersCurrentPageNumber: 1
        })
    }

    addUsersChangePage = (calcData) => {
        const {addUsersCurrentPageNumber, addUsersRowsPerPage} = this.state
        const goToPage = addUsersCurrentPageNumber + calcData
        this.props.getAddableUsersData(this.props.match.params.id, addUsersRowsPerPage, goToPage)
        this.setState({
            addUsersCurrentPageNumber: goToPage
        })
    }

    addUsersDepartmentSearchData = (e) => {
        const {addUsersRowsPerPage, addUsersActiveHeading, addUsersSortingType} = this.state;
        const searchData = e.target.value
        this.props.getAddableUsersData(this.props.match.params.id, addUsersRowsPerPage, 1, searchData, addUsersActiveHeading, addUsersSortingType)
        this.setState({
            addUsersSearchData :searchData,
            addUsersCurrentPageNumber: 1
        })
    }

    allSelectedUsersFirstButtonClick = () => {
        console.log('yet to write the function : allSelectedUsersFirstButtonClick')
    }

    allSelectedUsersOnClickHeadingColumn = (activeHeading, sortingType) => {
        const {allSelectedUsersRowsPerPage, allSelectedUsersSearchData, allSelectedUsersCurrentPageNumber} = this.state
        this.props.getAddSelectedUsersPostedData(this.props.match.params.id, allSelectedUsersRowsPerPage, allSelectedUsersCurrentPageNumber, allSelectedUsersSearchData, activeHeading, sortingType)
        this.setState({
            allSelectedUsersActiveHeading: activeHeading,
            sortingType
        })
    }

    allSelectedUsersOnChangeRowsPerPage = (rowsPerPage) => {
        this.props.getAddSelectedUsersPostedData(this.props.match.params.id, rowsPerPage, 1)
        this.setState({
            allSelectedUsersRowsPerPage:rowsPerPage,
            allSelectedUsersCurrentPageNumber: 1
        })
    }

    allSelectedUsersChangePage = (calcData) => {
        const {allSelectedUsersCurrentPageNumber, allSelectedUsersRowsPerPage} = this.state
        const goToPage = allSelectedUsersCurrentPageNumber + calcData
        this.props.getAddSelectedUsersPostedData(this.props.match.params.id, allSelectedUsersRowsPerPage, goToPage)
        this.setState({
            allSelectedUsersCurrentPageNumber: goToPage
        })
    }

    allSelectedUsersDepartmentSearchData = (e) => {
        const {allSelectedUsersRowsPerPage, allSelectedUsersActiveHeading, allSelectedUsersSortingType} = this.state
        const searchData = e.target.value
        this.props.getAddSelectedUsersPostedData(this.props.match.params.id, allSelectedUsersRowsPerPage, 1, searchData, allSelectedUsersActiveHeading, allSelectedUsersSortingType)
        this.setState({
            allSelectedUsersSearchData:searchData,
            allSelectedUsersCurrentPageNumber: 1
        })
    }





    render() {
        const {name, viewDecider, addedUsersData, tableColumnsData, totalAllSelectedUsers, commonViewLoader, headerNameWhenRouted,addableUsersData,totalAddableUsers} = this.props.departmentReducer
        const columnData = tableColumnsData ? filter(tableColumnsData, ele => ele._id !== 'departments') : [];
        console.log(this.props)

        return (
            <CommonCreationView commonCreationViewHeaderName={headerNameWhenRouted}
                                viewDecider={viewDecider}
                                allSelectedUsersUsersData={addedUsersData.result ? addedUsersData.result : []}
                                allSelectedUsersHeadingsData={columnData ? columnData : []} backButton={true}
                                allSelectedUsersTotalUsers={totalAllSelectedUsers}
                                commonCreationViewBackButtonClick={this.commonCreationViewBackButtonClick}
                                commonViewLoader={commonViewLoader}
                                addUsersCommonCardButtonClick={this.addUsersCommonCardButtonClick}
                                showAddUsersPopUp={this.state.showAddUsersPopUp}
                                addUsersPopUpTableColumnsData={tableColumnsData}

                                addUsersPopUpUsersData={addableUsersData}
                                addUsersPopUpTotalUsers={totalAddableUsers}
                                addUsersPopUpClose={this.addUsersPopUpClose}
                                addUsersPopUpFirstButtonClick={this.addUsersPopUpFirstButtonClick}
                                addUsersPopUpOnChangeCheckBox={this.addUsersPopUpOnChangeCheckBox}
                                addUsersOnClickHeadingColumn={this.addUsersOnClickHeadingColumn}
                                addUsersOnChangeRowsPerPage={this.addUsersOnChangeRowsPerPage}
                                addUsersChangePage={this.addUsersChangePage}
                                allSelectedUsersIsUserData={true}
                                addUsersDepartmentSearchData={this.addUsersDepartmentSearchData}
                                addUsersCurrentPageNumber={this.state.addUsersCurrentPageNumber}
                                allSelectedUsersFirstButtonClick={this.allSelectedUsersFirstButtonClick}
                                allSelectedUsersOnClickHeadingColumn={this.allSelectedUsersOnClickHeadingColumn}
                                allSelectedUsersOnChangeRowsPerPage={this.allSelectedUsersOnChangeRowsPerPage}
                                allSelectedUsersChangePage={this.allSelectedUsersChangePage}
                                allSelectedUsersDepartmentSearchData={this.allSelectedUsersDepartmentSearchData}
                                allSelectedUsersCurrentPageNumber={this.state.allSelectedUsersCurrentPageNumber}
                                allSelectedUsersPlaceHolder={'Search Department'}
                                allSelectedUsersFirstButtonName={`Add Selected`}

            />
        )
    }
}

const mapStateToProps = state => {
    return {
        departmentReducer: state.departmentReducer
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
            getCommonViewHeaderName
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangeViewRouting))