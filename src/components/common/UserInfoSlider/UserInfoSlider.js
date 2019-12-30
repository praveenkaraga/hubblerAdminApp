import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Drawer} from "antd";
import 'antd/dist/antd.css';
import './userInfoSlider.scss'
import UserInfoSliderContent from '../UserInfoSlider/UserInfoSliderContent'


class UserInfoSlider extends Component {
    componentDidMount() {
    }

    render() {
        const {visible, onCloseFunction, teamUserData, userId, getTeamViewOrgData, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count,clickedMemberData,contentLoader,changeLoaderStatus,sourceTeamView,clickedUserOrgData} = this.props;
        let usersId = teamUserData ? teamUserData._id : '';
        return (
            <div className={'user-info-slider'}>
                <Drawer
                    className={'user-info-slider-drawer'}
                    placement={'right'}
                    closable={false}
                    onClose={() => onCloseFunction(false)}
                    visible={visible}>
                    <UserInfoSliderContent teamUserData={teamUserData} userId={usersId} onCloseFunction={onCloseFunction}
                                           clickedUserOrgData={clickedUserOrgData}
                                           sourceTeamView={sourceTeamView}
                                           getTeamViewOrgData={getTeamViewOrgData}
                                           clickedUserOrgManagerData={clickedUserOrgManagerData}
                                           clickedUserOrgReporteesData={clickedUserOrgReporteesData}
                                           total_Count={total_Count} clickedMemberData={clickedMemberData} contentLoader={contentLoader} changeLoaderStatus={changeLoaderStatus}/>
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
        {},
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoSlider);
