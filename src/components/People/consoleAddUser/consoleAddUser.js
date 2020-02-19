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
        // if (activekey === "profiles") {
        //     // this.props.getAddUsersProfileData(this.state.userId)
        // }else
        const { addUserMode, userId } = this.props

        switch (activekey) {
            case "personal":
                console.log("personal")
                break;

            case "organisation":
                console.log("organisation")

                break;

            case "apps":
                console.log("apps")
                break;

            case "profiles":
                console.log("profiles")
                break;

            default:
                alert("Some error occured. Please try again later.")

        }

        console.log(addUserMode, userId)
    }

    render() {
        const { addUserCloseButton, addUserMode } = this.props
        const { addUserDataForm } = this.props.consoleAddUserReducer
        return (
            <div>
                <AddUser
                    onClickClose={addUserCloseButton}
                    addUserDataForm={addUserDataForm}
                    onChangeAddUsersTab={this.onChangeAddUsersTab}
                    addUserMode={addUserMode}

                />
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