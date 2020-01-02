import React,{Component} from "react";
import AllUserSelect from "../../allUserSelect/allUserSelect";
import {Modal} from "antd";

class AddUsersPopUp extends Component{
    render() {
        const {tableColumnsData,addableUsersData,totalUsers} = this.props
        return(
            <Modal
                visible={this.state.showUsersList}
                centered={true}
                title={'Add Users'}
                footer={null} className={'add-users-pop-up-model'}
                onCancel={this.onUserListCancel}>
                <AllUserSelect allHeadingsData={tableColumnsData} userData={addableUsersData}
                               searchPlaceHolder={"Search Department"}
                               searchFirstButtonName={"Add Selected"}
                               searchSecondButtonName={"ADD USER"} totalUsers={totalUsers}
                               searchSecondButtonClick={() => this.searchSecondButtonClick(true)}
                               isUserData={true}
                               onChangeCheckBox={this.onChangeAddUsersCheckBox} onlySelectAndAdd={true}
                               searchFirstButtonClick={this.onClickFirst}/>
            </Modal>
        )
    }
}

export default AddUsersPopUp