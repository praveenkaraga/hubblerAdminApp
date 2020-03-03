import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Drawer } from "antd";
import 'antd/dist/antd.css';
import './userInfoSlider.scss'
import UserInfoSliderContent from '../UserInfoSlider/UserInfoSliderContent'
import { getTeamViewOrgData, commonTeamReducerAction, getClickedTeamUserData } from "../../../store/actions/PeopleActions/peopleActions";


class UserInfoSlider extends Component {
    componentDidMount() {
        /*const {sourceTeamView, teamUserData} = this.props
        let usersId = teamUserData ? teamUserData._id : '';
        if (!sourceTeamView) {
            this.props.getClickedTeamUserData(usersId)
        }*/
    }

    render() {
        const { visible = false, onCloseFunction, teamUserData, userId, getTeamViewOrgData, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count, clickedMemberData, contentLoader, changeLoaderStatus, onClickEdit, sourceTeamView, url } = this.props;
        const { clickedUserOrgData, clickedTeamUserData } = this.props.teamViewReducer
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
                        onClickEdit={onClickEdit}
                        getTeamViewOrgData={(url) => this.props.getTeamViewOrgData(url)}
                        changeLoaderStatus={(flag) => this.props.commonTeamReducerAction({contentLoader : flag })}
                        clickedUserOrgManagerData={clickedUserOrgManagerData}
                        clickedUserOrgReporteesData={clickedUserOrgReporteesData}
                        total_Count={total_Count} clickedMemberData={clickedMemberData}
                        contentLoader={contentLoader} />
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
        { getTeamViewOrgData, commonTeamReducerAction, getClickedTeamUserData },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoSlider);
