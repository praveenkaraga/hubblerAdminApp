import React, {Component} from 'react';
import {connect} from "react-redux";
import './teamView.scss'
import {Button} from 'antd';
import 'antd/dist/antd.css';
import SearchTransition from '../common/Search/SearchTransition'
import OrgChart from './teamViewComponents/OrgChart'
import {bindActionCreators} from "redux";
import {getTeamViewUsersData, teamViewUserClick, getTeamViewOrgData,changeLoaderStatus} from "../../store/actions/actions";
import {teamViewReducer} from "../../store/reducers/teamViewReducer";
import UserInfoSlider from '../../components/common/UserInfoSlider/UserInfoSlider'


class TeamView extends Component {
    componentDidMount() {
        this.props.getTeamViewUsersData()
    }

    render() {
        const {orgChartUsers, teamViewUserDrawerVisible, clickedTeamUserData, teamViewClickedUserId, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count, loader, clickedMemberData, contentLoader} = this.props.teamViewReducer
        console.log(clickedTeamUserData)
        return (
            <div className={'team-view'}>
                {loader ? <div className={'loader'}></div> : <div>
                    <div className={'component-header'}>Team View</div>
                    <div className={'team-view-buttons-wrap'}>
                        <SearchTransition/>
                        <Button type="primary" className={'import-excel'}>Import Excel</Button>
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
                                    contentLoader={contentLoader} changeLoaderStatus={(flag) => this.props.changeLoaderStatus(flag)}
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
            changeLoaderStatus
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamView);

