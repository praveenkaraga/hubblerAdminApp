import React, {Component} from 'react';
import {connect} from "react-redux";
import './teamView.scss'
import {Button} from 'antd';
import 'antd/dist/antd.css';
import SearchTransition from '../common/Search/SearchTransition'
import OrgChart from './teamViewComponents/OrgChart'
import {bindActionCreators} from "redux";
import { getTeamViewUsersData ,teamViewUserClick} from "../../store/actions/actions";
import {Drawer} from 'antd';
import {teamViewReducer} from "../../store/reducers/teamViewReducer";
import UserInfoSlider from '../../components/common/UserInfoSlider/UserInfoSlider'
import Loader from '../../../src/components/common/Loader/Loader'


class TeamView extends Component {
    componentDidMount() {
        this.props.getTeamViewUsersData()
    }
    render() {
        const {orgChartUsers,teamViewUserDrawerVisible} =  this.props.teamViewReducer
        console.log(orgChartUsers)
        return (
            <div className={'team-view'}>
                <div className={'component-header'}>Team View</div>
                <div className={'team-view-buttons-wrap'}>
                    <SearchTransition/>
                    <Button type="primary" className={'import-excel'}>Import Excel</Button>
                    <Button type="primary" >Create New User</Button>
                </div>
                <OrgChart/>

                <UserInfoSlider visible={teamViewUserDrawerVisible} onCloseFunction={(flag)=>this.props.teamViewUserClick(flag)} />



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
            teamViewUserClick
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamView);

