import React, { Component } from 'react';
import { connect } from "react-redux";
import '../teamView.scss'
import { bindActionCreators } from "redux";
import DefaultImageMale from '../../../../images/profile-male.svg'
import DefaultImageFemale from '../../../../images/profile-female.svg'
import { getClickedTeamUserData, commonTeamReducerAction } from "../../../../store/actions/PeopleActions/peopleActions";



class TeamViewUserCard extends Component {

    onUserClick(userId, member, event) {
        event.stopPropagation()
        this.props.commonTeamReducerAction({ contentLoader: true, teamViewUserDrawerVisible: true, teamViewClickedUserId: userId, clickedMemberData: member })
        this.props.getClickedTeamUserData(userId)
        // this.props.storeClickedUserId(userId,member) //you can remove this
    }

    render() {
        const { member, index, generateTree } = this.props

        return (
            <div className={'team-view-user-card'} key={index}>
                <div className={'team-view-user-hold'} onClick={() => generateTree(member)}>
                    <div className={'team-view-user-content'}>
                        {member.profile_image ?
                            <div className={'user-icon'}
                                style={{ backgroundImage: `url(${member.profile_image.thumbnail})` }}></div>
                            : member.gender === 'male' ? <div className={'user-icon'}
                                style={{ backgroundImage: `url(${DefaultImageMale})` }}></div> :
                                <div className={'user-icon'}
                                    style={{ backgroundImage: `url(${DefaultImageFemale})` }}></div>
                        }
                        <div className={'team-user-details'}>
                            <div className={'user-name'}>{member.firstname} {member.lastname}</div>
                            <div
                                className={'user-designation'}>{member.designations ? member.designations.length ? member.designations[0].name : '' : ''}</div>
                            <div className={'hub-id'}>{member.employee_id ? member.employee_id : ""}</div>
                        </div>
                    </div>
                    <div className={'show-slider-icon'} onClick={(event) => this.onUserClick(member._id, member, event)}></div>
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
            getClickedTeamUserData,
            commonTeamReducerAction,

        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamViewUserCard);

