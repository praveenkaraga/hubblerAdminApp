import React, {Component} from "react";
import './creationPopViewCombined.scss'
import CreationPopUp from '../../common/CreationPopUp/CreationPopUp'
import CommonCreationView from '../../common/CommonCreationView/CommonCreationView'

class CreationPopViewCombined extends Component {
    render() {
        const {creationPopUpVisibility, creationPopUpTitle, creationPopFirstButtonName, creationPopSecondButtonName, creationPopFirstButtonHandler, creationPopSecondButtonHandler, creationPopUpFirstFieldChangeHandler, customField, changeToCreatedView,fieldHeader,fieldPlaceHolder} = this.props;
        const {commonCreationViewHeaderName, commonCreationViewBackButtonClick, backButton, viewDecider, addUsersCommonCardButtonClick, allSelectedUsersHeadingsData, allSelectedUsersUsersData, allSelectedUsersTotalUsers, allSelectedUsersPlaceHolder, allSelectedUsersFirstButtonName, allSelectedUsersIsUserData, allSelectedUsersOnChangeCheckBox, allSelectedUsersOnlySelectAndAdd, allSelectedUsersFirstButtonClick, showAddUsersPopUp, addUsersPopUpTitle, addUsersPopUpClose, addUsersPopUpPlaceHolder, addUsersPopUpFirstButtonName, addUsersPopUpFirstButtonClick, addUsersPopUpOnChangeCheckBox, addUsersPopUpTableColumnsData, addUsersPopUpUsersData, addUsersPopUpTotalUsers, addUsersPopUpIsUserData, addUsersPopUpOnlySelectAndAdd} = this.props
        if (creationPopUpVisibility) {
            return (
                <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                               creationPopUpTitle={creationPopUpTitle}
                               creationPopFirstButtonName={creationPopFirstButtonName}
                               creationPopSecondButtonName={creationPopSecondButtonName}
                               creationPopFirstButtonHandler={creationPopFirstButtonHandler}
                               creationPopSecondButtonHandler={creationPopSecondButtonHandler}
                               creationPopUpFirstFieldChangeHandler={creationPopUpFirstFieldChangeHandler}
                               customField={customField} fieldHeader={fieldHeader} fieldPlaceHolder={fieldPlaceHolder}/>
            )
        } else if (changeToCreatedView) {
            return (
                <CommonCreationView commonCreationViewHeaderName={commonCreationViewHeaderName}
                                    commonCreationViewBackButtonClick={commonCreationViewBackButtonClick}
                                    backButton={backButton} viewDecider={viewDecider}
                                    addUsersCommonCardButtonClick={addUsersCommonCardButtonClick}
                                    allSelectedUsersHeadingsData={allSelectedUsersHeadingsData}
                                    allSelectedUsersUsersData={allSelectedUsersUsersData}
                                    allSelectedUsersTotalUsers={allSelectedUsersTotalUsers}
                                    allSelectedUsersPlaceHolder={allSelectedUsersPlaceHolder}
                                    allSelectedUsersFirstButtonName={allSelectedUsersFirstButtonName}
                                    allSelectedUsersIsUserData={allSelectedUsersIsUserData}
                                    allSelectedUsersOnChangeCheckBox={allSelectedUsersOnChangeCheckBox}
                                    allSelectedUsersOnlySelectAndAdd={allSelectedUsersOnlySelectAndAdd}
                                    allSelectedUsersFirstButtonClick={allSelectedUsersFirstButtonClick}
                                    showAddUsersPopUp={showAddUsersPopUp} addUsersPopUpTitle={addUsersPopUpTitle}
                                    addUsersPopUpClose={addUsersPopUpClose}
                                    addUsersPopUpPlaceHolder={addUsersPopUpPlaceHolder}
                                    addUsersPopUpFirstButtonName={addUsersPopUpFirstButtonName}
                                    addUsersPopUpFirstButtonClick={addUsersPopUpFirstButtonClick}
                                    addUsersPopUpOnChangeCheckBox={addUsersPopUpOnChangeCheckBox}
                                    addUsersPopUpTableColumnsData={addUsersPopUpTableColumnsData}
                                    addUsersPopUpUsersData={addUsersPopUpUsersData}
                                    addUsersPopUpTotalUsers={addUsersPopUpTotalUsers}
                                    addUsersPopUpIsUserData={addUsersPopUpIsUserData}
                                    addUsersPopUpOnlySelectAndAdd={addUsersPopUpOnlySelectAndAdd}/>
            )
        } else return (
            <div></div>
        )
    }
}

export default CreationPopViewCombined


