import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getSingleCircleData,
    getCircleSuggestionData
} from '../../store/actions/actions'
import CommonCreationView from '../common/CommonCreationView/CommonCreationView'
import { headingData } from './headingData'
import { withRouter } from "react-router-dom";
import { getNodeId } from '../../utils/helper'

class CircleOpenView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleNodeId: "",
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeheading: "",
            sortingType: "",
            searchData: "",
            patchDataCreatedSuccessfully: false
        }
    }

    componentDidMount() {
        this.updateNodeId()
    }


    updateNodeId = () => {
        const nodeId = getNodeId(this.props.history)
        this.props.getSingleCircleData(nodeId)
        this.setState({ singleNodeId: nodeId })
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.patchDataCreatedSuccessfully !== nextProps.commonReducer.patchDataCreatedSuccessfully) {
            return {
                patchDataCreatedSuccessfully: nextProps.commonReducer.patchDataCreatedSuccessfully
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        const currentNodeId = getNodeId(this.props.history)

        if (prevState.patchDataCreatedSuccessfully) {
            if (this.props.commonReducer.patchDataCreatedSuccessfully !== prevState.patchDataCreatedSuccessfully) {
                this.updateNodeId()
            }
        }
        if (prevState.singleNodeId !== currentNodeId) {
            this.updateNodeId()
        }
    }


    onChangeSearchDropdown = (searchData) => {
        const { singleNodeId } = this.state
        this.props.getCircleSuggestionData(singleNodeId, searchData)
    }

    onSearchDropdownSelect = (value) => {
        // console.log(value, "onSearchDropdownSelect")
    }

    onChangeSearch = (e) => { //onChange of left side of search
        const { rowsPerPage, activeheading, sortingType, singleNodeId } = this.state
        const searchData = e.target.value
        this.props.getSingleCircleData(singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({ searchData, currentPageNumber: 1 })
    }

    onClickHeading = (activeheading, sortingType) => {
        const { rowsPerPage, searchData, currentPageNumber, singleNodeId } = this.state
        this.props.getSingleCircleData(singleNodeId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        this.setState({
            activeheading,
            sortingType
        })
    }

    onChangeRowsPerPage = (rowsPerPage) => {
        const { singleNodeId } = this.state
        this.props.designationsData(singleNodeId, rowsPerPage, 1)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    onChangeCheckBox = (value) => {
        const selectedUsers = value
    }

    render() {
        const { singleCircleName, singleCircleCount, singleCircleData, circleSuggestionData } = this.props.userConsoleMainReducer
        const { searchData, currentPageNumber } = this.state

        return (<CommonCreationView commonCreationViewHeaderName={singleCircleName}
            viewDecider={searchData || singleCircleCount ? 1 : 0}
            allSelectedUsersUsersData={singleCircleData}
            allSelectedUsersHeadingsData={headingData} backButton={false}
            allSelectedUsersSearchDropdownPlaceholder={"Enter Name and Add"}
            allSelectedUsersOnChangeSearchDropdown={this.onChangeSearchDropdown}
            allSelectedUsersOnSearchDropdownSelect={this.onSearchDropdownSelect}
            allSelectedUsersSearchDropdownData={circleSuggestionData}
            allSelectedUsersAllSelect={true}
            allSelectedUsersSearchData={this.onChangeSearch}
            allSelectedUsersPlaceHolder={`Search ${singleCircleName}`}
            allSelectedUsersOnClickHeadingColumn={this.onClickHeading}
            allSelectedUsersTotalUsers={singleCircleCount}
            allSelectedUsersCurrentPageNumber={currentPageNumber}
            allSelectedUsersOnChangeCheckBox={this.onChangeCheckBox}
            allSelectedUsersOnChangeRowsPerPage={this.onChangeRowsPerPage}
        />)
    }
}

const mapStateToProps = state => {
    return {
        userConsoleMainReducer: state.userConsoleMainReducer,
        commonReducer: state.commonReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSingleCircleData,
            getCircleSuggestionData
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CircleOpenView))