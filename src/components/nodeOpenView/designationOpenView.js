import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getSingleViewData,
    getSingleViewSuggestionData
} from '../../store/actions/actions'
import CommonCreationView from '../common/CommonCreationView/CommonCreationView'
import { headingData } from './headingData'
import { withRouter } from "react-router-dom";
import { getNodeId } from '../../utils/helper'

class DesignationOpenView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleNodeId: "",
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeheading: "",
            sortingType: "",
            searchData: "",
            viewType: "designations"
        }
    }

    componentDidMount() {
        const nodeId = getNodeId(this.props.history)
        this.props.getSingleViewData(this.state.viewType, nodeId)
        this.setState({ singleNodeId: nodeId })
    }


    onChangeSearchDropdown = (searchData) => {
        const { singleNodeId, viewType } = this.state
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, searchData)
    }

    onSearchDropdownSelect = (value) => {
        // console.log(value, "onSearchDropdownSelect")
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
        const { singleNodeId, viewType } = this.state
        this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, 1)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    onChangeCheckBox = (value) => {
        const selectedUsers = value
    }

    backButtonClick = () => {
        this.props.history.push("/people/designations")
    }

    render() {
        const { singleViewName, singleViewCount, singleViewData, singleViewSuggestionData } = this.props.commonReducer
        const { searchData, currentPageNumber } = this.state

        return (<CommonCreationView commonCreationViewHeaderName={singleViewName}
            viewDecider={searchData || singleViewCount ? 1 : 0}
            allSelectedUsersUsersData={singleViewData}
            allSelectedUsersHeadingsData={headingData} backButton={true}
            allSelectedUsersSearchDropdownPlaceholder={"Enter Name and Add"}
            allSelectedUsersOnChangeSearchDropdown={this.onChangeSearchDropdown}
            allSelectedUsersOnSearchDropdownSelect={this.onSearchDropdownSelect}
            allSelectedUsersSearchDropdownData={singleViewSuggestionData}
            allSelectedUsersAllSelect={true}
            allSelectedUsersSearchData={this.onChangeSearch}
            allSelectedUsersPlaceHolder={`Search ${singleViewName}`}
            allSelectedUsersOnClickHeadingColumn={this.onClickHeading}
            allSelectedUsersTotalUsers={singleViewCount}
            allSelectedUsersCurrentPageNumber={currentPageNumber}
            allSelectedUsersOnChangeCheckBox={this.onChangeCheckBox}
            allSelectedUsersOnChangeRowsPerPage={this.onChangeRowsPerPage}
            commonCreationViewBackButtonClick={this.backButtonClick}
        />)
    }
}

const mapStateToProps = state => {
    return {
        commonReducer: state.commonReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSingleViewData,
            getSingleViewSuggestionData
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignationOpenView))