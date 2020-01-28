import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AllUserSelect from '../allUserSelect/allUserSelect'
import './designations.scss'
import { designationsData, postCommonCreateData, commonActionForCommonReducer, patchCommonCreateData } from '../../store/actions/actions'
import { withRouter } from "react-router-dom";
import CreationPopUp from '../../components/common/CreationPopUp/CreationPopUp'
import { message } from 'antd'
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
            editRowId: ""
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

    componentDidMount() {
        this.props.designationsData(this.state.rowsPerPage)
    }

    designationSearchData = (e) => {
        const { rowsPerPage, activeheading, sortingType } = this.state
        const searchData = e.target.value
        this.props.designationsData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    }


    onClickHeadingColumn = (activeheading, sortingType) => {
        const { rowsPerPage, searchData, currentPageNumber } = this.state
        const activeheadingModified = activeheading === "designations" ? "name" : "count"
        this.props.designationsData(rowsPerPage, currentPageNumber, searchData, activeheadingModified, sortingType)
        this.setState({
            activeheading: activeheadingModified,
            sortingType
        })
    }

    onChangeCheckBox = (selectedRowsKeys, selectedRows) => {
        let editRowName = ""
        let editRowId = ""

        if (selectedRows[0]) {
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

    onSaveEditedDesignation = async () => {
        const { newDesignationName, editRowId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType } = this.state
        await this.props.patchCommonCreateData("designations", editRowId, { name: newDesignationName }) //waiting for the api to be posted
        const { patchDataCreatedSuccessfully, patchSuccessMessage, errorMsg } = this.props.commonReducer // will be true if success is true from above post api and pop up will be closed
        if (patchDataCreatedSuccessfully) {
            this.setState({ creationPopUpVisibility: false, checkedDataKeys: [] })
            message.success(patchSuccessMessage || "Saved Successfully");
            this.props.commonActionForCommonReducer({ newDataCreatedSuccessfully: false })
            this.props.designationsData(rowsPerPage, currentPageNumber, searchData, activeheading, sortingType)
        } else {
            message.error(errorMsg);
        }

    }

    onChangeRowsPerPage = (rowsPerPage) => {
        this.props.designationsData(rowsPerPage, 1)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    changePage = (calcData) => {
        const { currentPageNumber, rowsPerPage } = this.state

        const goToPage = currentPageNumber + calcData
        this.props.designationsData(rowsPerPage, goToPage)
        this.setState({
            currentPageNumber: goToPage
        })
    }

    onRowClick = (rowData) => {
        this.props.history.push(`/people/designation/${rowData._id}`)
    }

    creationPopUpInput = (e) => {
        const { editRowName } = this.state
        const inputData = e.target.value
        this.setState({ newDesignationName: inputData, editRowName: inputData ? editRowName : "" })

    }

    onSaveNewDesignation = async () => {
        const { newDesignationName } = this.state
        await this.props.postCommonCreateData("designations", { name: newDesignationName }) //waiting for the api to be posted

        const { newDataCreatedSuccessfully, newCreatedDataId, errorMsg } = this.props.commonReducer // will be true if success is true from above post api and pop up will be closed
        if (newDataCreatedSuccessfully) {
            this.setState({ creationPopUpVisibility: false })
            message.success(newDataCreatedSuccessfully || "Designation Created Successfully");
            this.props.commonActionForCommonReducer({ newDataCreatedSuccessfully: false })
            this.props.history.push(`/people/designation/${newCreatedDataId}`)

        } else {
            message.error(errorMsg);
        }

    }

    onClickDesignationActions = (actionType) => {
        this.setState({ creationPopUpVisibility: true, creationPopUpMode: "edit" })
    }

    render() {
        const { designationData, totalDesignationsCount } = this.props.designationsReducer
        const { currentPageNumber, creationPopUpVisibility, newDesignationName, checkedDataKeys, creationPopUpMode, editRowName } = this.state

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
                    searchSecondButtonClick={() => this.setState({ creationPopUpVisibility: true, creationPopUpMode: "add" })}


                    totalUsers={totalDesignationsCount} currentPageNumber={currentPageNumber}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                    goPrevPage={() => this.changePage(-1)}
                    goNextPage={() => this.changePage(1)}

                    //onClick Designation Header Action Buttons
                    onClickUserDelete={() => this.onClickDesignationActions("delete")}
                    onClickUserEdit={() => this.onClickDesignationActions("edit")}

                    isUserData={false}

                    onClickTableRow={this.onRowClick}

                    //buttons to show and hide 
                    showHeaderButtons={[{ id: "edit", label: "Edit Designation" }, { id: "delete", label: "Delete Designation" }]}
                    disableButtonNames={[checkedDataKeys.length > 1 ? "edit" : ""]}

                    //to empty the selected Data
                    selectedDataCount={checkedDataKeys.length}
                />


                <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                    creationPopUpTitle={creationPopUpMode === "add" ? "Add New Designation" : "Edit Designation"}
                    creationPopFirstButtonName={"Cancel"}
                    creationPopSecondButtonName={creationPopUpMode === "add" ? "Create" : "Save"}
                    fieldHeader={"Designation Name"}
                    fieldPlaceHolder={"Enter Designation Name"}
                    inputValue={newDesignationName || editRowName}
                    creationPopFirstButtonHandler={() => this.setState({ creationPopUpVisibility: false })}
                    creationPopSecondButtonHandler={creationPopUpMode === "add" ? this.onSaveNewDesignation : this.onSaveEditedDesignation}
                    secondButtonDisable={newDesignationName.length < 3 || newDesignationName === editRowName ? true : false}
                    afterClose={() => this.setState({ newDesignationName: "" })}
                    creationPopUpFirstFieldChangeHandler={this.creationPopUpInput}

                />
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
            patchCommonCreateData
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Designations))
