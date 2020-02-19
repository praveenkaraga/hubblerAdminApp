import React, { Component } from 'react';
import './organisationsAddUser.scss'
import SearchDropdown from '../../searchDropDown/searchDropDown'
import UserCardView from '../../userCardView/userCardView'
import CommonCreationView from '../../CommonCreationView/CommonCreationView'

class OrganisationsAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {
            // props for adding manager{searchDropDown}
            onSearchDropdownSelect, searchDropdownPlaceholder, searchDropdownData, onChangeSearchDropdown,

            //
            addUsersCommonCardTitle = "Add Reportees",
            addUsersCommonCardSubText = "You don't have any Reportees here. Please add from the Users list.",
            backButton = false

        } = this.props
        return (
            <div className="organisationAdduser_main">
                <div className="organisationAdduser_container">
                    <h3 className="main_heading">Organisation Details</h3>
                    <div className="manager_main">
                        <h3 className="manager_heading">MANAGER</h3>
                        {/* <div className="search_with_add_img">
                            <SearchDropdown onSelect={onSearchDropdownSelect} placeholder={searchDropdownPlaceholder} searchData={searchDropdownData}
                                onChange={onChangeSearchDropdown} searchIcon={true} width={300} />
                            <div className="add_manager__img_container"><img className="add_manager" src={require('../../../../images/svg/add-manager.svg')} /></div>
                        </div> */}
                        < UserCardView />
                    </div>
                    <hr className="splitter" />
                    <div className="reportees_main">
                        <h3 className="reportees_heading">REPORTEES</h3>
                        <CommonCreationView
                            //when no reportees are there
                            // addUsersCommonCardButtonClick
                            addUsersCommonCardTitle={addUsersCommonCardTitle}
                            addUsersCommonCardSubText={addUsersCommonCardSubText}
                            backButton={backButton}

                        // viewDecider={searchData || singleViewCount ? 1 : 0}
                        // allSelectedUsersUsersData={singleViewData}
                        // allSelectedUsersHeadingsData={tableColumnData}
                        // allSelectedUsersAllSelect={true}
                        // allSelectedUsersSearchData={this.onChangeSearch}
                        // allSelectedUsersPlaceHolder={`Search ${singleViewName}`}
                        // allSelectedUsersOnClickHeadingColumn={this.onClickHeading}
                        // allSelectedUsersTotalUsers={singleViewCount}
                        // allSelectedUsersCurrentPageNumber={currentPageNumber}
                        // allSelectedUsersOnChangeCheckBox={this.onChangeCheckBox}
                        // allSelectedUsersOnChangeRowsPerPage={this.onChangeRowsPerPage}
                        // allSelectedUsersShowHeaderButtons={[{ id: "delete", label: "Remove" }]} //BUttons to show when row selected
                        // allSelectedUsersSelectedDataCount={checkedDataKeys.length}
                        // allSelectedUsersOnClickAddUserButton={() => this.onClickOfAddUsers(true)}
                        // allSelectedUsersChangePage={this.onChangePage}
                        // allSelectedUsersOnClickUserActions={() => this.setState({ visibilityOfDeletePopUp: true })}

                        // //search with suggestion comp props
                        // allSelectedUsersSearchDropdownPlaceholder={"Enter Name and Add"}
                        // allSelectedUsersOnChangeSearchDropdown={this.onChangeSearchDropdown}
                        // allSelectedUsersOnSearchDropdownSelect={this.onSearchDropdownSelect}
                        // allSelectedUsersSearchDropdownData={suggestionSearchData ? singleViewSuggestionData : []}


                        //         //all below prop is for add Selected users popup
                        //         showAddUsersPopUp={addUsersPopUpStatus}
                        //         addUsersPopUpClose={() => this.onClickOfAddUsers(false)}
                        //         addUsersPopUpTableColumnsData={tableColumnData}
                        //         addUsersPopUpUsersData={singleViewSuggestionData}
                        //         addUsersPopUpTotalUsers={singleViewSuggestionDataCount}
                        //         addUsersOnClickHeadingColumn={this.addUsersOnClickHeadingColumn}
                        //         addUsersOnChangeRowsPerPage={this.addUsersOnChangeRowsPerPage}
                        //         addUsersSearchData={this.onSearchInAddUsers}
                        //         addUsersPopUpOnChangeCheckBox={this.addUsersPopUpOnChangeCheckBox}
                        //         addUsersSelectedDataCount={addUsersCheckedDataKeys.length}
                        //         addUsersChangePage={this.addUsersChangePage}
                        //         addUsersCurrentPageNumber={addUsersCurrentPageNumber}
                        //         addUsersPopUpFirstButtonClick={this.onClickAddSelectedButton} />
                        />

                    </div>
                </div>

            </div>
        );
    }
}

export default OrganisationsAddUser;