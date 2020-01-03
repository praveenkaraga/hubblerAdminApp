import React, {Component} from 'react';
import './commonCreationView.scss'
import AddUsersCommonCard from '../../common/AddUsersCommonCard/AddUsersCommonCard'
import AllUserSelect from "../../allUserSelect/allUserSelect";
import AddUsersPopUp from '../../common/AddUsersPopUp/AddUsersPopUp'

class CommonCreationView extends Component {

    render() {
        const {commonCreationViewHeaderName, commonCreationViewBackButtonClick, backButton = true, viewDecider = 0} = this.props;
        const {addUsersCommonCardButtonClick} = this.props
        const {allSelectedUsersHeadingsData, allSelectedUsersUsersData, allSelectedUsersTotalUsers, allSelectedUsersPlaceHolder = `Search Department`,allSelectedUsersFirstButtonName = `Add Selected`,allSelectedUsersIsUserData = true, allSelectedUsersOnChangeCheckBox,allSelectedUsersOnlySelectAndAdd = true,allSelectedUsersFirstButtonClick} = this.props;
        const {showAddUsersPopUp, addUsersPopUpTitle, addUsersPopUpClose,addUsersPopUpPlaceHolder,addUsersPopUpFirstButtonName, addUsersPopUpFirstButtonClick, addUsersPopUpOnChangeCheckBox, addUsersPopUpTableColumnsData, addUsersPopUpUsersData, addUsersPopUpTotalUsers, addUsersPopUpIsUserData, addUsersPopUpOnlySelectAndAdd} = this.props
        return (
            <div className={'common-creation-view'}>
                <div>
                    {backButton ? <div className={'headerWithBackArrow'}
                                       onClick={() => commonCreationViewBackButtonClick()}>{commonCreationViewHeaderName}</div> :
                        <div className={'headerWithoutBackArrow'}>
                            {commonCreationViewHeaderName}
                        </div>}
                </div>

                {viewDecider < 1 ?
                    <AddUsersCommonCard addUsersCommonCardButtonClick={addUsersCommonCardButtonClick}/> :

                    <div className={'all-selected-users-wrap'}>
                        <AllUserSelect allHeadingsData={allSelectedUsersHeadingsData}
                                       userData={allSelectedUsersUsersData ? allSelectedUsersUsersData.result : []}
                                       searchPlaceHolder={allSelectedUsersPlaceHolder}
                                       searchFirstButtonName={allSelectedUsersFirstButtonName}
                                       totalUsers={allSelectedUsersTotalUsers}
                                       isUserData={allSelectedUsersIsUserData}
                                       onChangeCheckBox={allSelectedUsersOnChangeCheckBox} onlySelectAndAdd={allSelectedUsersOnlySelectAndAdd}
                                       searchFirstButtonClick={allSelectedUsersFirstButtonClick}/>
                    </div>
                }

                {showAddUsersPopUp ?
                    <AddUsersPopUp showAddUsersPopUp={showAddUsersPopUp} addUsersPopUpTitle={addUsersPopUpTitle}
                                   addUsersPopUpClose={addUsersPopUpClose}
                                   addUsersPopUpPlaceHolder={addUsersPopUpPlaceHolder}
                                   addUsersPopUpFirstButtonName={addUsersPopUpFirstButtonName}
                                   addUsersPopUpFirstButtonClick={addUsersPopUpFirstButtonClick}
                                   addUsersPopUpOnChangeCheckBox={addUsersPopUpOnChangeCheckBox}
                                   addUsersPopUpTableColumnsData={addUsersPopUpTableColumnsData}
                                   addUsersPopUpUsersData={addUsersPopUpUsersData}
                                   addUsersPopUpTotalUsers={addUsersPopUpTotalUsers}
                                   addUsersPopUpIsUserData={addUsersPopUpIsUserData}
                                   addUsersPopUpOnlySelectAndAdd={addUsersPopUpOnlySelectAndAdd}/> : ''}


            </div>
        )
    }

}


export default CommonCreationView