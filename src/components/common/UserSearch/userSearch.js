import React, { Component } from 'react';
import { Input, Button, Tooltip } from 'antd';
import './userSearch.scss'
import SearchDropdown from '../searchDropDown/searchDropDown'
import { capitalFirstLetter, debounce } from '../../../utils/helper'

class UserSearch extends Component {


    createUserActionButtons = (buttonNames) => {
        const defaultActionButtons = ["activate", "deactivate", "delete", "edit", "duplicate"] //types of default action buttons that we want keep
        const incomingActionButtons = {} //to store all the id of incoming button id for validation of uniqueness
        const copyData = JSON.parse(JSON.stringify(buttonNames))  //making a copy of original array of objects so that sorting does not alter it
        const uniqueAndLegitButtons = [] // all the unique and legit(which will have ids that are in defaultActionButtons) will be kept here

        copyData.forEach(data => {
            if (defaultActionButtons.includes(data.id) && !incomingActionButtons[data.id]) { // doing all the validations here for uniqueness and if it is one of pour legit buttons or not
                incomingActionButtons[data.id] = true // pushing all the ids that are unique for recheck..if they come again they will not enter the loop
                uniqueAndLegitButtons.push({
                    class: `user_${data.id}`,
                    img: `user-${data.id}`,
                    onclick: this.props[`onUser${capitalFirstLetter(data.id)}`],
                    tooltip: capitalFirstLetter(data.label),
                    id: data.id
                }) //if legit we push it to final array
            }
        });

        uniqueAndLegitButtons.sort(function (a, b) { // sorting alphabetically
            var x = a.id.toLowerCase();
            var y = b.id.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });

        return uniqueAndLegitButtons;
    }


    addUserClick = () => {
        if (this.props.onClickAddUserButton) {
            this.props.onClickAddUserButton()
        }
    }

    onSearch =  debounce(searchValue => { 
        if(this.props.onSearch) this.props.onSearch(searchValue) 
    }, this.props.searchDebounceTime || 0)

    render() {

        const { firstButtonName = "IMPORT", secondButtonName = "ADD", searchPlaceHolder = "Search", firstButtonLoader = false,
            secondButtonLoader = false, searchLoader = false, onClickFirst, onClickSecond, userSelected,
            onlySelectAndAdd = false, allSelect = false, onSearchDropdownSelect, searchDropdownPlaceholder,
            searchDropdownData, onChangeSearchDropdown, showButtonNames = [], disableButtonNames = [], searchDropDownValue , searchDropDownDebounceTime} = this.props

        const alluserActions = this.createUserActionButtons(showButtonNames)

        return (
            <div className={`search_and_buttons ${userSelected ? "user_selected" : "no_user_selected"}`}> {/*if userSelected id true the background color will change...and different class will be implemented */}
                <div className="search_users">
                    <Input.Search placeholder={searchPlaceHolder} loading={searchLoader} onChange={(e)=>this.onSearch(e.target.value)} />
                </div>
                <div className="all_buttons">
                    {userSelected && !onlySelectAndAdd ? //if userSelected true and onlySelectAndAdd is false then buttons to do action on table data will be visible 
                        <div className="user_action_buttons">
                            <Tooltip key={`totalUserstooltip`} placement="top" title={"Total Selected"}>
                                <div className="user_count">{userSelected}</div>
                            </Tooltip>
                            {alluserActions.map((data, i) => {
                                if (data.class !== "partition_div") {
                                    return (
                                        <Tooltip key={`${data.class}tooltip`} placement="top" title={data.tooltip}>
                                            <img className={`${data.class} ${disableButtonNames.includes(data.id) ? "action_deactivated" : "action_active"}`}
                                                src={require(`../../../images/svg/${data.img}.svg`)} onClick={data.onclick} alt={data.class} />
                                        </Tooltip>
                                    )

                                } else {
                                    return (
                                        <div key={data.class} className={data.class}></div>
                                    )
                                }
                            }
                            )}
                        </div>
                        : // else the normal button will be visible
                        !allSelect ? // if "allSelect" true then one more search with dropDown will be visible or else normal buttons will be there 
                            <>
                                {onClickFirst ? <Button className={`import_button ${onlySelectAndAdd && !userSelected ? "import_button_disable" : ""}`} type="primary" loading={firstButtonLoader} onClick={onClickFirst}>
                                    {firstButtonName}
                                    {onlySelectAndAdd && userSelected ?
                                        <div>
                                            {userSelected}
                                        </div> : ""}
                                </Button> : null}

                                {onClickSecond ?
                                    <Button className="add_user_button" type="primary" loading={secondButtonLoader} onClick={onClickSecond}>
                                        {secondButtonName}
                                    </Button>
                                    : null}

                            </>

                            : <div className="suggestionSearch_with_addUser">
                                <SearchDropdown onSelect={onSearchDropdownSelect} placeholder={searchDropdownPlaceholder} searchData={searchDropdownData} onChange={onChangeSearchDropdown} value={searchDropDownValue} debounceTime={searchDropDownDebounceTime}/>
                                <div className="add_user">
                                    <div className="vLine"></div>
                                    <img src={require('../../../images/svg/user-add-list.svg')} alt="add-user" onClick={this.addUserClick} />
                                </div>
                            </div>
                    }

                </div>
            </div>
        );
    }
}

export default UserSearch;
