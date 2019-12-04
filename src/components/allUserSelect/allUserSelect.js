import React, { Component } from 'react';
import { Checkbox, Select, Option } from 'antd';
import './allUserSelect.scss'
import UserSearch from '../common/UserSearch/userSearch'


class AllUserSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checkedList: [],
            indeterminate: false,
            checkAll: false,
            rowsPerPage: 30,
            activeheading: "",
            sortingtype: "dsc"
        }
        this.plainOptions = []
        console.log("hai bhai mai constructor", this.props.userData)
    }

    onChangeCheckBoxGroup = async (checkedItem) => { //on click of every single checkbox
        await this.setState({
            checkedList: checkedItem,
            indeterminate: !!checkedItem.length && checkedItem.length < this.plainOptions.length,
            checkAll: checkedItem.length === this.plainOptions.length,
        })
        this.props.onChangeCheckBox(this.state.checkedList)
    }

    onCheckAll = async (e) => { //when clicked on main checkbox(click all)
        await this.setState({
            checkedList: e.target.checked ? this.plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        })
        this.props.onChangeCheckBox(this.state.checkedList)
    }

    onChangeRowsPerPage = (value) => { //when changing data per rows
        this.setState({
            rowsPerPage: value,
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        })
        this.props.onChangeRowsPerPage(value)
    }

    onheadingClick = async (data) => { //when clicking all the top heading labels... changing arrow signs 
        await this.setState({ activeheading: data })

        let sortingtype = "asc"

        if (this[data].classList.contains("data_asc")) {
            this[data].classList.remove("data_asc")
            this[data].classList.add("data_dsc")
            sortingtype = "dsc"
        } else if (this[data].classList.contains("data_dsc")) {
            this[data].classList.remove("data_dsc")
            this[data].classList.add("data_asc")
            sortingtype = "asc"
        } else {
            this[data].classList.add("data_asc")
            sortingtype = "asc"
        }
        this.props.headingClickData(data, sortingtype)
    }


    modellingData = (userData, allHeadingsData) => { //handelling datas and modifying accordingly
        let modifiedUserData = JSON.parse(JSON.stringify(userData))
        if (modifiedUserData.length) {
            modifiedUserData.forEach(singleUserData => {
                allHeadingsData.forEach(data => {
                    const dataType = data.type
                    switch (dataType) {
                        case "text":
                            singleUserData["name"] = singleUserData.firstname + " " + singleUserData.lastname
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


    render() {
        const { allHeadingsData, userData, searchFirstButtonName, searchSecondButtonName, searchPlaceHolder, searchFirstButtonLoader,
            searchSecondButtonLoader, searchLoader, onSearch, totalUsers, goPrevPage, goNextPage, currentPageNumber, headingClickData } = this.props
        const perPageOptions = [7, 10, 20, 30, 40, 50, 100]
        const { checkedList, indeterminate, checkAll, rowsPerPage, activeheading } = this.state
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
                        firstButtonLoader={searchFirstButtonLoader} secondButtonLoader={searchSecondButtonLoader} searchLoader={searchLoader} onSearch={onSearch} />

                    <div className="all_user_details" >
                        <div className="upper_heading_details">
                            <div className="upper_checkbox">
                                <Checkbox value="A" indeterminate={indeterminate} onChange={this.onCheckAll} checked={checkAll} />
                            </div>

                            <div className="all_headings" style={{ "grid-template-columns": `repeat(${allHeadingsData.length}, calc(100%/${allHeadingsData.length}))` }}>
                                {allHeadingsData.map(data => (<div key={data._id} className={`single_heading ${activeheading == data._id ? "active_heading" : "inactive_heading"}`} ref={ele => this[data._id] = ele} onClick={() => this.onheadingClick(data._id)}>{data.lbl}</div>))}
                            </div>

                            <div className="column_settings">
                                <img src={require('../../images/svg/settings_grey.svg')} />
                            </div>
                        </div>
                        <div className="lower_user_details">
                            <div className="lower_user_details_container">
                                <Checkbox.Group value={checkedList} onChange={this.onChangeCheckBoxGroup}>
                                    {modifiedUserData.map(user => {

                                        return (
                                            <div className="user_details_container">
                                                <div className="lower_checkbox">
                                                    <Checkbox value={user._id} onChange={this.onChangeSingleCheckBox} />
                                                </div>
                                                <div className="single_user_details" style={{ "grid-template-columns": `repeat(${allHeadingsData.length}, calc(100%/${allHeadingsData.length}))` }}>
                                                    {allHeadingsData.map(columnData => {
                                                        let profileImage = require("../../images/svg/defaultProfile.svg")
                                                        if (user["profile_image"]) {
                                                            profileImage = user["profile_image"]["thumbnail"]
                                                            //console.log(user["profile_image"]["thumbnail"])
                                                        }
                                                        return (
                                                            <div>
                                                                {columnData._id == "name" ?
                                                                    <span>
                                                                        <img src={profileImage} />
                                                                    </span>
                                                                    : ""}{user[columnData._id] || "--"}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                </Checkbox.Group>
                            </div>
                        </div>
                    </div>

                    <div className="total_users">
                        <div className="total_users_container">
                            <div className="total_users_count">
                                <p>Total Users: {totalUsers}</p>
                            </div>
                            <div className="pagination">
                                <div className="rows_per_page">
                                    <p>Rows per page :</p>

                                    <Select defaultValue={30} style={{ width: 60 }} loading={false} onChange={this.onChangeRowsPerPage}>
                                        {perPageOptions.map(data => (<Select.Option value={data}>{data}</Select.Option>))}
                                    </Select>
                                </div>
                                <div className="page_no">
                                    <div className="current_page">{currentPageNumber} of {totalPages}</div>
                                    <div className="change_page">
                                        <span className={`prev_page ${currentPageNumber === 1 ? "prev_page_blocked" : ""}`}>
                                            <img src={require("../../images/svg/left-arrow.svg")} onClick={goPrevPage} />
                                        </span>
                                        <span className={`next_page ${currentPageNumber === totalPages ? "next_page_blocked" : ""}`}>
                                            <img src={require("../../images/svg/right-arrow.svg")} onClick={goNextPage} />
                                        </span></div>
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