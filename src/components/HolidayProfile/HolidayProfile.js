import React, {Component} from "react";
import './holidayProfile.scss'
import AllUserSelect from '../allUserSelect/allUserSelect'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    commonHolidayAction,
    getHolidayTableColumnData,
    getHolidayProfileData,


    postCreateDeptData,
    postAddSelectedUsers,
    getAddSelectedUsersPostedData,
    getAddableUsersData,
    getTableColumnsData,
    getCommonViewHeaderName,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    patchImportUsersData, editUserDataForm
} from "../../store/actions/actions";
import {withRouter} from "react-router-dom";


class HolidayProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeHeading: "",
            sortingType: "",
            searchData: "",
        }
    }

    componentDidMount() {
        this.props.getHolidayTableColumnData();
        this.props.getHolidayProfileData(30)
    }

    onChangeCheckBox = (value) => {
        console.log(value)
    };

    onClickHeadingColumn = (activeHeading, sortingType) => {
        const {rowsPerPage, searchData, currentPageNumber} = this.state
        const activeHeadingModified = activeHeading === "departments" ? "name" : "count"
        this.props.getHolidayProfileData(rowsPerPage, currentPageNumber, searchData, activeHeadingModified, sortingType)
        this.setState({
            activeHeading: activeHeadingModified,
            sortingType
        })
    }

    onChangeRowsPerPage = (rowsPerPage) => {
        this.props.getHolidayProfileData(rowsPerPage, 1)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    changePage = (calcData) => {
        const {currentPageNumber, rowsPerPage} = this.state
        const goToPage = currentPageNumber + calcData
        this.props.getHolidayProfileData(rowsPerPage, goToPage)
        this.setState({
            currentPageNumber: goToPage
        })
    }

    departmentSearchData = (e) => {
        const {rowsPerPage, activeheading, sortingType} = this.state
        const searchData = e.target.value
        this.props.getHolidayProfileData(rowsPerPage, 1, searchData, activeheading, sortingType)
        this.props.commonHolidayAction({currentPageNumber: 1, searchData, searchLoader: true})
        this.setState({
            searchData,
            currentPageNumber: 1
        })
    }

    render() {
        const {holidayColumnData, holidayProfilesData, totalUsers, searchLoader} = this.props.holidayReducer
        console.log(holidayProfilesData)
        return (
            <div className="holiday-profile-main">
                <div className="holiday-profile-heading"><h3>Holiday Profiles</h3></div>
                <AllUserSelect allHeadingsData={holidayColumnData} userData={holidayProfilesData || []}
                               isUserData={false} totalUsers={totalUsers}

                               onChangeCheckBox={this.onChangeCheckBox}
                               onChangeRowsPerPage={this.onChangeRowsPerPage}
                               headingClickData={this.onClickHeadingColumn}
                               goPrevPage={() => this.changePage(-1)}
                               goNextPage={() => this.changePage(1)}
                               onSearch={this.departmentSearchData}
                               currentPageNumber={this.state.currentPageNumber}
                               onClickTableRow={this.onRowThisClick}
                               searchLoader={searchLoader}

                />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        holidayReducer: state.holidayReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            commonHolidayAction,
            getHolidayTableColumnData,
            getHolidayProfileData,


            postCreateDeptData,
            postAddSelectedUsers,
            getAddSelectedUsersPostedData,
            getAddableUsersData,
            getTableColumnsData,
            getCommonViewHeaderName,
            onClickOfDownloadExcel,
            getImportUserUploadDetails,
            patchImportUsersData, editUserDataForm
        },
        dispatch
    );
};


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(HolidayProfile))


