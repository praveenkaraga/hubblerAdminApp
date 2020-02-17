import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AllUserSelect from '../../common/allUserSelect/allUserSelect'
import './designations.scss'
import {
    designationsData,
    postCommonCreateData,
    commonActionForCommonReducer,
    patchCommonCreateData,
    postCommonDelete
} from '../../../store/actions/PeopleActions/peopleActions'
import { withRouter } from "react-router-dom";
import CreationPopUp from '../../../components/common/CreationPopUp/CreationPopUp'
import { message, Modal } from 'antd'
class Designations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeheading: "",
            sortingType: "",
            searchData: "",
            creationPopUpVisibility: false,
            newDesignationName: "",
            checkedDataKeys: [],
            creationPopUpMode: "add",
            editRowName: "",
            editRowId: "",
            visibilityOfDeletePopUp: false,
            loaderOfDeletePopUp: false

        }

        this.designationsColumnData = [

            {
                "title": "Designations",
                "dataIndex": "designations",
                "_id": "designations",
                "lbl": "Designations",
                "type": "text",
                "isDraggable": true,
                "sorter": true,
                "sortDirections": ["descend", "ascend"],
                "ellipsis": true
            },
            {
                "title": "#People",
                "dataIndex": "people",
                "_id": "people",
                "lbl": "#People",
                "type": "number",
                "isDraggable": true,
                "sorter": true,
                "sortDirections": ["descend", "ascend"],
                "ellipsis": true
            }
        ]
    }

    //calling  designaiton data api
    componentDidMount() {
        this.props.designationsData(this.state.rowsPerPage)
    }

    //on search in the designaiton table
    designationSearchData = (e) => {
        const { rowsPerPage, activeheading, sortingType } = this.state
        const searchData = e.target.value
        this.props.designationsData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    }


    //on click of heading of all the rows of the table
    //will make ascend and descend that column
    onClickHeadingColumn = (activeheading, sortingType) => {
        const { rowsPerPage, searchData, currentPageNumber } = this.state
        const activeheadingModified = activeheading === "designations" ? "name" : "count"
        this.props.designationsData(rowsPerPage, currentPageNumber, searchData, activeheadingModified, sortingType)
        this.setState({
            activeheading: activeheadingModified,
            sortingType
        })
    }

    //on select and unselect of checkbox
    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        let editRowName = ""
        let editRowId = ""

        if (selectedRows[0]) { // saving data of latest selected one
            editRowName = selectedRows[0].designations
            editRowId = selectedRows[0]._id
        }
        this.setState({
            checkedDataKeys: selectedRowsKeys,
            editRowName,
            editRowId,
            newDesignationName: editRowName
        })
    }


    //on change of rows per page of the table
    onChangeRowsPerPage = (rowsPerPage) => {
        const { searchData, activeheading, sortingType } = this.state
        this.props.designationsData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    //on change of pages of the table
    changePage = (calcData) => {
        const { currentPageNumber, rowsPerPage, searchData, activeheading, sortingType } = this.state

        const goToPage = currentPageNumber + calcData
        this.props.designationsData(rowsPerPage, goToPage, searchData, activeheading, sortingType)
        this.setState({
            currentPageNumber: goToPage
        })
    }

    //on click of single row of designation table
    onRowClick = (rowData) => {
        this.props.history.push(`/people/designation/${rowData._id}`)
    }

    // on change of input field inside creation of designation popup
    creationPopUpInput = (e) => {
        const { editRowName } = this.state
        const inputData = e.target.value
        this.setState({ newDesignationName: inputData, editRowName: inputData ? editRowName : "" })

    }


    //on CLick of save button after adding or editing desgnation in pop up
    // type will be "edit" or "add"
    onSaveDesignation = async (type) => {
        const { newDesignationName, editRowId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType } = this.state
        if (type === "edit") {
            await this.props.patchCommonCreateData("designations", editRowId, { name: newDesignationName }) //waiting for the api to be patched
        } else {
            await this.props.postCommonCreateData("designations", { name: newDesignationName }) //waiting for the api to be posted
        }
        const { patchDataCreatedSuccessfully, patchSuccessMessage, newDataCreatedSuccessfully, errorMsg } = this.props.commonReducer // will be true if success is true from above post api and pop up will be closed
        if (type === "edit" ? patchDataCreatedSuccessfully : newDataCreatedSuccessfully) {
            this.setState({ creationPopUpVisibility: false, checkedDataKeys: [] })
            message.success(type === "edit" ? "Designation Saved Successfully" : "Designation Created Successfully ");// show success message
            this.props.commonActionForCommonReducer({ patchDataCreatedSuccessfully: false, newDataCreatedSuccessfully: false })
            this.props.designationsData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        } else {
            message.error(errorMsg);
        }

    }



    // onclick of delete and edit of designaiton
    onClickDesignationActions = async (actionType) => {
        const { checkedDataKeys, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType } = this.state
        if (actionType === "edit") { // on click of edit..enabling the edit designation popup
            this.setState({ creationPopUpVisibility: true, creationPopUpMode: "edit" })
        } else { // onclick of delete designation
            this.setState({ loaderOfDeletePopUp: true })
            await this.props.postCommonDelete("designations", { designations: checkedDataKeys }) //waiting for the delete api 
            const { postDeletedDataSuccessfulMessage, postDeletedDataSuccessfully, errorMsg } = this.props.commonReducer
            if (postDeletedDataSuccessfully) { // if delete api gives success true
                message.success(postDeletedDataSuccessfulMessage)
                this.props.designationsData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
                this.props.commonActionForCommonReducer({ postDeletedDataSuccessfully: false })
            } else {
                message.error(errorMsg)
                this.props.designationsData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
            }
            this.setState({ checkedDataKeys: [], loaderOfDeletePopUp: false, visibilityOfDeletePopUp: false })
        }
    }



    render() {
        const { designationData, totalDesignationsCount } = this.props.designationsReducer
        const { currentPageNumber, creationPopUpVisibility, newDesignationName, checkedDataKeys, creationPopUpMode, editRowName, visibilityOfDeletePopUp, loaderOfDeletePopUp } = this.state

        return (
            <div className="designations_main">
                <div className="designations_heading"><h3>Designations</h3></div>

                <AllUserSelect userData={designationData}

                    searchFirstButtonName={"IMPORT RESOURCES"} searchSecondButtonName={"ADD DESIGNATION"}
                    allHeadingsData={this.designationsColumnData}
                    searchPlaceHolder={"Search Designation"} onSearch={this.designationSearchData}
                    typeOfData="Designations"

                    headingClickData={this.onClickHeadingColumn}
                    onChangeCheckBox={this.onChangeCheckBox}
                    searchSecondButtonClick={() => this.setState({ creationPopUpVisibility: true, creationPopUpMode: "add" })} // onclick of add desgnation..enabling pop up for adding


                    totalUsers={totalDesignationsCount} currentPageNumber={currentPageNumber}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                    goPrevPage={() => this.changePage(-1)}
                    goNextPage={() => this.changePage(1)}

                    //onClick Designation Header Action Buttons
                    onClickUserDelete={() => this.setState({ visibilityOfDeletePopUp: true })}
                    onClickUserEdit={() => this.onClickDesignationActions("edit")}

                    isUserData={false}

                    onClickTableRow={this.onRowClick}

                    //buttons to show and hide 
                    showHeaderButtons={[{ id: "edit", label: "Edit Designation" }, { id: "delete", label: "Delete Designation" }]} // buttons to show when designation selected
                    disableButtonNames={[checkedDataKeys.length > 1 ? "edit" : ""]} // when more than one degnation selected..disabling the edit button

                    //to empty the selected Data
                    selectedDataCount={checkedDataKeys.length}
                />


                <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                    creationPopUpTitle={creationPopUpMode === "add" ? "Add New Designation" : "Edit Designation"} //changing heading text in pop up according to pop up type...type is edit or add
                    creationPopFirstButtonName={"Cancel"}
                    creationPopSecondButtonName={creationPopUpMode === "add" ? "Create" : "Save"}//changing button text in pop up according to pop up type...type is edit or add
                    fieldHeader={"Designation Name"}
                    fieldPlaceHolder={"Enter Designation Name"}
                    inputValue={newDesignationName || editRowName} //giving name to input when edit designation clicked
                    creationPopFirstButtonHandler={() => this.setState({ creationPopUpVisibility: false })} //on cancel hiding the pop up
                    creationPopSecondButtonHandler={() => this.onSaveDesignation(creationPopUpMode)} //saving the data

                    // save button will be disabled if edit name is same as previous name
                    // or no name in input
                    // or less than three letters
                    secondButtonDisable={newDesignationName.length < 3 || newDesignationName === editRowName ? true : false}
                    afterClose={() => this.setState({ newDesignationName: "", editRowName: "" })} // after closing the pop up resetting it
                    creationPopUpFirstFieldChangeHandler={this.creationPopUpInput}

                />

                <Modal //used this modal for confirmation before deleting node items
                    title={`Delete Designation(s)`}
                    visible={visibilityOfDeletePopUp}
                    onOk={() => this.onClickDesignationActions("delete")}
                    confirmLoading={loaderOfDeletePopUp}
                    onCancel={() => this.setState({ visibilityOfDeletePopUp: false })}
                    centered
                    closable
                    okText={"Delete"}
                    maskClosable={false}
                    okType={"danger"}
                    wrapClassName={"designation_delete_popup"}
                    destroyOnClose={true}
                >
                    <p>{`Are you sure you want to delete the selected ${checkedDataKeys.length} Designation(s)`}</p>
                </Modal>


            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        designationsReducer: state.designationsReducer,
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
            postCommonDelete
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Designations))
