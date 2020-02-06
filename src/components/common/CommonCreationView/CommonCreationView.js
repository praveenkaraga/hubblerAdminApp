import React, { Component } from 'react';
import './commonCreationView.scss'
import AddUsersCommonCard from '../../common/AddUsersCommonCard/AddUsersCommonCard'
import AllUserSelect from "../../allUserSelect/allUserSelect";
import AddUsersPopUp from '../../common/AddUsersPopUp/AddUsersPopUp'
import isEmpty from 'lodash/isEmpty'
import UserSearch from "../UserSearch/userSearch";
import { Button } from "antd";

class CommonCreationView extends Component {

    render() {
        const { commonCreationViewHeaderName, commonCreationViewBackButtonClick, backButton = true, viewDecider = 0, commonViewLoader = false } = this.props;
        const { addUsersCommonCardButtonClick } = this.props
        const {
            allSelectedUsersHeadingsData, allSelectedUsersUsersData, allSelectedUsersTotalUsers, allSelectedUsersPlaceHolder, allSelectedUsersFirstButtonName, allSelectedUsersIsUserData, allSelectedUsersOnChangeCheckBox, allSelectedUsersOnlySelectAndAdd, allSelectedUsersFirstButtonClick,
            allSelectedUsersOnClickHeadingColumn, allSelectedUsersOnChangeRowsPerPage, allSelectedUsersChangePage, allSelectedUsersSearchData, allSelectedUsersCurrentPageNumber, allSelectedUsersAllSelect, allSelectedUsersOnSearchDropdownSelect, allSelectedUsersSearchDropdownPlaceholder, allSelectedUsersSearchDropdownData, allSelectedUsersOnChangeSearchDropdown, allSelectedUsersShowHeaderButtons, allSelectedUsersDisableButtonNames, allSelectedUsersSelectedDataCount, allSelectedUsersOnClickUserActions, allSelectedUsersOnClickAddUserButton, allSelectedUsersOnSelectRow, allSelectedUsersOnSelectAll
        } = this.props;
        const {
            showAddUsersPopUp, addUsersPopUpTitle, addUsersPopUpClose, addUsersPopUpPlaceHolder, addUsersPopUpFirstButtonName, addUsersPopUpFirstButtonClick, addUsersPopUpOnChangeCheckBox, addUsersPopUpTableColumnsData, addUsersPopUpUsersData, addUsersPopUpTotalUsers, addUsersPopUpIsUserData, addUsersPopUpOnlySelectAndAdd, allSelectedUsersSearchLoader, addUsersSearchLoader
            , addUsersOnClickHeadingColumn, addUsersOnChangeRowsPerPage, addUsersChangePage, addUsersSearchData, addUsersCurrentPageNumber, addUsersShowHeaderButtons, addUsersDisableButtonNames, addUsersSelectedDataCount, addUsersOnClickActions, addUsersOnClickAddUserButton, addUsersOnSelectRow, addUsersOnSelectAll
        } = this.props

        return (
            <div className={'common-creation-view'}>
                <div className={'common-creation-view-header-wrap'}>
                    <div className={'header-wrap'}>
                        <div className={backButton ? 'headerWithBackArrow' : ''} onClick={backButton ? () => commonCreationViewBackButtonClick() : ''}></div>
                        <div className={'headerWithoutBackArrow'}> {commonCreationViewHeaderName}</div>
                    </div>
                </div>


                {commonViewLoader ? <div className={'common-view-loader'}></div> : ''}

                {viewDecider < 1 ?
                    !commonViewLoader ?
                        <AddUsersCommonCard addUsersCommonCardButtonClick={addUsersCommonCardButtonClick} /> : '' :

                    !commonViewLoader ? <div className={'all-selected-users-wrap'}>
                        <AllUserSelect allHeadingsData={allSelectedUsersHeadingsData}
                            userData={allSelectedUsersUsersData}
                            searchPlaceHolder={allSelectedUsersPlaceHolder}
                            searchFirstButtonName={allSelectedUsersFirstButtonName}
                            totalUsers={allSelectedUsersTotalUsers}
                            isUserData={allSelectedUsersIsUserData}
                            onChangeCheckBox={allSelectedUsersOnChangeCheckBox} /*onlySelectAndAdd={false}*/ /*allSelectedUsersOnlySelectAndAdd*/
                            searchFirstButtonClick={allSelectedUsersFirstButtonClick}
                            onChangeRowsPerPage={allSelectedUsersOnChangeRowsPerPage}
                            headingClickData={allSelectedUsersOnClickHeadingColumn}
                            goPrevPage={() => allSelectedUsersChangePage(-1)}
                            goNextPage={() => allSelectedUsersChangePage(1)}
                            onSearch={allSelectedUsersSearchData}
                            currentPageNumber={allSelectedUsersCurrentPageNumber}
                            allSelect={allSelectedUsersAllSelect}
                            onSearchDropdownSelect={allSelectedUsersOnSearchDropdownSelect}
                            searchDropdownPlaceholder={allSelectedUsersSearchDropdownPlaceholder}
                            searchDropdownData={allSelectedUsersSearchDropdownData}
                            onChangeSearchDropdown={allSelectedUsersOnChangeSearchDropdown}
                            searchLoader={allSelectedUsersSearchLoader}

                            showHeaderButtons={allSelectedUsersShowHeaderButtons}
                            disableButtonNames={allSelectedUsersDisableButtonNames}
                            selectedDataCount={allSelectedUsersSelectedDataCount}
                            onClickUserDelete={() => allSelectedUsersOnClickUserActions("delete")}
                            onClickUserEdit={() => allSelectedUsersOnClickUserActions("edit")}
                            onClickAddUserButton={allSelectedUsersOnClickAddUserButton}
                            onSelectRow={allSelectedUsersOnSelectRow}
                            onSelectAll={allSelectedUsersOnSelectAll}



                        />
                    </div> : ''
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
                        addUsersPopUpOnlySelectAndAdd={addUsersPopUpOnlySelectAndAdd}
                        addUsersOnClickHeadingColumn={addUsersOnClickHeadingColumn}
                        addUsersOnChangeRowsPerPage={addUsersOnChangeRowsPerPage}
                        addUsersChangePage={addUsersChangePage}
                        addUsersSearchData={addUsersSearchData}
                        addUsersCurrentPageNumber={addUsersCurrentPageNumber}
                        addUsersSearchLoader={addUsersSearchLoader}

                        addUsersSelectedDataCount={addUsersSelectedDataCount}
                        addUsersOnClickActions={addUsersOnClickActions}
                        addUsersOnClickAddUserButton={addUsersOnClickAddUserButton}
                        addUsersOnSelectRow={addUsersOnSelectRow}
                        addUsersOnSelectAll={addUsersOnSelectAll}
                    />
                    : ''}


            </div>
        )
    }

}


export default CommonCreationView