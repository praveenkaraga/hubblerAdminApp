import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getSingleCircleData,
    getCircleSuggestionData,
    getSingleFieldData
} from '../../store/actions/actions'
import CommonCreationView from '../common/CommonCreationView/CommonCreationView'
import { headingData } from './headingData'
import { withRouter } from "react-router-dom";
import { getNodeId } from '../../utils/helper'

class FieldOpenView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleNodeId: ""
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

    componentDidUpdate(prevProps, prevState) {
        const currentNodeId = getNodeId(this.props.history)
        if (prevState.singleNodeId !== currentNodeId) {
            this.updateNodeId()
        }
    }


    onChangeSearchDropdown = (searchData) => {
        const { singleNodeId } = this.state
        this.props.getCircleSuggestionData(singleNodeId, searchData)
    }

    onSearchDropdownSelect = (value) => {
        console.log(value, "onChangeSearchDropdown")
    }

    render() {
        const { singleCircleName, singleCircleCount, singleCircleData, circleSuggestionData } = this.props.userConsoleMainReducer

        return (<CommonCreationView commonCreationViewHeaderName={singleCircleName}
            viewDecider={singleCircleCount ? 1 : 0}
            allSelectedUsersUsersData={singleCircleData}
            allSelectedUsersHeadingsData={headingData} backButton={false}
            allSelectedUsersSearchDropdownPlaceholder={"Enter Name and Add"}
            allSelectedUsersOnChangeSearchDropdown={this.onChangeSearchDropdown}
            allSelectedUsersOnSearchDropdownSelect={this.onSearchDropdownSelect}
            allSelectedUsersSearchDropdownData={circleSuggestionData}

        />)
    }
}

const mapStateToProps = state => {
    return {
        userConsoleMainReducer: state.userConsoleMainReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSingleCircleData,
            getCircleSuggestionData,
            getSingleFieldData
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FieldOpenView))