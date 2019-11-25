import React, {Component} from 'react';
import {connect} from "react-redux";
import '../teamView.scss'
import {bindActionCreators} from "redux";
import DefaultImageMale from '../../../images/profile-male.svg'
import DefaultImageFemale from '../../../images/profile-female.svg'
import {teamViewUserClick} from "../../../store/actions/actions";



class TeamViewUserCard extends Component {
    componentDidMount() {
    }

    onUserClick(){
        this.props.teamViewUserClick(true)
        this.props.getClickedUserData()
    }

    render() {
        const {} = this.props.teamViewReducer
        const {member, index} = this.props

        return (
            <div className={'team-view-user-card'} key={index}>
                <div className={'team-view-user-hold'}>
                    <div className={'team-view-user-content'}>
                        {member.profile_image ?
                            <div className={'user-icon'}
                                 style={{backgroundImage: `url(${member.profile_image.thumbnail})`}}></div>
                            : member.gender === 'male' ? <div className={'user-icon'}
                                                              style={{backgroundImage: `url(${DefaultImageMale})`}}></div> :
                                <div className={'user-icon'}
                                     style={{backgroundImage: `url(${DefaultImageFemale})`}}></div>
                        }
                        <div className={'team-user-details'}>
                            <div className={'user-name'}>{member.firstname} {member.lastname}</div>
                            <div
                                className={'user-designation'}>{member.designations ? member.designations.length ? member.designations[0].name : '' : ''}</div>
                            <div className={'hub-id'}>{member.employee_id ? member.employee_id :""}</div>
                        </div>
                    </div>
                    <div className={'show-slider-icon'} onClick={() => this.onUserClick()}></div>
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
            teamViewUserClick

        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamViewUserCard);

