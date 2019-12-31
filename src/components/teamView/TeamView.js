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
        this.props.commonTeamReducerAction({importStatus: false})

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


    render() {
        const {orgChartUsers, teamViewUserDrawerVisible, clickedTeamUserData, teamViewClickedUserId, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count, loader, clickedMemberData, contentLoader, importUsersPopUpVisiblity, sampleExcelFile, uploadPopUpVisibility, uploadPopUpData, importUsersUploadResponseData, uploadFileStatus, importStatus, startUploadStatus, clickedUserOrgData} = this.props.teamViewReducer
        console.log(importUsersUploadResponseData)
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

                    <UserInfoSlider visible={teamViewUserDrawerVisible} sourceTeamView={true}
                                    onCloseFunction={(flag) => this.props.teamViewUserClick(flag)}
                                    teamUserData={clickedTeamUserData} userId={teamViewClickedUserId}
                                    url={`/reportees/organization/${teamViewClickedUserId}/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=`}
                                    // getTeamViewOrgData={(id) => this.props.getTeamViewOrgData(id)}
                                    // clickedUserOrgData={clickedUserOrgData}
                                    clickedMemberData={clickedMemberData}
                                    contentLoader={contentLoader}
                                   /* changeLoaderStatus={(flag) => this.props.changeLoaderStatus(flag)}*//>

                    <ImportUsersPopUp visible={importUsersPopUpVisiblity}
                                      modalClose={() => this.props.importUsersPopUPVisibility(false)}
                                      onClickDownload={() => this.props.onClickOfDownloadExcel()}
                                      sampleExcelFile={sampleExcelFile}
                                      onClickStartUpload={() => this.props.getImportUserUploadDetails()}
                                      uploadPopUpVisibility={uploadPopUpVisibility} uploadPopUpData={uploadPopUpData}
                                      uploadImportUsersPopUPVisibility={() => this.props.uploadImportUsersPopUPVisibility()}
                                      patchImportUsersData={(id, data) => this.props.patchImportUsersData(id, data)}
                                      importUsersUploadResponseData={importUsersUploadResponseData}
                                      uploadFileStatus={uploadFileStatus}
                                      commonTeamReducerAction={this.props.commonTeamReducerAction}
                                      importStatus={importStatus} startUploadStatus={startUploadStatus}/>
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

