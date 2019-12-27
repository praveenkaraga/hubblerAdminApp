import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AllUserSelect from '../allUserSelect/allUserSelect'
import './designations.scss'
import { designationsData } from '../../store/actions/actions'


class Designations extends Component {

    constructor(props) {
        super(props)

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
        this.props.designationsData()
    }

    designationSearchData = (e) => {
        console.log(e.target.value)
    }


    onClickHeadingColumn = (activeheading, sortingType) => {
        console.log(activeheading, sortingType)
    }

    onChangeCheckBox = (value) => {
        console.log(value)
    }

    onChangeRowsPerPage = (rowsPerPage) => {
        console.log(rowsPerPage)
    }

    changePage = (calcData) => {
        const { currentPageNumber } = this.props.designationsReducer
        const goToPage = currentPageNumber + calcData
        console.log(goToPage)
    }



    render() {
        const { designationData, totalDesignationsCount } = this.props.designationsReducer

        return (
            <div className="designations_main">
                <div className="designations_heading"><h3>Designations</h3></div>

                <AllUserSelect userData={designationData}

                    searchFirstButtonName={"IMPORT USERS"} searchSecondButtonName={"ADD USER"}
                    allHeadingsData={this.designationsColumnData}
                    searchPlaceHolder={"Search Designation"} onSearch={this.designationSearchData}
                    typeOfData="Designations"

                    headingClickData={this.onClickHeadingColumn}
                    onChangeCheckBox={this.onChangeCheckBox}


                    totalUsers={totalDesignationsCount} currentPageNumber={1}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                    goPrevPage={() => this.changePage(-1)}
                    goNextPage={() => this.changePage(1)}

                    isUserData={false} />
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

