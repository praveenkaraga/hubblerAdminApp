import React, {Component} from 'react';
import map from 'lodash/map'
import DefaultImageMale from '../../../images/profile-male.svg'
import DefaultImageFemale from '../../../images/profile-female.svg'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'
import isArray from "lodash/isArray";


class UserTemplate extends Component {
    checkType = (data) => {
        let returnValue = ''
        if (!isArray(data)) {
            returnValue = data
        } else if (data.length) {
            returnValue = data[0].name
        } else returnValue = ' '
        return returnValue
    }

    render() {
        if (isEmpty(this.props.clickedUserOrgReporteesData)) {
            return <div className={'no-reportees'}>No Reportees</div>
        } else {
            return map(this.props.clickedUserOrgReporteesData, ele => <div className={'user-template'}>
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
                        <div
                            className={'user-template-designation'}>{ele.designations ? this.checkType(ele.designations) : ''}</div>
                        {ele.employee_id ? <div className={'user-template-id'}>{ele.employee_id}</div> : ""}

                    </div>
                </div>
            </div>)
        }

    }
}


class Organization extends Component {
    /*componentDidMount() {
        this.props.getTeamViewOrgData(this.props.userId)
    }
*/
    render() {
        const {clickedUserOrgData} = this.props
        let clickedUserOrgManagerData = clickedUserOrgData ? [clickedUserOrgData.manager] || [] : [];
        let clickedUserOrgReporteesData = clickedUserOrgData ? clickedUserOrgData.reportees || [] : [];
        let total_Count = clickedUserOrgData ? clickedUserOrgData.total_count || '' : '';
        return (
            <div className={'organization-information'}>
                <div className={'org-stage-details'}>
                    <div className={'manager-details'}>{isEmpty(first(clickedUserOrgManagerData)) ?
                        <div className={'manager'}>No Manager</div> : <div>
                            <div className={'manager'}> Manager</div>
                            <UserTemplate clickedUserOrgReporteesData={clickedUserOrgManagerData}/></div>}</div>
                    <div className={'division-header'}>{`Reportees : ${total_Count ? total_Count : '0'}`}</div>

                    <div className={'list-wrap'}>
                        <UserTemplate clickedUserOrgReporteesData={clickedUserOrgReporteesData}/>
                        {/*{isEmpty(clickedUserOrgReporteesData) ? <div className={'owner-details-loader'}></div>  :
                            }*/}
                    </div>
                    {/*{isEmpty(orgDetails) ? <div className={'owner-details-loader'}></div> : ''}*/}

                </div>

            </div>
        )
    }
}

export default Organization
