import React, {Component} from 'react';
import {connect} from "react-redux";
import './teamView.scss'
import {Button} from 'antd';
import 'antd/dist/antd.css';
import SearchTransition from '../common/Search/SearchTransition'
import OrgChart from './teamViewComponents/OrgChart'
import {bindActionCreators} from "redux";
import {
    getTeamViewUsersData,
    teamViewUserClick,
    getTeamViewOrgData,
    changeLoaderStatus,
    importUsersPopUPVisibility,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    uploadImportUsersPopUPVisibility, patchImportUsersData, commonTeamReducerAction
} from "../../store/actions/actions";
import {teamViewReducer} from "../../store/reducers/teamViewReducer";
import UserInfoSlider from '../../components/common/UserInfoSlider/UserInfoSlider'
import ImportUsersPopUp from '../../components/common/ImportUsersPopUp/ImportUsersPopUp'


class TeamView extends Component {

    componentDidMount() {
        this.props.getTeamViewUsersData();
        this.downloadExcel()
    }

    showModal = () => {
        this.props.importUsersPopUPVisibility(true);
        this.props.commonTeamReducerAction({isFileUploaded: false})
    };

    closeModal = () => {
        this.props.importUsersPopUPVisibility(false)
    };

    downloadExcel = () => {
        this.props.onClickOfDownloadExcel()
    };

    onClickOfUpload = () => {
        this.props.getImportUserUploadDetails()
    };

    patchImportUserData = (id, mappings,skipFirstRow,uploadType) => {
        let patchData = {
            mappings: mappings,
            skip_first_row: skipFirstRow,
            upload_type: uploadType,
        }
        this.props.commonTeamReducerAction({uploadFileStatus: 'true'});
        this.props.patchImportUsersData(id, patchData)
    }

    importUsersModalCloseHandler = () => {
        this.props.importUsersPopUPVisibility(false)
    }

    startUploadHandler = () =>{
        this.props.commonTeamReducerAction({startUploadStatus: 'true'});
        this.props.getImportUserUploadDetails()
    }

    test = () =>{
        console.log('test called')
    }

    importUsersUploadPopUpFirstButtonHandler = () =>{
       console.log('whatever')
    };

    render() {
        const {orgChartUsers, teamViewUserDrawerVisible, clickedTeamUserData, teamViewClickedUserId, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count, loader, clickedMemberData, contentLoader, importUsersPopUpVisiblity, sampleExcelFile, uploadPopUpVisibility, uploadPopUpData, importUsersUploadResponseData, uploadFileStatus, isFileUploaded, startUploadStatus, clickedUserOrgData} = this.props.teamViewReducer
        return (
            <div className={'team-view'}>
                {loader ? <div className={'loader'}></div> : <div>
                    <div className={'component-header'}>Team View</div>
                    <div className={'team-view-buttons-wrap'}>
                        <SearchTransition/>
                        <Button type="primary" className={'import-users'} onClick={this.showModal}>Import Users</Button>
                        <Button type="primary">Create New User</Button>
                    </div>
                    <OrgChart/>

                    <UserInfoSlider visible={teamViewUserDrawerVisible}
                                    sourceTeamView={true}
                                    onCloseFunction={(flag) => this.props.teamViewUserClick(flag)}
                                    teamUserData={clickedTeamUserData}
                                    userId={teamViewClickedUserId}
                                    url={`/reportees/organization/${teamViewClickedUserId}/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=`}

                                     // getTeamViewOrgData={(id) => this.props.getTeamViewOrgData(id)}
                                     // clickedUserOrgData={clickedUserOrgData}
                                    clickedMemberData={clickedMemberData}
                                    contentLoader={contentLoader}

                        /* changeLoaderStatus={(flag) => this.props.changeLoaderStatus(flag)}*//>

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
                                      //boolean value for if file is uploaded
                    />
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
            teamViewUserClick,
            getTeamViewOrgData,
            changeLoaderStatus,
            importUsersPopUPVisibility,
            onClickOfDownloadExcel,
            getImportUserUploadDetails,
            uploadImportUsersPopUPVisibility, patchImportUsersData, commonTeamReducerAction
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamView);

