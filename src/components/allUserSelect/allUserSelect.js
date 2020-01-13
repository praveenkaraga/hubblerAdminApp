import React, { Component } from 'react';
import { Select, Popover } from 'antd';
import './allUserSelect.scss'
import UserSearch from '../common/UserSearch/userSearch'
import AddUser from '../addUser/addUser'
import ColumnSetting from './columnSetting/columnSetting'
import UserTable from '../userTable/userTable'


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
            visibleColumnSetting: false,
        }
        this.plainOptions = []
    }

    onChangeRowsPerPage = (value) => { //when changing data per rows
        this.setState({
            rowsPerPage: value,

        })
        this.props.onChangeRowsPerPage(value)
    }

    onheadingClick = (data) => { //when clicking all the top heading labels... changing arrow signs 
        let sortingtype = ""

        if (data.order === "descend") {
            sortingtype = "dsc"
        } else if (data.order === "ascend") {
            sortingtype = "asc"
        } else {
            sortingtype = ""
        }
        this.props.headingClickData(sortingtype ? data.field : "", sortingtype || "")

    }

    onChangeCheckBox = (list) => {
        this.props.onChangeCheckBox(list)
        this.setState({ checkedList: list })
    }


    modellingData = (userData, allHeadingsData) => { //handelling datas and modifying accordingly
        const { isUserData } = this.props
        let modifiedUserData = JSON.parse(JSON.stringify(userData))
        if (modifiedUserData.length) {
            modifiedUserData.forEach(singleUserData => {
                allHeadingsData.forEach(data => {
                    const dataType = data.type
                    switch (dataType) {
                        case "text":
                            singleUserData["name"] = <div className="name_with_image"> {isUserData ? singleUserData["profile_image"] ? <img src={singleUserData["profile_image"]["thumbnail"]} alt="Profile Pic" /> : <div className="no_profile_pic"><p>{singleUserData.firstname.substring(0, 2)}</p></div> : ""}<div className="only_name">{singleUserData.firstname || ""}  {singleUserData.lastname || ""}</div></div>
                            singleUserData["key"] = singleUserData._id
                            break;
                        case "number":
                            break;
                        case "object":
                            if (singleUserData[data._id]) {
                                if (Array.isArray(singleUserData[data._id])) {
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

    handleVisibleChange = visible => {
        this.setState({ visibleColumnSetting: visible });
        this.props.onClickColumnSetting()
    };





    render() {
        const { allHeadingsData, userData, searchFirstButtonName, searchSecondButtonName, searchPlaceHolder, searchFirstButtonLoader = false, onChangeCheckBox,
            searchSecondButtonLoader = false, searchFirstButtonClick, searchSecondButtonClick, searchLoader = false, onSearch, totalUsers, goPrevPage, goNextPage, currentPageNumber, columnSettingData,
            onClickUserActivate, onClickUserDeactivate, onClickUserDelete, onClickUserEdit, addUserPopUpActive, addUserCloseButton, addUserDataForm, isUserData = true, onlySelectAndAdd = false,
            typeOfData = "Total Data", onClickTableRow, columnConfigurable = false, allSelect } = this.props
        const perPageOptions = [7, 10, 20, 30, 40, 50, 100]
        const { checkedList, rowsPerPage, visibleColumnSetting } = this.state
        const totalPages = Math.ceil(totalUsers / rowsPerPage)
        this.plainOptions = []
        userData.forEach(element => {
            this.plainOptions.push(element._id)
        });
        const modifiedUserData = this.modellingData(userData, allHeadingsData)
        return (
            <div className="allUserSelect_main">
                <div className="allUserSelect_container">
                    <UserSearch firstButtonName={searchFirstButtonName} secondButtonName={searchSecondButtonName} searchPlaceHolder={searchPlaceHolder}
                        firstButtonLoader={searchFirstButtonLoader} secondButtonLoader={searchSecondButtonLoader} searchLoader={searchLoader} onSearch={onSearch}
                        onClickFirst={searchFirstButtonClick} onClickSecond={searchSecondButtonClick} userSelected={checkedList.length}
                        onUserActivate={onClickUserActivate} onUserDeactivate={onClickUserDeactivate} onlySelectAndAdd={onlySelectAndAdd}
                        onUserDelete={onClickUserDelete} onUserEdit={onClickUserEdit} addUserPopUpActive={addUserPopUpActive} isUserData={isUserData} allSelect={allSelect} />


                    <div className="setting_table_combine">
                        {columnConfigurable ? <div className="column_settings">
                            <Popover
                                content={<ColumnSetting columnData={allHeadingsData} columnSettingData={columnSettingData} />}
                                title="Column Setting"
                                trigger="click"
                                visible={this.state.visibleColumnSetting}
                                placement="bottomRight"
                                autoAdjustOverflow
                                overlayClassName="allUserSelect_popover"
                            >
                                <img src={require(`../../images/svg/${!visibleColumnSetting ? "settings_grey" : "close-app"}.svg`)}
                                    onClick={() => this.handleVisibleChange(visibleColumnSetting ? false : true)} alt="Column Setting" />

                            </Popover>
                        </div> : ""}

                        <UserTable ref={table => this.wholeTable = table} modifiedUserData={modifiedUserData} allHeadingsData={allHeadingsData}
                            sortingData={this.onheadingClick} onChangeCheckBox={this.onChangeCheckBox} loading={!modifiedUserData.length ? true : false} onClickTableRow={onClickTableRow} />
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
                                            <img src={require("../../images/svg/left-arrow.svg")} onClick={goPrevPage} alt="Left Arrow" />
                                        </span>
                                        <span className={`next_page ${currentPageNumber === totalPages ? "next_page_blocked" : ""}`} alt="Right Arrow">
                                            <img src={require("../../images/svg/right-arrow.svg")} onClick={goNextPage} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {addUserPopUpActive ? <AddUser onClickClose={addUserCloseButton} addUserDataForm={addUserDataForm} /> : ""}
            </div>
        )
    }
}




export default AllUserSelect