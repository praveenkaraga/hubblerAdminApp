import React, {Component} from 'react';
import './commonCreationView.scss'
import AddUsersCommonCard from '../../common/AddUsersCommonCard/AddUsersCommonCard'
import AllUserSelect from "../../allUserSelect/allUserSelect";

class CommonCreationView extends Component {
    render() {
        const {headerName, backToMainDepartmentView, backButton = true, viewDecider = 0, addUsersCommonCardButtonClick} = this.props;
        const {allHeadingsData, addedUsersData, totalUsers} = this.props
        return (
            <div className={'common-creation-view'}>
                <div>
                    {backButton ? <div className={'headerWithBackArrow'}
                                       onClick={() => backToMainDepartmentView()}>{headerName}</div> :
                        <div className={'headerWithoutBackArrow'}>
                            {headerName}
                        </div>}
                </div>
                {viewDecider < 1 ?
                    <AddUsersCommonCard addUsersCommonCardButtonClick={addUsersCommonCardButtonClick}/> :
                    <div className={'all-selected-users-wrap'}>
                        <AllUserSelect allHeadingsData={allHeadingsData}
                                       userData={addedUsersData ? addedUsersData.result : []}
                                       searchPlaceHolder={"Search Department"}
                                       searchFirstButtonName={"Add Selected"}
                                       searchSecondButtonName={"ADD USER"} totalUsers={totalUsers}
                                       searchSecondButtonClick={() => this.searchSecondButtonClick(true)}
                                       isUserData={true}
                                       onChangeCheckBox={this.onChangeAddUsersCheckBox} onlySelectAndAdd={true}
                                       searchFirstButtonClick={this.onClickFirst}/>
                    </div>}

                {}

            </div>
        )
    }

}


export default CommonCreationView