import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserData } from '../store/actions/actions'

class UserDetailsView extends Component {


    componentDidMount() {
        this.props.getUserData()
    }

    render() {
        return (
            <div>Nischal</div>
        )
    }
}




const mapStateToProps = state => {
    return {
        firstReducer: state.firstReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUserData
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetailsView);


