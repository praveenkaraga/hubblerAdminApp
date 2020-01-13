import React, {Component} from 'react';
import './commonCreationView.scss'
import AddUsersCommonCard from '../../common/AddUsersCommonCard/AddUsersCommonCard'
import AllUserSelect from "../../allUserSelect/allUserSelect";
import AddUsersPopUp from '../../common/AddUsersPopUp/AddUsersPopUp'
import isEmpty from 'lodash/isEmpty'

class CommonCreationView extends Component {

    render() {
        const {commonCreationViewHeaderName, commonCreationViewBackButtonClick, backButton = true, viewDecider = 0,commonViewLoader = false} = this.props;
        const {addUsersCommonCardButtonClick} = this.props
        const {allSelectedUsersHeadingsData, allSelectedUsersUsersData, allSelectedUsersTotalUsers, allSelectedUsersPlaceHolder = `Search Department`,allSelectedUsersFirstButtonName = `Add Selected`,allSelectedUsersIsUserData = true, allSelectedUsersOnChangeCheckBox,allSelectedUsersOnlySelectAndAdd = true,allSelectedUsersFirstButtonClick,
            allSelectedUsersOnClickHeadingColumn,allSelectedUsersOnChangeRowsPerPage,allSelectedUsersChangePage,allSelectedUsersDepartmentSearchData,allSelectedUsersCurrentPageNumber,allSelectedUsersAllSelect} = this.props;
        const {showAddUsersPopUp, addUsersPopUpTitle, addUsersPopUpClose,addUsersPopUpPlaceHolder,addUsersPopUpFirstButtonName, addUsersPopUpFirstButtonClick, addUsersPopUpOnChangeCheckBox, addUsersPopUpTableColumnsData, addUsersPopUpUsersData, addUsersPopUpTotalUsers, addUsersPopUpIsUserData, addUsersPopUpOnlySelectAndAdd,
            addUsersOnClickHeadingColumn,addUsersOnChangeRowsPerPage,addUsersChangePage,addUsersDepartmentSearchData,addUsersCurrentPageNumber
        } = this.props

        console.log(allSelectedUsersHeadingsData)
        return (
            <div className={'common-creation-view'}>
                <div className={'common-creation-view-header-wrap'}>
                    <div className={backButton ? 'headerWithBackArrow' :'headerWithoutBackArrow' }
                         onClick={backButton ? () => commonCreationViewBackButtonClick() : ''}>
                    {commonCreationViewHeaderName}
                    </div>
                </div>


                {commonViewLoader ? <div className={'common-view-loader'}></div> :''}

                {viewDecider < 1 ?
                    !commonViewLoader ? <AddUsersCommonCard addUsersCommonCardButtonClick={addUsersCommonCardButtonClick}/> : '' :

                    !commonViewLoader ? <div className={'all-selected-users-wrap'}>
                        <AllUserSelect allHeadingsData={allSelectedUsersHeadingsData}
                                       userData={allSelectedUsersUsersData }
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
                                       onSearch={allSelectedUsersDepartmentSearchData}
                                       currentPageNumber={allSelectedUsersCurrentPageNumber}
                                       allSelect={allSelectedUsersAllSelect}
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
                                   addUsersDepartmentSearchData={addUsersDepartmentSearchData}
                                   addUsersCurrentPageNumber={addUsersCurrentPageNumber}/>
                                   : ''}


            </div>
        )
    }

}


export default CommonCreationView