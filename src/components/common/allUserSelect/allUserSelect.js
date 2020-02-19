import React, { Component } from 'react';
import { Select } from 'antd';
import './allUserSelect.scss'
import UserSearch from '../../common/UserSearch/userSearch'
import AddUser from '../../common/addUser/addUser'
import UserTable from '../../common/userTable/userTable'
import ColumnSettingWithPopOver from './columnSetting/columnSettingWithPopOver/columnSettingWithPopOver'


class AllUserSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checkedList: [],
            indeterminate: false,
            checkAll: false,
            rowsPerPage: 30,
            activeheading: "",
            sortingtype: "dsc",
            popUpActive: false,
        }
    }

    onChangeRowsPerPage = (value) => { //when changing data per rows
        this.setState({
            rowsPerPage: value,

        })
        this.props.onChangeRowsPerPage(value)
    }

    onheadingClick = (data) => { //when clicking all the top heading labels... changing arrow signs 
        let sortingtype = ""
        if (data.order === "descend") { //converting the output from the component to needed for backend
            sortingtype = "dsc"
        } else if (data.order === "ascend") {
            sortingtype = "asc"
        } else {
            sortingtype = ""
        }
        if (this.props.headingClickData) this.props.headingClickData(sortingtype ? data.field : "", sortingtype || "") //checking for headingClickData prop..

    }



    // on change of Checkbox we get two arguments...selectedRowsKeys will give all the keys selected in the table on any page
    //selectedRows will be all the rowsdata that we have selected on that page of the table
    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        if (this.props.onChangeCheckBox) this.props.onChangeCheckBox(selectedRowsKeys, selectedRows) //checking for onChangeCheckBox prop
    }



    //this be triggered when a row checkbox is selected or unselected
    //it gives us three arguments "record" is the data of current selected or unselected checkbox row
    //"selected" is a boolean value if row checkbox selected then it gives true and vice versa
    //"selectedRows" data of all the rows selected on that current page of table
    onSelectRow = (record, selected, selectedRows) => {
        if (this.props.onSelectRow) this.props.onSelectRow(record, selected, selectedRows) //if this prop is used then enable this prop
    }


    modellingData = (userData, allHeadingsData) => { //handelling api datas and modifying accordingly to fit in table properly 
        const { isUserData = true } = this.props
        let modifiedUserData = JSON.parse(JSON.stringify(userData)) //making a deep clone of incoming data
        if (modifiedUserData.length) { //checking if there is data or not 
            modifiedUserData.forEach(singleUserData => {
                allHeadingsData.forEach(data => {
                    const dataType = data.type
                    switch (dataType) { //checking for all types of data type
                        case "text": //if it is string 
                            singleUserData["name"] = <div className="name_with_image">
                                {isUserData ? // if prop isUserData true then we will show profile pic/ initial names as profiles pic(if pic is not there)

                                    !(singleUserData["deactivate"] === true) ? //checking if user is deactivated or not{a eactivated sign will be shown instead of profile pic}
                                        singleUserData["profile_image"] // checking if user has profile pic or not
                                            ?
                                            <img src={singleUserData["profile_image"]["thumbnail"]} alt="Profile Pic" /> //profile pic
                                            :
                                            <div className="no_profile_pic"><p>{singleUserData.firstname.substring(0, 2)}</p></div> //if no profile pic then we are showing first two intials of their first name
                                        : <div className="no_profile_pic"><img className="deactivated_user_pic" src={require('../../../images/svg/deactivate-user-pic.svg')} /></div>
                                    : ""}
                                <div className="only_name">{singleUserData.firstname || ""}  {singleUserData.lastname || ""}</div>
                            </div>
                            singleUserData["key"] = singleUserData._id
                            break;
                        case "number": //if type number display as it is
                            break;
                        case "object": // if type is object 
                            if (singleUserData[data._id]) { //checking value is there or not for that object
                                if (Array.isArray(singleUserData[data._id])) {  //checking if the object is array or proper object
                                    let tempData = []
                                    singleUserData[data._id].forEach(arrayData => {
                                        tempData.push(arrayData.name)
                                    })
                                    singleUserData[data._id] = tempData.join(", ")
                                } else {
                                    singleUserData[data._id] = singleUserData[data._id]["firstname"] + " " + singleUserData[data._id]["lastname"]
                                }
                            } else {
                                singleUserData[data._id] = ""
                            }
                            break;

                        default:
                            singleUserData[data._id] = ""
                    }
                })
            })

        }

        return modifiedUserData
    }

    onClickColumnSetting = () => { //on click of the column setting gear icon
        if (this.props.onClickColumnSetting) this.props.onClickColumnSetting() //checking if the prop is being passed or not
    };


    render() {
        const { allHeadingsData = [], userData = [], searchFirstButtonName, searchSecondButtonName, searchPlaceHolder, searchFirstButtonLoader = false, onChangeCheckBox,
            searchSecondButtonLoader = false, searchFirstButtonClick, searchSecondButtonClick, searchLoader = false, onSearch, totalUsers, goPrevPage, goNextPage, currentPageNumber, columnSettingData,
            onClickUserActivate, onClickUserDeactivate, onClickUserDelete, onClickUserEdit, isUserData = true, onlySelectAndAdd = false,
            typeOfData = "Total Data", onClickTableRow, columnConfigurable = false, allSelect, onSearchDropdownSelect, searchDropdownPlaceholder, searchDropdownData, onChangeSearchDropdown,
            showHeaderButtons, disableButtonNames, selectedDataCount, onClickAddUserButton, onSelectAll, onColumnSettingSave, visibleColumnSetting, onColumnSettingCancel, onChangeAddUsersTab,
            onSearchColumnSetting } = this.props
        const perPageOptions = [7, 10, 20, 30, 40, 50, 100]
        const { rowsPerPage } = this.state
        const totalPages = Math.ceil(totalUsers / rowsPerPage)
        const modifiedUserData = this.modellingData(userData, allHeadingsData)

        return (
            <div className="allUserSelect_main">
                <div className="allUserSelect_container">
                    <UserSearch firstButtonName={searchFirstButtonName} secondButtonName={searchSecondButtonName} searchPlaceHolder={searchPlaceHolder}
                        firstButtonLoader={searchFirstButtonLoader} secondButtonLoader={searchSecondButtonLoader} searchLoader={searchLoader} onSearch={onSearch}
                        onClickFirst={searchFirstButtonClick} onClickSecond={searchSecondButtonClick} userSelected={selectedDataCount}
                        onUserActivate={onClickUserActivate} onUserDeactivate={onClickUserDeactivate} onlySelectAndAdd={onlySelectAndAdd}
                        onUserDelete={onClickUserDelete} onUserEdit={onClickUserEdit} isUserData={isUserData}
                        allSelect={allSelect} onSearchDropdownSelect={onSearchDropdownSelect} searchDropdownPlaceholder={searchDropdownPlaceholder}
                        searchDropdownData={searchDropdownData} onChangeSearchDropdown={onChangeSearchDropdown} showButtonNames={showHeaderButtons}
                        disableButtonNames={disableButtonNames} onClickAddUserButton={onClickAddUserButton} />


                    <div className="setting_table_combine">
                        {columnConfigurable ? //checking if columnConfigurable true then show gear icon
                            <ColumnSettingWithPopOver
                                visibleColumnSetting={visibleColumnSetting}
                                onClickColumnSetting={this.onClickColumnSetting}
                                tableColumnHeadingData={allHeadingsData}
                                columnSettingData={columnSettingData}
                                onColumnSettingSave={onColumnSettingSave}
                                onColumnSettingCancel={onColumnSettingCancel}
                                onSearchColumnSetting={onSearchColumnSetting}
                            />
                            : null}


                        <UserTable ref={table => this.wholeTable = table} modifiedUserData={modifiedUserData} allHeadingsData={allHeadingsData}
                            sortingData={this.onheadingClick} onChangeCheckBox={this.onChangeCheckBox} loading={!modifiedUserData.length ? true : false}
                            onClickTableRow={onClickTableRow} onSelectRow={this.onSelectRow} selectedDataCount={selectedDataCount} onSelectAll={onSelectAll} />
                    </div>


                    <div className="total_users">
                        <div className="total_users_container">
                            <div className="total_users_count">
                                <p>{typeOfData || "Total Data"}: {totalUsers || 0}</p>
                            </div>
                            <div className="pagination">
                                <div className="rows_per_page">
                                    <p>Rows per page :</p>

                                    <Select defaultValue={30} style={{ width: 60 }} loading={false} onChange={this.onChangeRowsPerPage}>
                                        {perPageOptions.map(data => (<Select.Option value={data}>{data}</Select.Option>))}
                                    </Select>
                                </div>
                                <div className="page_no">
                                    <div className="current_page">{currentPageNumber || 0} of {totalPages || 0}</div>
                                    <div className="change_page">
                                        <span className={`prev_page ${currentPageNumber === 1 ? "prev_page_blocked" : ""}`}>
                                            <img src={require("../../../images/svg/left-arrow.svg")} onClick={goPrevPage} alt="Left Arrow" />
                                        </span>
                                        <span className={`next_page ${currentPageNumber === totalPages ? "next_page_blocked" : ""}`} alt="Right Arrow">
                                            <img src={require("../../../images/svg/right-arrow.svg")} onClick={goNextPage} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}




export default AllUserSelect