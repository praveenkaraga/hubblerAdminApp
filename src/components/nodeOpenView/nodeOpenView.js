import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getSingleCircleData,
    getCircleSuggestionData
} from '../../store/actions/actions'
import CommonCreationView from '../common/CommonCreationView/CommonCreationView'
import { headingData } from '../../components/nodeOpenView/headingData'

import { withRouter } from "react-router-dom";

class NodeOpenView extends Component {
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
        const nodeId = this.getNodeId()
        this.props.getSingleCircleData(nodeId)
        this.setState({ singleNodeId: nodeId })
    }

    getNodeId = () => {
        const nodeId = this.props.history.location.pathname.split("/")[3]
        return nodeId
    }

    componentDidUpdate(prevProps, prevState) {
        const currentNodeId = this.getNodeId()
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
            getCircleSuggestionData
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NodeOpenView))