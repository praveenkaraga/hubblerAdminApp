import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getSingleViewData,
    getSingleViewSuggestionData,
    postCommonAddSelectedUsersData,
    postCommonRemovePeople,
    commonActionForCommonReducer,createActiveLink
} from '../../../store/actions/PeopleActions/peopleActions'
import CommonCreationView from '../../common/CommonCreationView/CommonCreationView'
import { withRouter } from "react-router-dom";
import { getNodeId, getSubNodeId } from '../../../utils/helper'
import { message, Modal } from 'antd'
import FullScreenLoader from '../../common/FullScreenLoader/fullScreenLoader'
class CommonSingleOpenView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleNodeId: "",
            currentPageNumber: 1,
            rowsPerPage: 30,
            activeheading: "",
            sortingType: "",
            searchData: null,
            viewType: this.props.viewType, // getting viewtype{it can be designation, departments, circles, nodes}
            addUsersPopUpStatus: false,
            checkedDataKeys: [],
            subNodeId: "",

            apiCallFlag: true,

            addUsersCurrentPageNumber: 1,
            addUsersRowsPerPage: 30,
            addUsersActiveheading: "",
            addUsersSortingType: "",
            addUsersSearchData: "",
            addUsersCheckedDataKeys: [],

            suggestionSearchData: "",

            visibilityOfDeletePopUp: false,
            loaderOfDeletePopUp: false

        }

    }

    //update node id from url on change
    updateNodeId = (status) => {
        const { rowsPerPage, activeheading, sortingType, searchData, viewType, currentPageNumber } = this.state
        const nodeId = getNodeId(this.props.history) //a common fn to take out id from url
        const nodeId2 = viewType === "nodes" ? getSubNodeId(this.props.history) : "" // if viewtype node we will take subnode also{id of node item}
        if (status) this.setState({ singleNodeId: nodeId, subNodeId: nodeId2 }) // if status true we will update this.. status is just to make sure not to call setstate two times if already calling it outside
        this.props.commonActionForCommonReducer({viewDeciderLoader : true})
        this.props.getSingleViewData(viewType, nodeId, rowsPerPage)
    }

    static getDerivedStateFromProps(nextProps, prevState) { // have used this for updation of name.. when updating name in side..this will also render

        if (prevState.patchDataCreatedSuccessfully !== nextProps.commonReducer.patchDataCreatedSuccessfully) { //checking if the name is being changed
            return {
                patchDataCreatedSuccessfully: nextProps.commonReducer.patchDataCreatedSuccessfully
            };
        }

        //updating viewType when changing from similar view of different modules{like from designaton to departments}
        if (nextProps.viewType !== prevState.viewType) return { viewType: nextProps.viewType }
        return null;
    }

    componentDidMount() {
        this.updateNodeId(true)
    }

    // will rerender the component when we are clicking on different circle when we are already in a circle
    componentDidUpdate(prevProps, prevState) {
        if (this.props.viewType === "circles") {
            const currentNodeId = getNodeId(this.props.history) // getting new node id
            const { apiCallFlag } = this.state // this flag is only for not calling this api two times when we land on circles for the first time
            if (prevState.singleNodeId !== currentNodeId && !apiCallFlag) { //if node id in url is different from the previous one this will call the api and rerender the component
                this.setState({ singleNodeId: currentNodeId, apiCallFlag: true , searchData:null})
                this.updateNodeId(false)
            }
            if (apiCallFlag) this.setState({ apiCallFlag: false }) // flag is true then make it false...will work on first time only
            if (prevState.patchDataCreatedSuccessfully && this.props.commonReducer.patchDataCreatedSuccessfully !== prevState.patchDataCreatedSuccessfully) {// also renaming the circle in the side will re render the component
                this.updateNodeId()
            }
        }

    }



    // on serach in the drop down searh comp
    onChangeSearchDropdown = (searchData) => {
        const { singleNodeId, viewType, subNodeId } = this.state
        this.props.commonActionForCommonReducer({ searchLoader : true })
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, 30, 1, searchData, "", "", subNodeId)
        this.setState({ suggestionSearchData: searchData })
    }


    onChangeSearch = (searchData) => { //onChange of left side of search
        const { rowsPerPage, activeheading, sortingType, singleNodeId, viewType, subNodeId } = this.state
        this.props.commonActionForCommonReducer({ searchLoader : true })
        this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType, subNodeId)
        this.setState({ searchData, currentPageNumber: 1 })
    }

    //on click of heading of all the rows of the table
    //will make ascend and descend that column
    onClickHeading = (activeheading, sortingType) => {
        const { rowsPerPage, searchData, currentPageNumber, singleNodeId, viewType, subNodeId } = this.state
        this.props.commonActionForCommonReducer({  tableLoading: true })
        this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, currentPageNumber, searchData, activeheading, sortingType, subNodeId)
        this.setState({
            activeheading,
            sortingType
        })
    }

    //on change of rows per page of the table
    onChangeRowsPerPage = (rowsPerPage) => {
        const { searchData, singleNodeId, viewType, activeheading, sortingType, subNodeId } = this.state
        this.props.commonActionForCommonReducer({  tableLoading: true })
        this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType, subNodeId)
        this.setState({
            rowsPerPage,
            currentPageNumber: 1
        })
    }

    //on change of pages of the table
    onChangePage = (calcData) => {
        const { currentPageNumber, viewType, singleNodeId, rowsPerPage, searchData, activeheading, sortingType, subNodeId } = this.state
        const goToPage = currentPageNumber + calcData
        this.props.commonActionForCommonReducer({  tableLoading: true })
        this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, goToPage, searchData, activeheading, sortingType, subNodeId)
        this.setState({
            currentPageNumber: goToPage
        })
    }


    //on click of back button icon when we are insise a node item
    backButtonClick = () => {
        const { viewType, singleNodeId } = this.state
        this.props.history.push(`/people/${!(viewType === "nodes") ? viewType : ("field/" + singleNodeId)}`)
    }


    //on select and unselect of checkbox
    onChangeCheckBox = (value) => {
        this.setState({ checkedDataKeys: value })
    }


    onSearchDropdownSelect = async (value) => { // on select user from drop down search 
        await this.addUsersPopUpOnChangeCheckBox([value])
        //this.props.commonActionForCommonReducer({  tableLoading: true })
        this.onClickAddSelectedButton()//this fn will post that data of selected user
        this.onChangeSearchDropdown("")
    }

    //-------------below functions are for add Users Component{Pop up}

    //on click of add users button...on the view which comes when no users are there already
    //calling api for add users and making pop up visible
    onClickOfAddUsers = (status) => {
        const { viewType, singleNodeId, subNodeId } = this.state
        this.props.commonActionForCommonReducer({  suggestionTableLoading: true })
        if (status) {
            this.props.getSingleViewSuggestionData(viewType, singleNodeId, 30, 1, "", "", "", subNodeId)
        }
        this.setState({ addUsersPopUpStatus: status, addUsersCurrentPageNumber: 1 })

    }

    // on click of headings of each column of add users pop up
    addUsersOnClickHeadingColumn = (activeheading, sortingType) => {
        const { addUsersCurrentPageNumber, addUsersRowsPerPage, addUsersSearchData, viewType, singleNodeId, subNodeId } = this.state
        this.props.commonActionForCommonReducer({  suggestionTableLoading: true })
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, addUsersRowsPerPage, addUsersCurrentPageNumber, addUsersSearchData, activeheading, sortingType, subNodeId)
        this.setState({
            addUsersActiveheading: activeheading,
            addUsersSortingType: sortingType,
        })
    }

    // on change of rows per page of add users pop up
    addUsersOnChangeRowsPerPage = (rowsPerPage) => {
        const { addUsersSearchData, addUsersActiveheading, addUsersSortingType, viewType, singleNodeId, subNodeId } = this.state
        this.props.commonActionForCommonReducer({  suggestionTableLoading: true })
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, rowsPerPage, 1, addUsersSearchData, addUsersActiveheading, addUsersSortingType, subNodeId)
        this.setState({
            addUsersRowsPerPage: rowsPerPage,
            addUsersCurrentPageNumber: 1
        })
    }

    // on search inside the add users pop up
    onSearchInAddUsers = (value) => {
        const searchvalue = value
        const { addUsersRowsPerPage, addUsersActiveheading, addUsersSortingType, viewType, singleNodeId, subNodeId } = this.state
        this.props.commonActionForCommonReducer({ searchLoader : true })
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, addUsersRowsPerPage, 1, searchvalue, addUsersActiveheading, addUsersSortingType, subNodeId)

        this.setState({
            addUsersSearchData: searchvalue,
            addUsersCurrentPageNumber: 1
        })
    }


    //on select and unselect of checkbox in add users pop up
    addUsersPopUpOnChangeCheckBox = (data) => {
        this.setState({ addUsersCheckedDataKeys: data })
    }


    //on changing page inside add users pop up
    // calc data will be +1 or -1, for next  page and  back page
    addUsersChangePage = (calcData) => {
        const { addUsersCurrentPageNumber, addUsersRowsPerPage, addUsersActiveheading, addUsersSearchData, addUsersSortingType, viewType, singleNodeId, subNodeId } = this.state
        const goToPage = addUsersCurrentPageNumber + calcData
        this.props.commonActionForCommonReducer({ suggestionTableLoading: true })
        this.props.getSingleViewSuggestionData(viewType, singleNodeId, addUsersRowsPerPage, goToPage, addUsersSearchData, addUsersActiveheading, addUsersSortingType, subNodeId)
        this.setState({
            addUsersCurrentPageNumber: goToPage
        })
    }


    //on CLick of Add selected button inside add users pop up
    onClickAddSelectedButton = async () => {
        const { addUsersCheckedDataKeys, singleNodeId, viewType, rowsPerPage, searchData, activeheading, sortingType, subNodeId } = this.state
        const finalData = { users: addUsersCheckedDataKeys, _id: singleNodeId }
        if (viewType === "nodes") finalData["node_item_id"] = subNodeId // if viewtpe nodes thwn add one more key for data params
        this.props.commonActionForCommonReducer({  addSelectedButtonLoader: true })
        await this.props.postCommonAddSelectedUsersData(viewType, finalData)
        const { postSelectedUsersSuccessfully, postSelectedUsersSuccessMessage, errorMsg } = this.props.commonReducer
        if (postSelectedUsersSuccessfully) { // api susscessfully posted
            message.success(postSelectedUsersSuccessMessage)
            this.setState({ addUsersPopUpStatus: false, currentPageNumber: 1 })
            this.props.commonActionForCommonReducer({  tableLoading: true })
            this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType, subNodeId)
        } else {
            message.error(errorMsg)
        }

    }



    // on click of remove users from inside node items
    onDeleteUser = async (data) => {
        if (data === "delete") {
            const { checkedDataKeys, singleNodeId, viewType, rowsPerPage, searchData, activeheading, sortingType, subNodeId } = this.state
            const finalData = { users: checkedDataKeys, _id: singleNodeId }
            if (viewType === "nodes") finalData["node_item_id"] = subNodeId
            this.setState({ loaderOfDeletePopUp: true })
            await this.props.postCommonRemovePeople(viewType, finalData)
            const { postRemovePeopleSuccessfully, postRemovePeopleSuccessMessage, errorMsg } = this.props.commonReducer
            if (postRemovePeopleSuccessfully) {
                this.props.commonActionForCommonReducer({ postRemovePeopleSuccessfully: false, tableLoading: true })
                this.props.getSingleViewData(viewType, singleNodeId, rowsPerPage, 1, searchData, activeheading, sortingType, subNodeId)
                this.setState({ currentPageNumber: 1, checkedDataKeys: [] })
                message.success(postRemovePeopleSuccessMessage)               

            } else {
                message.error(errorMsg)
            }
            this.setState({ loaderOfDeletePopUp: false, visibilityOfDeletePopUp: false })
        }
    }



    render() {
        const { singleViewName, singleViewCount, singleViewData, singleViewSuggestionData, singleViewSuggestionDataCount, tableColumnData, viewDeciderLoader ,
            searchLoader ,tableLoading, suggestionTableLoading, addSelectedButtonLoader
        } = this.props.commonReducer
        const { searchData, currentPageNumber, addUsersPopUpStatus, checkedDataKeys, addUsersCheckedDataKeys, addUsersCurrentPageNumber, viewType, suggestionSearchData,
            visibilityOfDeletePopUp, loaderOfDeletePopUp } = this.state
        return (
            <>{ !viewDeciderLoader ?
                <>
                    <CommonCreationView commonCreationViewHeaderName={singleViewName}
                        viewDecider={(searchData !== null) || singleViewCount}
                        allSelectedUsersUsersData={singleViewData}
                        allSelectedUsersHeadingsData={tableColumnData}
                        backButton={!(viewType === "circles") ? true : false} // if viewtype is not circle then back button will be visible
                        allSelectedUsersAllSelect={true}
                        allSelectedUsersSearchData={this.onChangeSearch}
                        allSelectedUsersPlaceHolder={`Search ${singleViewName}`}
                        allSelectedUsersOnClickHeadingColumn={this.onClickHeading}
                        allSelectedUsersTotalUsers={singleViewCount}
                        allSelectedUsersCurrentPageNumber={currentPageNumber}
                        allSelectedUsersOnChangeCheckBox={this.onChangeCheckBox}
                        allSelectedUsersOnChangeRowsPerPage={this.onChangeRowsPerPage}
                        commonCreationViewBackButtonClick={this.backButtonClick}
                        allSelectedUsersShowHeaderButtons={[{ id: "delete", label: "Remove" }]} //BUttons to show when row selected
                        allSelectedUsersSelectedDataCount={checkedDataKeys.length}
                        allSelectedUsersOnClickAddUserButton={() => this.onClickOfAddUsers(true)}
                        allSelectedUsersChangePage={this.onChangePage}
                        allSelectedUsersOnClickUserActions={() => this.setState({ visibilityOfDeletePopUp: true })}
                        allSelectedUsersSearchLoader={searchLoader}
                        allSelectedUsersDebounceTimeUserSearch={300}
                        allSelectedUsersTableLoading={tableLoading}

                        //search with suggestion comp props
                        allSelectedUsersSearchDropdownPlaceholder={"Enter Name and Add"}
                        allSelectedUsersOnChangeSearchDropdown={this.onChangeSearchDropdown}
                        allSelectedUsersOnSearchDropdownSelect={this.onSearchDropdownSelect}
                        allSelectedUsersSearchDropdownData={suggestionSearchData ? singleViewSuggestionData : []}



                        //all below prop is for add Selected users popup
                        addUsersCommonCardButtonClick={() => this.onClickOfAddUsers(true)}
                        showAddUsersPopUp={addUsersPopUpStatus}
                        addUsersPopUpPlaceHolder={"Search Users"}
                        addUsersPopUpClose={() => this.onClickOfAddUsers(false)}
                        addUsersPopUpTableColumnsData={tableColumnData}
                        addUsersPopUpUsersData={singleViewSuggestionData}
                        addUsersPopUpTotalUsers={singleViewSuggestionDataCount}
                        addUsersOnClickHeadingColumn={this.addUsersOnClickHeadingColumn}
                        addUsersOnChangeRowsPerPage={this.addUsersOnChangeRowsPerPage}
                        addUsersSearchData={this.onSearchInAddUsers}
                        addUsersPopUpOnChangeCheckBox={this.addUsersPopUpOnChangeCheckBox}
                        addUsersSelectedDataCount={addUsersCheckedDataKeys.length}
                        addUsersChangePage={this.addUsersChangePage}
                        addUsersCurrentPageNumber={addUsersCurrentPageNumber}
                        addUsersPopUpFirstButtonClick={this.onClickAddSelectedButton} 
                        addUsersSearchLoader={searchLoader}
                        addUsersTableLoading={suggestionTableLoading}
                    />


                    <Modal //used this modal for confirmation before deleting node items
                        title={`Remove User(s)`}
                        visible={visibilityOfDeletePopUp}
                        onOk={() => this.onDeleteUser("delete")}
                        confirmLoading={loaderOfDeletePopUp}
                        onCancel={() => this.setState({ visibilityOfDeletePopUp: false })}
                        centered
                        closable
                        okText={"Delete"}
                        maskClosable={false}
                        okType={"danger"}
                        wrapClassName={"commonSingle_open_view_popup"}
                        destroyOnClose={true}
                    >
                        <p>{`Are you sure you want to remove the selected ${checkedDataKeys.length} users(s) from ${singleViewName}.`}</p>
                    </Modal>
                </>   
            
                : < FullScreenLoader/>
            }
            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        commonReducer: state.commonReducer,
        consoleReducer: state.consoleReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSingleViewData,
            getSingleViewSuggestionData,
            postCommonAddSelectedUsersData,
            postCommonRemovePeople,
            commonActionForCommonReducer,createActiveLink
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommonSingleOpenView))