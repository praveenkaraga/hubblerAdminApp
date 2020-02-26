import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AllUserSelect from '../../common/allUserSelect/allUserSelect'
import './nodeOpenView.scss'
import {
    postCommonCreateData,
    commonActionForCommonReducer,
    patchCommonCreateData,
    getSingleFieldData,
    postCommonDelete
} from '../../../store/actions/PeopleActions/peopleActions'
import { withRouter } from "react-router-dom";
import CreationPopUp from '../../../components/common/CreationPopUp/CreationPopUp'
import { message, Modal } from 'antd'
import { getNodeId } from '../../../utils/helper'
import AddUsersCommonCard from '../../common/AddUsersCommonCard/AddUsersCommonCard'
import FullScreenLoader from '../../common/FullScreenLoader/fullScreenLoader'
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
            filterKeyId: "",
            apiCallFlag: true,

            visibilityOfDeletePopUp: false,
            loaderOfDeletePopUp: false
        }

    }

    componentDidMount() {
        this.updateNodeId(true, true)
    }

    static getDerivedStateFromProps(nextProps, prevState) {// have used this for updation of name.. when updating name in side..this will also render

        if (prevState.patchDataCreatedSuccessfully !== nextProps.commonReducer.patchDataCreatedSuccessfully) {//checking if the name is being changed
            return {
                patchDataCreatedSuccessfully: nextProps.commonReducer.patchDataCreatedSuccessfully
            };
        }

        //updating viewType when changing from similar view of different modules{like from designaton to departments}
        // if (nextProps.viewType !== prevState.viewType) return { viewType: nextProps.viewType }


        // if filter id used for row is change then updating it
        if (nextProps.commonReducer.singleFieldFilterKeyId !== prevState.filterKeyId) return { filterKeyId: nextProps.commonReducer.singleFieldFilterKeyId }

        return null;
    }


    // will rerender the component when we are clicking on different circle when we are already in a circle
    componentDidUpdate(prevProps, prevState) {
        const currentNodeId = getNodeId(this.props.history)// getting new node id

        const { apiCallFlag } = this.state// this flag is only for not calling this api two times when we land on circles for the first time
        if (prevState.singleNodeId !== currentNodeId && !apiCallFlag) {//if node id in url is different from the previous one this will call the api and rerender the component
            this.setState({ singleNodeId: currentNodeId, apiCallFlag: true })
            this.updateNodeId(false, true)
        }
        if (apiCallFlag) this.setState({ apiCallFlag: false }) // flag is true then make it false...will work on first time only

        if (prevState.patchDataCreatedSuccessfully && this.props.commonReducer.patchDataCreatedSuccessfully !== prevState.patchDataCreatedSuccessfully) {// also renaming the circle in the side will re render the component
            this.updateNodeId()
        }
    }

    //update node id from url on change
    updateNodeId = (status, toCall) => {
        const nodeId = getNodeId(this.props.history)//a common fn to take out id from url
        if (status) this.setState({ singleNodeId: nodeId })
        this.props.commonActionForCommonReducer({ fieldTableLoading : true })
        if(toCall)  this.props.commonActionForCommonReducer({ viewDeciderLoader : true })
        this.props.getSingleFieldData(nodeId, this.state.rowsPerPage)
    }


    // on search in table 
    fieldSearchData = (e) => {
        const { singleNodeId, rowsPerPage, activeheading, sortingType, filterKeyId } = this.state
        const searchData = e.target.value
        this.props.getSingleFieldData(singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType, filterKeyId)
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    }

    //on click of heading of all the rows of the table
    //will make ascend and descend that column
    onClickHeadingColumn = (activeheading, sortingType) => {
        const { rowsPerPage, searchData, currentPageNumber, singleNodeId, filterKeyId } = this.state
        this.props.commonActionForCommonReducer({ fieldTableLoading : true})
        this.props.getSingleFieldData(singleNodeId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType, filterKeyId)
        this.setState({
            activeheading,
            sortingType
        })
    }

    //on select and unselect of checkbox
    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        const { filterKeyId } = this.state
        let editRowName = ""
        let editRowId = ""

        if (selectedRows[0]) {// saving data of latest selected one
            editRowName = selectedRows[0][filterKeyId] // filterKeyId is the unique id for every fields name
            editRowId = selectedRows[0]._id
        }

        this.setState({
            checkedDataKeys: selectedRowsKeys,
            editRowName,
            editRowId,
            newFieldItemName: editRowName
        })
    }

    //on change of rows per page of the table
    onChangeRowsPerPage = (rowsPerPage) => {
        const { searchData, activeheading, sortingType, singleNodeId, filterKeyId } = this.state
        this.props.commonActionForCommonReducer({ fieldTableLoading : true})
        this.props.getSingleFieldData(singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType, filterKeyId)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    //on change of pages of the table
    changePage = (calcData) => {
        const { currentPageNumber, rowsPerPage, searchData, activeheading, sortingType, singleNodeId, filterKeyId } = this.state
        const goToPage = currentPageNumber + calcData
        this.props.commonActionForCommonReducer({ fieldTableLoading : true})
        this.props.getSingleFieldData(singleNodeId, rowsPerPage, goToPage, searchData, activeheading, sortingType, filterKeyId)
        this.setState({
            currentPageNumber: goToPage
        })
    }

    //on click of single row of designation table
    onRowClick = (rowData) => {
        const { singleNodeId, filterKeyId } = this.state
        this.props.history.push(`/people/field/${singleNodeId}/${rowData._id}`, { uniqueTableHeadingId: filterKeyId })
    }

    // on change of input field inside creation of designation popup
    creationPopUpInput = (e) => {
        const { editRowName } = this.state
        const inputData = e.target.value
        this.setState({ newFieldItemName: inputData, editRowName: inputData ? editRowName : "" })
    }


    // action being done on field node items{edit or delete}
    onFieldItemActions = async (actionType) => {
        const { singleNodeId, checkedDataKeys, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType } = this.state
        if (actionType === "edit") { // if edit then pop up will open to edit
            this.setState({ creationPopUpVisibility: true, creationPopUpMode: "edit" })
        } else { // if delete then api call will be done..and on success message will be shown
            this.setState({ loaderOfDeletePopUp: true })
            await this.props.postCommonDelete("nodes", { data: checkedDataKeys }, singleNodeId)
            const { postDeletedDataSuccessfulMessage, postDeletedDataSuccessfully, errorMsg } = this.props.commonReducer
            if (postDeletedDataSuccessfully) {
                message.success(postDeletedDataSuccessfulMessage)
                this.props.commonActionForCommonReducer({ postDeletedDataSuccessfully: false})
            } else {
                message.error(errorMsg)
            }
            this.props.commonActionForCommonReducer({ fieldTableLoading : true})
            this.props.getSingleFieldData(singleNodeId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
            this.setState({ checkedDataKeys: [],  loaderOfDeletePopUp: false, visibilityOfDeletePopUp: false } )
        }
    }

    // on save of edited name or new create
    onSaveEditOrCreateField = async (type) => {
        const { newFieldItemName, editRowId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType, filterKeyId, singleNodeId } = this.state
        this.setState({loaderOfDeletePopUp : true})
        if (type === "edit") { // if it in edit mode then we will call patch
            await this.props.patchCommonCreateData("node_items", singleNodeId, { [filterKeyId]: newFieldItemName }, editRowId) //waiting for the api to be patch
        } else { // if we are creating new then post will be called
            await this.props.postCommonCreateData("node_items", { [filterKeyId]: newFieldItemName }, singleNodeId) //waiting for the api to be posted
        }
        const { patchDataCreatedSuccessfully, patchSuccessMessage, newDataCreatedSuccessfully, errorMsg } = this.props.commonReducer // will be true if success is true from above post api and pop up will be closed
        if (type === "edit" ? patchDataCreatedSuccessfully : newDataCreatedSuccessfully) { // according to difference type we are deciding the success
            message.success(type === "edit" ? "Saved Successfully" : "Created Successfully "); // according to difference type we are deciding the success message
            this.props.commonActionForCommonReducer({ patchDataCreatedSuccessfully: false, newDataCreatedSuccessfully: false , fieldTableLoading : true})
            this.props.getSingleFieldData(singleNodeId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        } else {
            message.error(errorMsg);
        }
        this.setState({ creationPopUpVisibility: false, loaderOfDeletePopUp: false,  checkedDataKeys: [] })
    }

    render() {
        const { singleFieldData, singleFieldCount, singleFieldName, singleFieldFilterKeyId, fieldTableLoading, viewDeciderLoader } = this.props.commonReducer
        const { currentPageNumber, creationPopUpVisibility, newFieldItemName, checkedDataKeys, creationPopUpMode, editRowName, filterKeyId, visibilityOfDeletePopUp, loaderOfDeletePopUp } = this.state
        if (!filterKeyId && singleFieldFilterKeyId) { // on first time load saving the id
            this.setState({ filterKeyId: singleFieldFilterKeyId })
        }
        const fieldsColumnData = [

            {
                "title": "Name",
                "dataIndex": singleFieldFilterKeyId, // key of each field nodes items
                "_id": singleFieldFilterKeyId,
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
                {!viewDeciderLoader
                    ? singleFieldCount //checking if count of field item is empty or not
                        ?
                        <AllUserSelect userData={singleFieldData}

                            searchFirstButtonName={"IMPORT RESOURCES"}
                            searchSecondButtonName={"ADD NEW ITEM"}
                            allHeadingsData={fieldsColumnData}
                            searchPlaceHolder={`Search ${singleFieldName}`}
                            onSearch={this.fieldSearchData}
                            typeOfData="Total Items"

                            headingClickData={this.onClickHeadingColumn}
                            onChangeCheckBox={this.onChangeCheckBox}
                            searchSecondButtonClick={() => this.setState({ creationPopUpVisibility: true, creationPopUpMode: "add" })} // opening the pop up and also type of pop up to open
                            tableLoading={fieldTableLoading}

                            totalUsers={singleFieldCount}
                            currentPageNumber={currentPageNumber}
                            onChangeRowsPerPage={this.onChangeRowsPerPage}
                            goPrevPage={() => this.changePage(-1)}
                            goNextPage={() => this.changePage(1)}

                            //onClick Designation Header Action Buttons
                            onClickUserDelete={() => this.setState({ visibilityOfDeletePopUp: true })} //{() => this.onFieldItemActions("delete")}
                            onClickUserEdit={() => this.onFieldItemActions("edit")}

                            isUserData={false}

                            onClickTableRow={this.onRowClick}

                            // //buttons to show and hide 
                            showHeaderButtons={[{ id: "edit", label: "Edit Item" }, { id: "delete", label: "Delete Items" }]} // buttons to show when selected row
                            disableButtonNames={[checkedDataKeys.length > 1 ? "edit" : ""]}

                            // //to empty the selected Data
                            selectedDataCount={checkedDataKeys.length}
                        />
                        :
                        <AddUsersCommonCard
                            titleName={singleFieldName}
                            addUsersCardSubText={`You don't have any ${singleFieldName} here. Please add new ${singleFieldName}.`}
                            addUsersCommonCardButtonClick={() => this.setState({ creationPopUpVisibility: true, creationPopUpMode: "add" })}// opening the pop up and also type of pop up to open
                            buttonName={`Add New ${singleFieldName}`}
                        />

                    : <FullScreenLoader /> 
                }

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
                    creationPopSecondButtonLoader = {loaderOfDeletePopUp}
                />


                <Modal //used this modal for confirmation before deleting node items
                    title={`Delete ${singleFieldName}`}
                    visible={visibilityOfDeletePopUp}
                    onOk={() => this.onFieldItemActions("delete")}
                    confirmLoading={loaderOfDeletePopUp}
                    onCancel={() => this.setState({ visibilityOfDeletePopUp: false })}
                    centered
                    closable
                    okText={"Delete"}
                    maskClosable={false}
                    okType={"danger"}
                    wrapClassName={"field_open_view_popup"}
                    destroyOnClose={true}
                >
                    <p>{`Are you sure you want to delete selected ${checkedDataKeys.length} ${singleFieldName} `}</p>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        commonReducer: state.commonReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            postCommonCreateData,
            commonActionForCommonReducer,
            patchCommonCreateData,
            getSingleFieldData,
            postCommonDelete
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FieldOpenView))
