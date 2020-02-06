import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AllUserSelect from '../allUserSelect/allUserSelect'
import './nodeOpenView.scss'
import { designationsData, postCommonCreateData, commonActionForCommonReducer, patchCommonCreateData, getSingleFieldData } from '../../store/actions/actions'
import { withRouter } from "react-router-dom";
import CreationPopUp from '../../components/common/CreationPopUp/CreationPopUp'
import { message } from 'antd'
import { getNodeId } from '../../utils/helper'


class FieldOpenView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeheading: "",
            sortingType: "",
            searchData: "",
            creationPopUpVisibility: false,
            newFieldItemName: "",
            checkedDataKeys: [],
            creationPopUpMode: "add",
            editRowName: "",
            editRowId: "",
            singleNodeId: "",
            filterKeyId: this.props.history.location.state.uniqueTableHeadingId,
            apiCallFlag: false
        }

    }

    componentDidMount() {
        this.updateNodeId(true)
    }

    componentDidUpdate(prevProps, prevState) {
        const currentNodeId = getNodeId(this.props.history)

        // if (prevState.patchDataCreatedSuccessfully) {
        //     if (this.props.commonReducer.patchDataCreatedSuccessfully !== prevState.patchDataCreatedSuccessfully) {
        //         this.updateNodeId()
        //     }
        // }

        const { apiCallFlag } = this.state
        if (prevState.singleNodeId !== currentNodeId && !apiCallFlag) {
            this.setState({ singleNodeId: currentNodeId, apiCallFlag: true, filterKeyId: this.props.history.location.state.uniqueTableHeadingId })
            this.updateNodeId(false)
        }
        if (apiCallFlag) {
            this.setState({ apiCallFlag: false })
        }
    }


    updateNodeId = (status) => {
        const nodeId = getNodeId(this.props.history)
        if (status) this.setState({ singleNodeId: nodeId })
        this.props.getSingleFieldData(nodeId, this.state.rowsPerPage)
    }

    fieldSearchData = (e) => {
        const { singleNodeId, rowsPerPage, activeheading, sortingType, filterKeyId } = this.state
        const searchData = e.target.value
        this.props.getSingleFieldData(singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType, filterKeyId)
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    }


    onClickHeadingColumn = (activeheading, sortingType) => {
        const { rowsPerPage, searchData, currentPageNumber, singleNodeId, filterKeyId } = this.state
        this.props.getSingleFieldData(singleNodeId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType, filterKeyId)
        this.setState({
            activeheading,
            sortingType
        })
    }

    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        const { filterKeyId } = this.state
        let editRowName = ""
        let editRowId = ""

        if (selectedRows[0]) {
            editRowName = selectedRows[0][filterKeyId]
            editRowId = selectedRows[0]._id
        }
        this.setState({
            checkedDataKeys: selectedRowsKeys,
            editRowName,
            editRowId,
            newFieldItemName: editRowName
        })
    }


    onChangeRowsPerPage = (rowsPerPage) => {
        const { searchData, activeheading, sortingType, singleNodeId, filterKeyId } = this.state
        this.props.getSingleFieldData(singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType, filterKeyId)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }


    changePage = (calcData) => {
        const { currentPageNumber, rowsPerPage, searchData, activeheading, sortingType, singleNodeId, filterKeyId } = this.state

        const goToPage = currentPageNumber + calcData
        this.props.getSingleFieldData(singleNodeId, rowsPerPage, goToPage, searchData, activeheading, sortingType, filterKeyId)
        this.setState({
            currentPageNumber: goToPage
        })
    }

    onRowClick = (rowData) => {
        const { singleNodeId, filterKeyId } = this.state
        this.props.history.push(`/people/field/${singleNodeId}/${rowData._id}`, { uniqueTableHeadingId: filterKeyId })
    }

    creationPopUpInput = (e) => {
        const { editRowName } = this.state
        const inputData = e.target.value
        this.setState({ newFieldItemName: inputData, editRowName: inputData ? editRowName : "" })
    }



    onFieldItemActions = (actionType) => {
        this.setState({ creationPopUpVisibility: true, creationPopUpMode: "edit" })
    }

    onSaveEditOrCreateField = async (type) => {
        const { newFieldItemName, editRowId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType, filterKeyId, singleNodeId } = this.state
        if (type === "edit") {
            await this.props.patchCommonCreateData("node_items", singleNodeId, { [filterKeyId]: newFieldItemName }, editRowId) //waiting for the api to be patch
        } else {
            await this.props.postCommonCreateData("node_items", { [filterKeyId]: newFieldItemName }, singleNodeId) //waiting for the api to be posted
        }
        const { patchDataCreatedSuccessfully, patchSuccessMessage, newDataCreatedSuccessfully, errorMsg } = this.props.commonReducer // will be true if success is true from above post api and pop up will be closed
        if (type === "edit" ? patchDataCreatedSuccessfully : newDataCreatedSuccessfully) {
            this.setState({ creationPopUpVisibility: false, checkedDataKeys: [] })
            message.success(type === "edit" ? "Saved Successfully" : "Created Successfully ");
            this.props.commonActionForCommonReducer({ patchDataCreatedSuccessfully: false, newDataCreatedSuccessfully: false })
            this.props.getSingleFieldData(singleNodeId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        } else {
            message.error(errorMsg);
        }
    }

    render() {
        const { singleFieldData, singleFieldCount, singleFieldName } = this.props.commonReducer
        const { currentPageNumber, creationPopUpVisibility, newFieldItemName, checkedDataKeys, creationPopUpMode, editRowName, filterKeyId } = this.state

        const fieldsColumnData = [

            {
                "title": "Name",
                "dataIndex": filterKeyId,
                "_id": filterKeyId,
                "lbl": "Name",
                "type": "text",
                "isDraggable": true,
                "sorter": true,
                "sortDirections": ["descend", "ascend"],
                "ellipsis": true
            },
            {
                "title": "#People",
                "dataIndex": "count",
                "_id": "count",
                "lbl": "#People",
                "type": "number",
                "isDraggable": true,
                "sorter": true,
                "sortDirections": ["descend", "ascend"],
                "ellipsis": true
            }
        ]

        return (
            <div className="fields_main">
                <div className="fields_heading"><h3>{singleFieldName}</h3></div>

                <AllUserSelect userData={singleFieldData}

                    searchFirstButtonName={"IMPORT RESOURCES"}
                    searchSecondButtonName={"ADD NEW ITEM"}
                    allHeadingsData={fieldsColumnData}
                    searchPlaceHolder={`Search ${singleFieldName}`}
                    onSearch={this.fieldSearchData}
                    typeOfData="Total Items"

                    headingClickData={this.onClickHeadingColumn}
                    onChangeCheckBox={this.onChangeCheckBox}
                    searchSecondButtonClick={() => this.setState({ creationPopUpVisibility: true, creationPopUpMode: "add" })}


                    totalUsers={singleFieldCount}
                    currentPageNumber={currentPageNumber}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                    goPrevPage={() => this.changePage(-1)}
                    goNextPage={() => this.changePage(1)}

                    // //onClick Designation Header Action Buttons
                    onClickUserDelete={() => this.onFieldItemActions("delete")}
                    onClickUserEdit={() => this.onFieldItemActions("edit")}

                    isUserData={false}

                    onClickTableRow={this.onRowClick}

                    // //buttons to show and hide 
                    showHeaderButtons={[{ id: "edit", label: "Edit Item" }, { id: "delete", label: "Delete Items" }]}
                    disableButtonNames={[checkedDataKeys.length > 1 ? "edit" : ""]}

                    // //to empty the selected Data
                    selectedDataCount={checkedDataKeys.length}
                />


                <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                    creationPopUpTitle={creationPopUpMode === "add" ? "Add New Item" : "Edit Item name"}
                    creationPopFirstButtonName={"Cancel"}
                    creationPopSecondButtonName={creationPopUpMode === "add" ? "Create" : "Save"}
                    fieldHeader={"Item Name"}
                    fieldPlaceHolder={"Enter Item Name"}
                    inputValue={newFieldItemName || editRowName}
                    creationPopFirstButtonHandler={() => this.setState({ creationPopUpVisibility: false })}
                    creationPopSecondButtonHandler={() => this.onSaveEditOrCreateField(creationPopUpMode)}
                    secondButtonDisable={newFieldItemName.length < 3 || newFieldItemName === editRowName ? true : false}
                    afterClose={() => this.setState({ newFieldItemName: "", editRowName: "" })}
                    creationPopUpFirstFieldChangeHandler={this.creationPopUpInput}

                />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        //designationsReducer: state.designationsReducer,
        commonReducer: state.commonReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            designationsData,
            postCommonCreateData,
            commonActionForCommonReducer,
            patchCommonCreateData,
            getSingleFieldData
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FieldOpenView))
