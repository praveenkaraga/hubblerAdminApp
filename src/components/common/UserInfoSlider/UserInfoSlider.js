import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Drawer} from "antd";
import 'antd/dist/antd.css';
import './userInfoSlider.scss'
import UserInfoSliderContent from '../UserInfoSlider/UserInfoSliderContent'
import {getTeamViewOrgData, changeLoaderStatus, getClickedTeamUserData} from "../../../store/actions/actions";


class UserInfoSlider extends Component {
    componentDidMount() {
        /*const {sourceTeamView, teamUserData} = this.props
        let usersId = teamUserData ? teamUserData._id : '';
        if (!sourceTeamView) {
            this.props.getClickedTeamUserData(usersId)
        }*/
    }

    render() {
        const {visible, onCloseFunction, teamUserData, userId, getTeamViewOrgData, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count, clickedMemberData, contentLoader, changeLoaderStatus, sourceTeamView, url} = this.props;
        const {clickedUserOrgData, clickedTeamUserData} = this.props.teamViewReducer
        console.log(clickedTeamUserData)

        let usersId = teamUserData ? teamUserData._id : '';
        return (
            <div className={'user-info-slider'}>
                <Drawer
                    className={'user-info-slider-drawer'}
                    placement={'right'}
                    closable={false}
                    onClose={() => onCloseFunction(false)}
                    visible={visible}>
                    <UserInfoSliderContent teamUserData={teamUserData} userId={usersId}
                                           onCloseFunction={onCloseFunction}
                                           clickedUserOrgData={clickedUserOrgData}
                                           sourceTeamView={sourceTeamView}
                                           clickedTeamUserData={clickedTeamUserData}
                                           url={url}
                                           getTeamViewOrgData={(url) => this.props.getTeamViewOrgData(url)}
                                           changeLoaderStatus={(flag) => this.props.changeLoaderStatus(flag)}
                                           clickedUserOrgManagerData={clickedUserOrgManagerData}
                                           clickedUserOrgReporteesData={clickedUserOrgReporteesData}
                                           total_Count={total_Count} clickedMemberData={clickedMemberData}
                                           contentLoader={contentLoader}/>
                </Drawer>
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
        {getTeamViewOrgData, changeLoaderStatus, getClickedTeamUserData},
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoSlider);
