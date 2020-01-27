import React, { Component } from 'react';
import { Input, Button, Tooltip } from 'antd';
import './userSearch.scss'
import SearchDropdown from '../searchDropDown/searchDropDown'
import { capitalFirstLetter } from '../../../utils/helper'

class UserSearch extends Component {

    constructor(props) {
        super(props);

    }


    debounce = (fn, time) => { //TO DO
        let timeout;

        return function () {
            const functionCall = () => fn.apply(this, arguments);

            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        }
    }


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


    render() {

        const { firstButtonName = "IMPORT", secondButtonName = "ADD", searchPlaceHolder = "Search", firstButtonLoader = false,
            secondButtonLoader = false, searchLoader = false, onSearch, onClickFirst, onClickSecond, userSelected,
            isUserData = true, onlySelectAndAdd = false, allSelect = false, onSearchDropdownSelect, searchDropdownPlaceholder,
            searchDropdownData, onChangeSearchDropdown, showButtonNames = [], disableButtonNames = [] } = this.props

        let startActionPoint = !isUserData ? 3 : 0
        let endActionPoint = 5
        if (allSelect) {
            startActionPoint = 3
            endActionPoint = 4
        }

        const alluserActions = this.createUserActionButtons(showButtonNames)

        // const alluserActions = this.createUserActionButtons([])

        return (
            <div className={`search_and_buttons ${userSelected ? "user_selected" : "no_user_selected"}`}>
                <div className="search_users">
                    <Input.Search placeholder={searchPlaceHolder} loading={searchLoader} onChange={onSearch} />
                </div>
                <div className="all_buttons">
                    {userSelected && !onlySelectAndAdd ?
                        <div className="user_action_buttons">
                            <Tooltip key={`totalUserstooltip`} placement="top" title={"Total Users Selected"}>
                                <div className="user_count">{userSelected}</div>
                            </Tooltip>
                            {alluserActions.slice(startActionPoint, endActionPoint).map((data, i) => {
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
                        :
                        !allSelect ?
                            <>
                                <Button className={`import_button ${onlySelectAndAdd && !userSelected ? "import_button_disable" : ""}`} type="primary" loading={firstButtonLoader} onClick={onClickFirst}>
                                    {firstButtonName}
                                    {onlySelectAndAdd && userSelected ?
                                        <div>
                                            {userSelected}
                                        </div> : ""}
                                </Button>

                                {!onlySelectAndAdd ?
                                    <Button className="add_user_button" type="primary" loading={secondButtonLoader} onClick={onClickSecond}>
                                        {secondButtonName}
                                    </Button>
                                    : ""}

                            </>

                            : < SearchDropdown onSelect={onSearchDropdownSelect} placeholder={searchDropdownPlaceholder} searchData={searchDropdownData} onChange={onChangeSearchDropdown} />
                    }

                </div>
            </div>
        );
    }
}

export default UserSearch;
