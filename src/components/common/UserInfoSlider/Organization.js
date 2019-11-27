import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {getTeamViewOrgData} from "../../../store/actions/actions";
import {connect} from "react-redux";
import map from 'lodash/map'
import DefaultImageMale from '../../../images/profile-male.svg'
import DefaultImageFemale from '../../../images/profile-female.svg'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'


class UserTemplate extends Component{
    render() {
        return map(this.props.clickedUserOrgReporteesData,ele=> <div className={'user-template'}>
            {ele.profile_image ?
                <div className={'user-template-icon'}
                     style={{backgroundImage: `url(${ele.profile_image.thumbnail})`}}></div>
                : ele.gender === 'male' ? <div className={'user-template-icon'}
                                                  style={{backgroundImage: `url(${DefaultImageMale})`}}></div> :
                    <div className={'user-template-icon'}
                         style={{backgroundImage: `url(${DefaultImageFemale})`}}></div>
            }
            <div className={'user-template-details'}>
                <div className={'user-template-name'}>{ele.firstname} {ele.lastname}</div>
                <div className={'designation-id-wrap'}>
                    <div className={'user-template-designation'}>{ele.designations ? ele.designations.length ? ele.designations[0].name : '' : ''}</div>
                    {ele.employee_id  ? <div className={'user-template-id'}>{ele.employee_id}</div> : ""}

                </div>
            </div>
        </div>)
    }
}


class Organization extends Component {
    componentDidMount() {
        this.props.getTeamViewOrgData(this.props.userId)
    }

    render() {
        const {clickedUserOrgManagerData,clickedUserOrgReporteesData,total_Count} =  this.props.teamViewReducer

        return(
            <div className={'organization-information'}>
                <div className={'org-stage-details'} >
                    <div className={'manager-details'}>{isEmpty(first(clickedUserOrgManagerData)) ?  <div className={'manager'}>No Manager</div>: <div><div className={'manager'}> Manager</div> <UserTemplate clickedUserOrgReporteesData={clickedUserOrgManagerData} /></div> }</div>
                    <div className={'division-header'}>{`Reportees : ${total_Count}`}</div>

                    <div className={'list-wrap'} >
                        <UserTemplate clickedUserOrgReporteesData={clickedUserOrgReporteesData} />
                    </div>
                    {/*{isEmpty(orgDetails) ? <div className={'owner-details-loader'}></div> : ''}*/}

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
            getTeamViewOrgData
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Organization);
