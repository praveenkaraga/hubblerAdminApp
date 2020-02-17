import React, {Component} from 'react';
import {connect} from "react-redux";
import '../teamView.scss'
import {bindActionCreators} from "redux";
import {getClickedTeamUserReporteeData, storeClickedUserId, updateRollBackData} from "../../../store/actions/actions";
import TeamViewUserCard from './TeamViewUserCard'
import map from 'lodash/map'
import last from 'lodash/last'
import find from 'lodash/find'
import UpArrow from '../../../images/svg/triangle.svg'
import findIndex from "lodash/findIndex";
import slice from "lodash/slice";
import isEmpty from "lodash/isEmpty";


class UserList extends Component {
    generateTree = (member) => {
        this.props.setReportee(member)
    };

    getConnection = (type,member) =>{
        const {rootData} = this.props.teamViewReducer
        let lastUser = last(rootData)
        if(type === 'manager'){
            if(lastUser._id === member._id){
                return <div className={'manager-connection-wrap'}>
                    <div className={'connection'}></div>
                    <div className={'horizontal-line'}></div>
                </div>
            }
            else{
                return <div className={'connector'}></div>
            }
        }
        else {
            return  ''
        }

    }

    test = (type,rootData) =>{
        if(isEmpty(rootData) && type !== 'manager'){
            return ''
        }else{
            this.getConnection(type)
        }
    }

    render() {
        const {member, index,type} = this.props;
        const {rootData} = this.props.teamViewReducer
        return (
            <li className={'user-list-item'} onClick={() => this.generateTree(member)}>
                <div className={'card-wrap'}><TeamViewUserCard member={member} index={index}/></div>
                {/*{this.test(type,rootData)}*/}
                {isEmpty(rootData) && type === 'reportee' ? '' : this.getConnection(type,member)}
            </li>
        )
    }
}


class OrgChart extends Component {
    constructor(props) {
        super(props);
        this.state ={
            myClickUser : '',
        }
    }

    componentDidMount() {
    }

    setReportee = (member) => {
        this.setState({
            myClickUser : member._id
        })
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
        const {orgChartUsers, rootData, preservedData,clickedMemberData} = this.props.teamViewReducer
        console.log(rootData)
        return (
            <div className={'org-chart'}>
                {/*<div className={'manager-hold'}>
                    <div className={'user-hold'}>Root User</div>
                </div>*/}

                <div className={'back-to-root-wrap'}>
                    <span className={'back-to-root-icon'}></span>
                    <span className={'back-to-root-text'}>Back to root user</span>
                </div>
                <div className={'up-arrow'} style={{backgroundImage: `url(${UpArrow})`}}
                     onClick={() => this.getBackManagerData()}></div>
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
                                            <UserList member={member} index={index} setReportee={this.setReportee} type={'manager'} {...this.props} myClickUser={this.state.myClickUser }/>
                                        )
                                    )}
                                </ul>
                            </div> : ''}
                            {<div className={'reportee-list-wrap'}>
                                <ul>
                                    {map(orgChartUsers, (member, index) => (
                                            <UserList member={member} index={index} setReportee={this.setReportee} type={'reportee'} {...this.props} myClickUser={this.state.myClickUser}/>
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

