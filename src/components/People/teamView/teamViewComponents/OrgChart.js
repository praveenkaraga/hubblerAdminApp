import React, { Component } from 'react';
import { connect } from "react-redux";
import '../teamView.scss'
import { bindActionCreators } from "redux";
import {
    getClickedTeamUserReporteeData,
    getTeamViewUsersData, commonTeamReducerAction
} from "../../../../store/actions/PeopleActions/peopleActions";
import TeamViewUserCard from './TeamViewUserCard'
import map from 'lodash/map'
import last from 'lodash/last'
import find from 'lodash/find'
import UpArrow from '../../../../images/svg/triangle.svg'
import findIndex from "lodash/findIndex";
import slice from "lodash/slice";
import isEmpty from "lodash/isEmpty";


class UserList extends Component {
    generateTree = (member) => {
        this.props.setReportee(member)
    };

    getConnection = (type, member) => {
        const { rootData, total_count, orgChartUsers } = this.props.teamViewReducer

        let lastUser = last(rootData)
        if (type === 'manager') {
            if (lastUser._id === member._id && !isEmpty(orgChartUsers)) {
                return <div className={'manager-connection-wrap'}>
                    <div className={'connection'}></div>
                    <div className={'horizontal-line'}></div>
                    <div className={'reportees-count-wrap'}><span className={'total-count'}>Reportees: <span
                        className={'total-count-number'}>{total_count === '' ? orgChartUsers.length : total_count}</span></span></div>
                </div>
            } else {
                if (lastUser._id === member._id && isEmpty(orgChartUsers)) {
                    return ''
                }
                else {
                    return <div className={'connector'}></div>
                }

            }
        } else {
            return ''
        }

    }

    test = (type, rootData) => {
        if (isEmpty(rootData) && type !== 'manager') {
            return ''
        } else {
            this.getConnection(type)
        }
    }

    render() {
        const { member, index, type } = this.props;
        const { rootData, orgChartUsers } = this.props.teamViewReducer
        return (
            <li className={type === 'reportee' ? 'user-list-item' : 'user-list-item-variant'}>
                <div className={type === 'manager' ? 'card-wrap' : ''}><TeamViewUserCard member={member} index={index} generateTree={(member) => this.generateTree(member)} />
                </div>
                {/*{this.test(type,rootData)}*/}
                {isEmpty(rootData) && type === 'reportee' ? '' : this.getConnection(type, member)}
            </li>
        )
    }
}


class OrgChart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    setReportee = (member, managerId) => {
        this.props.commonTeamReducerAction({ reporteeLoader: true, teamViewClickedUserId: member._id, clickedMemberData: member });
        this.props.getClickedTeamUserReporteeData(managerId || member._id)
    };

    getBackManagerData = () => {
        const { rootData, preservedData, clickedMemberData, mainData, allUsers } = this.props.teamViewReducer
        let lastUser = rootData[rootData.length - 1]  /*last(rootData)*/
        this.props.commonTeamReducerAction({ total_count: '' });
        if (lastUser.manager) {
            lastUser = find(rootData, item => item._id === lastUser.manager._id);
            /*if(newRootData.length === 1 && newRootData[0].manager){
                this.setReportee(newRootData[0])
            }*/
            const id = clickedMemberData._id;
            let userIndex = findIndex(preservedData, { id: id });
            let requiredReportessData = find(preservedData, (ele, index) => {
                if (index === userIndex - 1) {
                    return ele
                }
            });
            let newPreservedData = slice(preservedData, 0, (userIndex));
            let newRootData = slice(rootData, 0, (userIndex));
            if (lastUser === undefined) {
                let managerData = find(allUsers, item => item._id === rootData[0].manager._id)
                this.props.commonTeamReducerAction({ rootData: [managerData], clickedMemberData: managerData, preservedData: [] });
                this.props.getClickedTeamUserReporteeData(rootData[0].manager._id)
            } else {
                this.props.commonTeamReducerAction({ teamViewClickedUserId: lastUser._id._id, clickedMemberData: lastUser, orgChartUsers: requiredReportessData.reportees, preservedData: newPreservedData, rootData: newRootData });
            }
        } else {
            this.props.commonTeamReducerAction({ orgChartUsers: mainData, preservedData: [], rootData: [] });
        }
    };

    backToRootUser = () => {
        const { orgChartUsers, rootData } = this.props.teamViewReducer
        if (!isEmpty(rootData)) {
            this.props.getTeamViewUsersData();
        }
    }

    render() {
        const { orgChartUsers, rootData, preservedData, clickedMemberData, total_Count, reporteeLoader } = this.props.teamViewReducer
        return (
            <div className={'org-chart'}>
                {/*<div className={'manager-hold'}>
                    <div className={'user-hold'}>Root User</div>
                </div>*/}

                {isEmpty(rootData) ? '' : <div className={'back-to-root-wrap'} onClick={this.backToRootUser}>
                    <span className={'back-to-root-icon'} ></span>
                    <span className={'back-to-root-text'}>Back to root user</span>
                </div>}
                {isEmpty(rootData) ? '' : <div className={'up-arrow'} style={{ backgroundImage: `url(${UpArrow})` }}
                    onClick={() => this.getBackManagerData()}></div>}
                <div className={'users-section'}>
                    {/*<div className={'left-area'}>
                        <div className={'icon-search'}></div>
                        <div>Add</div>
                        <div className={'up-arrow'} style={{backgroundImage: `url(${UpArrow})`}}
                             onClick={() => this.getBackManagerData()}></div>
                    </div>*/}
                    <div className={'users-display-section'}>
                        <div className={'display-cards-wrap'}>
                            {/* {map(orgChartUsers, (member, index) => (
                                    <TeamViewUserCard member={member} index={index}/>
                                )
                            )}*/}
                            {rootData.length ? <div className={'manager-list-wrap'}>
                                <ul>
                                    {map(rootData, (member, index) => (
                                        <UserList member={member} index={index} setReportee={this.setReportee}
                                            type={'manager'} {...this.props} />
                                    )
                                    )}
                                </ul>
                            </div> : ''}
                            {<div className={'reportee-list-wrap'}>
                                {reporteeLoader ? <div className={'reportee-loader loader'}></div> : ''}
                                {reporteeLoader ? '' : <ul>
                                    {map(orgChartUsers, (member, index) => (
                                        <UserList member={member} index={index} setReportee={this.setReportee}
                                            type={'reportee'} {...this.props} />
                                    )
                                    )}
                                </ul>}
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
            getTeamViewUsersData, commonTeamReducerAction
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgChart);

