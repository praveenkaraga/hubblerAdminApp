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
    uploadImportUsersPopUPVisibility, patchImportUsersData,commonTeamReducerAction
} from "../../store/actions/actions";
import {teamViewReducer} from "../../store/reducers/teamViewReducer";
import UserInfoSlider from '../../components/common/UserInfoSlider/UserInfoSlider'
import ImportUsersPopUp from '../../components/common/ImportUsersPopUp/ImportUsersPopUp'


class TeamView extends Component {

    componentDidMount() {
        this.props.getTeamViewUsersData()
        this.downloadExcel()
    }

    showModal = () => {
        this.props.importUsersPopUPVisibility(true)
    };

    closeModal = () => {
        this.props.importUsersPopUPVisibility(false)
    }

    downloadExcel = () => {
        this.props.onClickOfDownloadExcel()
    }
    onClickOfUpload = () => {
        this.props.getImportUserUploadDetails()
    }


    render() {
        const {orgChartUsers, teamViewUserDrawerVisible, clickedTeamUserData, teamViewClickedUserId, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count, loader, clickedMemberData, contentLoader, importUsersPopUpVisiblity, sampleExcelFile, uploadPopUpVisibility, uploadPopUpData, importUsersUploadResponseData,uploadFileStatus,importStatus} = this.props.teamViewReducer
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

                    <UserInfoSlider visible={teamViewUserDrawerVisible}
                                    onCloseFunction={(flag) => this.props.teamViewUserClick(flag)}
                                    teamUserData={clickedTeamUserData} userId={teamViewClickedUserId}
                                    getTeamViewOrgData={(id) => this.props.getTeamViewOrgData(id)}
                                    clickedUserOrgManagerData={clickedUserOrgManagerData}
                                    clickedUserOrgReporteesData={clickedUserOrgReporteesData}
                                    total_Count={total_Count} clickedMemberData={clickedMemberData}
                                    contentLoader={contentLoader}
                                    changeLoaderStatus={(flag) => this.props.changeLoaderStatus(flag)}/>
                    <ImportUsersPopUp visible={importUsersPopUpVisiblity} modalClose={() => this.closeModal()}
                                      onClickDownload={() => this.downloadExcel()} sampleExcelFile={sampleExcelFile}
                                      onClickStartUpload={() => this.onClickOfUpload()}
                                      uploadPopUpVisibility={uploadPopUpVisibility} uploadPopUpData={uploadPopUpData}
                                      uploadImportUsersPopUPVisibility={() => this.props.uploadImportUsersPopUPVisibility()}
                                      patchImportUsersData={(id, data) => this.props.patchImportUsersData(id, data)}
                                      importUsersUploadResponseData={importUsersUploadResponseData} uploadFileStatus={uploadFileStatus} commonTeamReducerAction={this.props.commonTeamReducerAction} importStatus={importStatus}/>
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
            uploadImportUsersPopUPVisibility, patchImportUsersData,commonTeamReducerAction
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamView);

