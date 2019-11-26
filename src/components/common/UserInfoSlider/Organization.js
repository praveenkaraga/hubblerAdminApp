import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {getTeamViewOrgData} from "../../../store/actions/actions";
import {connect} from "react-redux";

class Organization extends Component {
    componentDidMount() {
        this.props.getTeamViewOrgData()
    }

    render() {
        const {clickedUserOrgManagerData,clickedUserOrgReporteesData} =  this.props.teamViewReducer

        return(
            <div className={'organization-information'}>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teamViewReducer: state.teamViewReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTeamViewOrgData
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Organization);
