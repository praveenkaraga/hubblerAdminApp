import React, {Component} from 'react';
import {connect} from "react-redux";
import './teamView.scss'
import {Button} from 'antd';
import 'antd/dist/antd.css';
import OrgChart from './teamViewComponents/OrgChart'
import {bindActionCreators} from "redux";
import {
    getTeamViewUsersData,
    getTeamViewOrgData,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    uploadImportUsersPopUPVisibility,
    patchImportUsersData,
    commonTeamReducerAction,
    searchDropDownData,
    getClickedTeamUserReporteeData,
    getAllUsers
} from "../../../store/actions/PeopleActions/peopleActions";
import UserInfoSlider from '../../../components/common/UserInfoSlider/UserInfoSlider'
import ImportUsersPopUp from '../../../components/common/ImportUsersPopUp/ImportUsersPopUp'
import SearchDropdown from '../../common/searchDropDown/searchDropDown'
import find from 'lodash/find'
import ConsoleAddUser from "../consoleAddUser/consoleAddUser";


class TeamView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addUserPopUpStatus: false,
            addUserMode: "add",
        }
    }

    componentDidMount() {
        this.props.getTeamViewUsersData();
        this.props.getAllUsers();

        this.downloadExcel()
    }

    showModal = () => {
        this.props.commonTeamReducerAction({isFileUploaded: false, importUsersPopUpVisiblity : true})
    };

    closeModal = () => {
        this.props.commonTeamReducerAction({importUsersPopUpVisiblity :false})
    };

    downloadExcel = () => {
        this.props.onClickOfDownloadExcel()
    };

    onClickOfUpload = () => {
        this.props.getImportUserUploadDetails()
    };

    patchImportUserData = (id, mappings, skipFirstRow, uploadType) => {
        let patchData = {
            mappings: mappings,
            skip_first_row: skipFirstRow,
            upload_type: uploadType,
        }
        this.props.commonTeamReducerAction({uploadFileStatus: 'true'});
        this.props.patchImportUsersData(id, patchData)
    }

    importUsersModalCloseHandler = () => {
        this.props.commonTeamReducerAction({importUsersPopUpVisiblity :false})
    }

    startUploadHandler = () => {
        this.props.commonTeamReducerAction({startUploadStatus: 'true'});
        this.props.getImportUserUploadDetails()
    }

    test = () => {
        console.log('test called')
    }

    importUsersUploadPopUpFirstButtonHandler = () => {
        console.log('whatever')
    };

    onChangeSearchDropdown = (searchData) => {
        this.props.searchDropDownData('', '', searchData, '', '')
        this.setState({suggestionSearchData: searchData})
    };

    onSearchDropdownSelect = async (value) => { // on select user from drop down search
        const {orgChartUsers, rootData, searchDropDownData} = this.props.teamViewReducer
        console.log({
            rootData: rootData,
            orgChartUsers: orgChartUsers,
            searchDropDownData
        });
        let dropDownRootData = find(searchDropDownData, item => item._id === value)
        this.props.commonTeamReducerAction({
            rootData: [dropDownRootData],
            clickedMemberData: dropDownRootData,
            preservedData: []
        });
        this.props.getClickedTeamUserReporteeData(value)
    };

    onEditClick = () => {
        this.props.commonTeamReducerAction({teamViewUserDrawerVisible: false});
        this.setState({addUserPopUpStatus: true, addUserMode: "edit"})
    }

    render() {
        const {orgChartUsers, teamViewUserDrawerVisible, clickedTeamUserData, teamViewClickedUserId, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count, loader, clickedMemberData, contentLoader, importUsersPopUpVisiblity, sampleExcelFile, uploadPopUpVisibility, uploadPopUpData, importUsersUploadResponseData, uploadFileStatus, isFileUploaded, startUploadStatus, clickedUserOrgData, searchDropDownData, reporteeLoader} = this.props.teamViewReducer
        const {addUserPopUpStatus, addUserMode} = this.state
        return (
            <div className={'team-view'}>
                {loader ? <div className={'loader'}></div> : <div>
                    <div className={'component-header-buttons-wrap'}>
                        <div className={'component-header'}>Team View</div>
                        <div className={'team-view-buttons-wrap'}>
                            <div className={'search-dropdown-wrap'}>
                                <SearchDropdown placeholder={'Search User'} searchIcon={true}
                                                searchData={searchDropDownData} onChange={this.onChangeSearchDropdown}
                                                onSelect={this.onSearchDropdownSelect}/>
                            </div>
                            <Button type="primary" className={'import-users'} onClick={this.showModal}>Import
                                Users</Button>
                            <Button type="primary"
                                    onClick={() => this.setState({addUserPopUpStatus: true, addUserMode: "add"})}>Add
                                User</Button></div>
                    </div>
                    {reporteeLoader ? <div className={'cover'}></div> : ''}
                    <OrgChart/>

                    <UserInfoSlider visible={teamViewUserDrawerVisible}
                                    sourceTeamView={true}
                                    onCloseFunction={(flag) => this.props.commonTeamReducerAction({teamViewUserDrawerVisible: flag})}
                                    teamUserData={clickedTeamUserData}
                                    userId={teamViewClickedUserId}
                                    url={`/reportees/organization/${teamViewClickedUserId}/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=`}
                                    onClickEdit={() => this.onEditClick()}

                        // getTeamViewOrgData={(id) => this.props.getTeamViewOrgData(id)}
                        // clickedUserOrgData={clickedUserOrgData}
                                    clickedMemberData={clickedMemberData}
                                    contentLoader={contentLoader}/>

                    <ImportUsersPopUp visible={importUsersPopUpVisiblity}
                        //boolean value to handle the visiblity of the importUsersPopup
                                      firstButtonName={'Select File'}
                        //name of the first button of the importUsersPopup
                                      secondButtonName={'Download Sample Excel'}
                        //name of the second button of the importUsersPopup
                                      secondButtonClickHandler={this.props.onClickOfDownloadExcel}
                        //function that gets invoked on click of the the second button(Downloads a sample excel) of importUsersPopup
                                      sampleExcelFile={sampleExcelFile}
                        //sample file that has been downloaded on click of secondButton
                                      thirdButtonName={'Cancel'}
                        //name of the third button of the importUsersPopup
                                      thirdButtonClickHandler={this.importUsersModalCloseHandler}
                        //function that gets invoked on click of the the third button of importUsersPopup
                                      fourthButtonName={'Start Upload'}
                        //name of the fourth button of the importUsersPopup
                                      fourthButtonClickHandler={this.startUploadHandler}
                        //function that gets invoked on click of the the fourth button
                                      fourthButtonLoaderStatus={startUploadStatus}
                        //boolean value to check the loader status
                                      fourthButtonOnLoadingText={'Uploading'}
                        //text that you wish to be displayed when uploading is in process
                        //end of 1st
                                      importUsersUploadPopUpVisibility={uploadPopUpVisibility}
                        //boolean value to handle the visiblity of the importUsersUploadPopUp
                                      uploadPopUpData={uploadPopUpData}
                        //data to be fed in form of an object
                                      importUsersPopUpCloseHandler={this.props.uploadImportUsersPopUPVisibility}
                        //function to close the importUsersUploadPopUp
                                      patchImportUsersData={this.patchImportUserData}
                        //function that gets invoked on click of the the third button(footer second button) of importUsersPopup
                                      importUsersUploadResponseData={importUsersUploadResponseData}
                        //data (object) obatined after the execution of patchImportUsersData function
                                      uploadFileLoadingStatus={uploadFileStatus}
                        //loader status of footerSecondButton(Process) button - boolean
                                      isFileUploaded={isFileUploaded}

                                      commonAction={()=>this.props.commonTeamReducerAction()}
                        //boolean value for if file is uploaded
                    />
                    { addUserPopUpStatus ?
                        <ConsoleAddUser
                            addUserCloseButton={() => this.setState({addUserPopUpStatus: false})}
                            addUserMode={addUserMode}
                            userId={teamViewClickedUserId}/>
                        : null
                    }
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teamViewReducer: state.teamViewReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTeamViewUsersData,
            getTeamViewOrgData,
            onClickOfDownloadExcel,
            getImportUserUploadDetails,
            uploadImportUsersPopUPVisibility,
            patchImportUsersData,
            commonTeamReducerAction,
            searchDropDownData,
            getClickedTeamUserReporteeData,
            getAllUsers
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamView);

