import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AllUserSelect from '../allUserSelect/allUserSelect'
import './designations.scss'
import { designationsData } from '../../store/actions/actions'


class Designations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeheading: "",
            sortingType: "",
            searchData: ""
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

    onChangeCheckBox = (value) => {
        const selectedUsers = value
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
        console.log(rowData)
    }

    render() {
        const { designationData, totalDesignationsCount } = this.props.designationsReducer
        const { currentPageNumber } = this.state

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


                    totalUsers={totalDesignationsCount} currentPageNumber={currentPageNumber}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                    goPrevPage={() => this.changePage(-1)}
                    goNextPage={() => this.changePage(1)}

                    // onlySelectAndAdd={false}
                    isUserData={false}

                    onClickTableRow={this.onRowClick} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        designationsReducer: state.designationsReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            designationsData
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Designations)

