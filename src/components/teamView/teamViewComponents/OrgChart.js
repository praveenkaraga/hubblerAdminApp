import React, {Component} from 'react';
import {connect} from "react-redux";
import '../teamView.scss'
import {bindActionCreators} from "redux";
import {getClickedTeamUserReporteeData, storeClickedUserId, updateRollBackData} from "../../../store/actions/actions";
import TeamViewUserCard from './TeamViewUserCard'
import map from 'lodash/map'
import last from 'lodash/last'
import find from 'lodash/find'
import UpArrow from '../../../images/up-arrow.svg'
import findIndex from "lodash/findIndex";
import slice from "lodash/slice";


class UserList extends Component {
    generateTree = (member) => {
        this.props.setReportee(member)
    };

    render() {
        const {member, index} = this.props
        return (
            <li className={'user-list-item'} onClick={() => this.generateTree(member)}>
                <TeamViewUserCard member={member} index={index}/>
            </li>
        )
    }
}


class OrgChart extends Component {
    componentDidMount() {
    }

    setReportee = (member) => {
        this.props.storeClickedUserId(member._id, member);
        this.props.getClickedTeamUserReporteeData(member._id)
    };

    getBackManagerData = () => {
        const {rootData, preservedData, clickedMemberData, mainData} = this.props.teamViewReducer
        let lastUser = last(rootData)
        if (lastUser.manager) {
            lastUser = find(rootData, item => item._id === lastUser.manager._id);
            this.props.storeClickedUserId(lastUser._id, lastUser);
            const id = clickedMemberData._id;
            let userIndex = findIndex(preservedData, {id: id});
            let requiredReportessData = find(preservedData, (ele, index) => {
                if (index === userIndex - 1) {
                    return ele
                }
            })
            let newPreservedData = slice(preservedData, 0, (userIndex));
            let newRootData = slice(rootData, 0, (userIndex));
            this.props.updateRollBackData(requiredReportessData.reportees, newPreservedData, newRootData)

        } else {
            this.props.updateRollBackData(mainData, [], [])
        }
    };


    render() {
        const {orgChartUsers, rootData, preservedData} = this.props.teamViewReducer
        console.log(rootData)
        console.log(orgChartUsers)
        console.log(preservedData)

        return (
            <div className={'org-chart'}>
               {/* <div className={'manager-hold'}>
                    <div className={'user-hold'}>Root User</div>
                </div>*/}
                <div className={'users-section'}>
                    <div className={'left-area'}>
                        <div className={'icon-search'}></div>
                        <div>Add</div>
                        <div className={'up-arrow'} style={{backgroundImage: `url(${UpArrow})`}}
                             onClick={() => this.getBackManagerData()}></div>
                    </div>

                    <div className={'search'}>
                        Nush
                    </div>
                    <div className={'users-display-section'}>
                        <div className={'display-cards-wrap'}>
                            {/* {map(orgChartUsers, (member, index) => (
                                    <TeamViewUserCard member={member} index={index}/>
                                )
                            )}*/}
                            {rootData.length ? <div className={'manager-list-wrap'}>
                                <ul>
                                    {map(rootData, (member, index) => (
                                            <UserList member={member} index={index} setReportee={this.setReportee}/>
                                        )
                                    )}
                                </ul>
                            </div> : ''}
                            {<div className={'reportee-list-wrap'}>
                                <ul>
                                    {map(orgChartUsers, (member, index) => (
                                            <UserList member={member} index={index} setReportee={this.setReportee}/>
                                        )
                                    )}
                                </ul>
                            </div>}
                        </div>

                    </div>
                </div>
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
            getClickedTeamUserReporteeData,
            storeClickedUserId,
            updateRollBackData
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgChart);

