import React, {Component} from 'react';
import './commonCreationView.scss'
import AddUsersCommonCard from '../../common/AddUsersCommonCard/AddUsersCommonCard'
import AllUserSelect from "../../allUserSelect/allUserSelect";
import AddUsersPopUp from '../../common/AddUsersPopUp/AddUsersPopUp'

class CommonCreationView extends Component {


    render() {
        const {commonCreationViewHeaderName, commonCreationViewBackButtonClick, backButton = true, viewDecider = 0} = this.props;
        const {addUsersCommonCardButtonClick} = this.props
        const {allSelectedUsersHeadingsData, allSelectedUsersUsersData, allSelectedUsersTotalUsers, allSelectedUsersPlaceHolder = `Search Department`,allSelectedUsersFirstButtonName = `Add Selected`,allSelectedUsersIsUserData = true, allSelectedUsersOnChangeCheckBox,allSelectedUsersOnlySelectAndAdd = true,allSelectedUsersFirstButtonClick,
            allSelectedUsersOnClickHeadingColumn,allSelectedUsersOnChangeRowsPerPage,allSelectedUsersChangePage,allSelectedUsersDepartmentSearchData,allSelectedUsersCurrentPageNumber} = this.props;
        const {showAddUsersPopUp, addUsersPopUpTitle, addUsersPopUpClose,addUsersPopUpPlaceHolder,addUsersPopUpFirstButtonName, addUsersPopUpFirstButtonClick, addUsersPopUpOnChangeCheckBox, addUsersPopUpTableColumnsData, addUsersPopUpUsersData, addUsersPopUpTotalUsers, addUsersPopUpIsUserData, addUsersPopUpOnlySelectAndAdd,
            addUsersOnClickHeadingColumn,addUsersOnChangeRowsPerPage,addUsersChangePage,addUsersDepartmentSearchData,addUsersCurrentPageNumber,
        } = this.props
        return (
            <div className={'common-creation-view'}>
                <div>
                    <div className={backButton ? 'headerWithBackArrow' :'headerWithoutBackArrow' }
                         onClick={backButton ? () => commonCreationViewBackButtonClick() : ''}
                        // onClick={()=>{this.setState({tr : "iiii"})}}
                        >
                    {commonCreationViewHeaderName}

                    </div>

                    {/*{backButton ? <div className={'headerWithBackArrow'}
                                       onClick={() => commonCreationViewBackButtonClick()}>{commonCreationViewHeaderName}</div> :
                        <div className={'headerWithoutBackArrow'}>
                            {commonCreationViewHeaderName}
                        </div>}*/}
                </div>

                {viewDecider < 1 ?
                    <AddUsersCommonCard addUsersCommonCardButtonClick={addUsersCommonCardButtonClick}/> :

                    <div className={'all-selected-users-wrap'}>
                        <AllUserSelect allHeadingsData={allSelectedUsersHeadingsData}
                                       userData={allSelectedUsersUsersData }
                                       searchPlaceHolder={allSelectedUsersPlaceHolder}
                                       searchFirstButtonName={allSelectedUsersFirstButtonName}
                                       totalUsers={allSelectedUsersTotalUsers}
                                       isUserData={allSelectedUsersIsUserData}
                                       onChangeCheckBox={allSelectedUsersOnChangeCheckBox} onlySelectAndAdd={allSelectedUsersOnlySelectAndAdd}
                                       searchFirstButtonClick={allSelectedUsersFirstButtonClick}
                                       onChangeRowsPerPage={allSelectedUsersOnChangeRowsPerPage}
                                       headingClickData={allSelectedUsersOnClickHeadingColumn}
                                       goPrevPage={() => allSelectedUsersChangePage(-1)}
                                       goNextPage={() => allSelectedUsersChangePage(1)}
                                       onSearch={allSelectedUsersDepartmentSearchData}
                                       currentPageNumber={allSelectedUsersCurrentPageNumber}


                        />
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