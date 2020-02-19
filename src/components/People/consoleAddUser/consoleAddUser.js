import React, { Component } from 'react';
import './consoleAddUser.scss'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddUser from '../../common/addUser/addUser'
import { addUserDataForm, getAddUsersProfileData } from '../../../store/actions/PeopleActions/peopleActions'

class ConsoleAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.addUserDataForm()
    }

    onChangeAddUsersTab = (activekey) => {
        if (activekey === "profiles") {
            // this.props.getAddUsersProfileData(this.state.userId)
        }
    }

    render() {
        const { addUserCloseButton } = this.props
        const { addUserDataForm } = this.props.consoleAddUserReducer
        return (
            <div>
                <AddUser onClickClose={addUserCloseButton} addUserDataForm={addUserDataForm} onChangeAddUsersTab={this.onChangeAddUsersTab} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        consoleAddUserReducer: state.consoleAddUserReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addUserDataForm,
            getAddUsersProfileData
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConsoleAddUser)