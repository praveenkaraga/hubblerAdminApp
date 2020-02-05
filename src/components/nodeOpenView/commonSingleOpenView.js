import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getSingleViewData,
    getSingleViewSuggestionData,
    postCommonAddSelectedUsersData
} from '../../store/actions/actions'
import CommonCreationView from '../common/CommonCreationView/CommonCreationView'
import { headingData } from './headingData'
import { withRouter } from "react-router-dom";
import { getNodeId } from '../../utils/helper'
import { message } from 'antd'
class CommonSingleOpenView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleNodeId: "",
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeheading: "",
            sortingType: "",
            searchData: "",
            viewType: this.props.viewType,
            addUsersPopUpStatus: false,
            checkedDataKeys: [],

            apiCallFlag: false,

            addUsersCurrentPageNumber: 1,
            addUsersRowsPerPage: 30,
            addUsersActiveheading: "",
            addUsersSortingType: "",
            addUsersSearchData: "",
            addUsersCheckedDataKeys: []
        }

    }

    updateNodeId = (status) => {
        const nodeId = getNodeId(this.props.history)
        if (status) this.setState({ singleNodeId: nodeId })
        this.props.getSingleViewData(this.state.viewType, nodeId)
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.patchDataCreatedSuccessfully !== nextProps.commonReducer.patchDataCreatedSuccessfully) {
            return {
                patchDataCreatedSuccessfully: nextProps.commonReducer.patchDataCreatedSuccessfully
            };
        }


        if (nextProps.viewType !== prevState.viewType) {
            return { viewType: nextProps.viewType }
        }
        return null;
    }

    componentDidMount() {
        this.updateNodeId(true)

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.viewType === "circles") {
            const currentNodeId = getNodeId(this.props.history)
            const { apiCallFlag } = this.state
            if (prevState.singleNodeId !== currentNodeId && !apiCallFlag) {
                this.setState({ singleNodeId: currentNodeId, apiCallFlag: true })
                this.updateNodeId(false)
            }
            if (apiCallFlag) {
                this.setState({ apiCallFlag: false })
            }
            if (prevState.patchDataCreatedSuccessfully) {
                if (this.props.commonReducer.patchDataCreatedSuccessfully !== prevState.patchDataCreatedSuccessfully) {
                    this.updateNodeId()
                }
            }
        }

    }



    onChangeSearchDropdown = (searchData) => {
        const { singleNodeId, viewType } = this.state
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, 30, 1, searchData)
    }


    onChangeSearch = (e) => { //onChange of left side of search
        const { rowsPerPage, activeheading, sortingType, singleNodeId, viewType } = this.state
        const searchData = e.target.value
        this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({ searchData, currentPageNumber: 1 })
    }

    onClickHeading = (activeheading, sortingType) => {
        const { rowsPerPage, searchData, currentPageNumber, singleNodeId, viewType } = this.state
        this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        this.setState({
            activeheading,
            sortingType
        })
    }

    onChangeRowsPerPage = (rowsPerPage) => {
        const { searchData, singleNodeId, viewType, activeheading, sortingType } = this.state
        this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    onChangePage = (calcData) => {
        const { currentPageNumber, viewType, singleNodeId, rowsPerPage, searchData, activeheading, sortingType } = this.state
        const goToPage = currentPageNumber + calcData

        this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, goToPage, searchData, activeheading, sortingType)
        this.setState({
            currentPageNumber: goToPage
        })
    }


    backButtonClick = () => {
        this.props.history.push("/people/designations")
    }


    //below functions are for add Users Comp
    onClickOfAddUsers = (status) => {
        const { viewType, singleNodeId } = this.state

        if (status) {
            this.props.getSingleViewSuggestionData(viewType, singleNodeId, 30, 1)
        }
        this.setState({ addUsersPopUpStatus: status, addUsersCurrentPageNumber: 1 })

    }

    addUsersOnClickHeadingColumn = (activeheading, sortingType) => {
        const { addUsersCurrentPageNumber, addUsersRowsPerPage, addUsersSearchData, viewType, singleNodeId } = this.state
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, addUsersRowsPerPage, addUsersCurrentPageNumber, addUsersSearchData, activeheading, sortingType)
        this.setState({
            addUsersActiveheading: activeheading,
            addUsersSortingType: sortingType,
        })
    }

    addUsersOnChangeRowsPerPage = (rowsPerPage) => {
        const { addUsersSearchData, addUsersActiveheading, addUsersSortingType, viewType, singleNodeId } = this.state
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, rowsPerPage, 1, addUsersSearchData, addUsersActiveheading, addUsersSortingType)
        this.setState({
            addUsersRowsPerPage: rowsPerPage,
            addUsersCurrentPageNumber: 1
        })
    }

    onSearchInAddUsers = (e) => {
        const searchvalue = e.target.value
        const { addUsersRowsPerPage, addUsersActiveheading, addUsersSortingType, viewType, singleNodeId } = this.state
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, addUsersRowsPerPage, 1, searchvalue, addUsersActiveheading, addUsersSortingType)

        this.setState({
            addUsersSearchData: searchvalue,
            addUsersCurrentPageNumber: 1
        })
    }

    onChangeCheckBox = (value) => {
        this.setState({ checkedDataKeys: value })
    }

    addUsersPopUpOnChangeCheckBox = (data) => {

        this.setState({ addUsersCheckedDataKeys: data })
    }

    addUsersChangePage = (calcData) => {
        const { addUsersCurrentPageNumber, addUsersRowsPerPage, addUsersActiveheading, addUsersSearchData, addUsersSortingType, viewType, singleNodeId } = this.state
        const goToPage = addUsersCurrentPageNumber + calcData

        this.props.getSingleViewSuggestionData(viewType, singleNodeId, addUsersRowsPerPage, goToPage, addUsersSearchData, addUsersActiveheading, addUsersSortingType)
        this.setState({
            addUsersCurrentPageNumber: goToPage
        })
    }


    onClickAddSelectedButton = async () => {
        const { addUsersCheckedDataKeys, singleNodeId, viewType, rowsPerPage, searchData, activeheading, sortingType } = this.state
        const finalData = { users: addUsersCheckedDataKeys, _id: singleNodeId }
        await this.props.postCommonAddSelectedUsersData(viewType, finalData)
        const { postSelectedUsersSuccessfully, postSelectedUsersSuccessMessage, errorMsg } = this.props.commonReducer
        if (postSelectedUsersSuccessfully) {
            this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType)
            this.setState({ addUsersPopUpStatus: false, currentPageNumber: 1, addUsersCheckedDataKeys: [] })
            message.success(postSelectedUsersSuccessMessage)
        } else {
            message.error(errorMsg)
        }

    }

    onSearchDropdownSelect = async (value) => {
        console.log(value, "onSearchDropdownSelect")
        await this.addUsersPopUpOnChangeCheckBox([value])
        this.onClickAddSelectedButton()
        this.onChangeSearchDropdown("")
    }

    onDeleteUser = (data) => {
        console.log("data", data)
    }



    render() {
        const { singleViewName, singleViewCount, singleViewData, singleViewSuggestionData, singleViewSuggestionDataCount, tableColumnData } = this.props.commonReducer
        console.log(tableColumnData, "tableColumnData")
        const { searchData, currentPageNumber, addUsersPopUpStatus, checkedDataKeys, addUsersCheckedDataKeys, addUsersCurrentPageNumber } = this.state

        return (<CommonCreationView commonCreationViewHeaderName={singleViewName}
            viewDecider={searchData || singleViewCount ? 1 : 0}
            allSelectedUsersUsersData={singleViewData}
            allSelectedUsersHeadingsData={tableColumnData} backButton={true}
            allSelectedUsersAllSelect={true}
            allSelectedUsersSearchData={this.onChangeSearch}
            allSelectedUsersPlaceHolder={`Search ${singleViewName}`}
            allSelectedUsersOnClickHeadingColumn={this.onClickHeading}
            allSelectedUsersTotalUsers={singleViewCount}
            allSelectedUsersCurrentPageNumber={currentPageNumber}
            allSelectedUsersOnChangeCheckBox={this.onChangeCheckBox}
            allSelectedUsersOnChangeRowsPerPage={this.onChangeRowsPerPage}
            commonCreationViewBackButtonClick={this.backButtonClick}
            allSelectedUsersShowHeaderButtons={[{ id: "delete", label: "Delete User" }]}
            allSelectedUsersSelectedDataCount={checkedDataKeys.length}
            allSelectedUsersOnClickAddUserButton={() => this.onClickOfAddUsers(true)}
            allSelectedUsersChangePage={this.onChangePage}
            allSelectedUsersOnClickActions={this.onDeleteUser}

            //search with suggestion comp props
            allSelectedUsersSearchDropdownPlaceholder={"Enter Name and Add"}
            allSelectedUsersOnChangeSearchDropdown={this.onChangeSearchDropdown}
            allSelectedUsersOnSearchDropdownSelect={this.onSearchDropdownSelect}
            allSelectedUsersSearchDropdownData={singleViewSuggestionData}



            //all below prop is for add Selected users popup
            addUsersCommonCardButtonClick={() => this.onClickOfAddUsers(true)}
            showAddUsersPopUp={addUsersPopUpStatus}
            addUsersPopUpClose={() => this.onClickOfAddUsers(false)}
            addUsersPopUpTableColumnsData={tableColumnData}
            addUsersPopUpUsersData={singleViewSuggestionData}
            addUsersPopUpTotalUsers={singleViewSuggestionDataCount}
            addUsersOnClickHeadingColumn={this.addUsersOnClickHeadingColumn}
            addUsersOnChangeRowsPerPage={this.addUsersOnChangeRowsPerPage}
            addUsersSearchData={this.onSearchInAddUsers}
            addUsersPopUpOnChangeCheckBox={this.addUsersPopUpOnChangeCheckBox}
            addUsersSelectedDataCount={addUsersCheckedDataKeys.length}
            addUsersChangePage={this.addUsersChangePage}
            addUsersCurrentPageNumber={addUsersCurrentPageNumber}
            addUsersPopUpFirstButtonClick={this.onClickAddSelectedButton}
        //addUsersPopUpFirstButtonClick
        // addUsersPopUpOnChangeCheckBox

        // addUsersCurrentPageNumber
        // addUsersSearchLoader
        />)
    }
}

const mapStateToProps = state => {
    return {
        commonReducer: state.commonReducer,
        consoleReducer: state.consoleReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSingleViewData,
            getSingleViewSuggestionData,
            postCommonAddSelectedUsersData
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommonSingleOpenView))