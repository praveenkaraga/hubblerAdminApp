import React, {Component} from 'react';
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'


class Personal extends Component {
    getDepartments = (departmentArray) => {
        return map(departmentArray, function (ele,index) {
            if(index !== departmentArray.length - 1){
                return `${ele.name}, `
            }else{
                return `${ele.name}`
            }
        })
    }

    prepareNodeData = (nodeArray) => {
        return map(nodeArray,ele =>  <div className={'team-user-info'}>
            <div className={'team-user-info-text'}>{ele.name}</div>
            <div className={'team-user-info-value'}> {ele.value}</div>
        </div>)

    }

    render() {
        const {teamUserData} = this.props
        return (
            <div className={'personal-information'}>
                {isEmpty(teamUserData) ? <div className={'owner-details-loader'}></div> : <div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Primary Mobile</div>
                        <div
                            className={'team-user-info-value'}> {` +${teamUserData.mobile_country_code.international_dialing} ${teamUserData.mobile}`}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Email</div>
                        <a href="mailto:hi@hubbler.in" className={'team-user-info-value'}>
                            <div className={'team-user-info-value email'}> {teamUserData.email}</div>
                        </a>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Gender</div>
                        <div className={'team-user-info-value'}> {teamUserData.gender}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Date Of Birth</div>
                        <div
                            className={'team-user-info-value'}>{moment(teamUserData.dob, 'DD/MM/YYYY').format('DD MMM, YYYY')}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Date Of Joining</div>
                        <div
                            className={'team-user-info-value'}> {moment(teamUserData.doj, 'DD/MM/YYYY').format('DD MMM, YYYY')}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Designation</div>
                        <div
                            className={'team-user-info-value'}> {teamUserData.designations ? teamUserData.designations.length ? teamUserData.designations[0].name : '' : ''}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Departments</div>
                        <div className={'team-user-info-value'}> {this.getDepartments(teamUserData.departments ?teamUserData.departments :  [])}</div>
                    </div>


                    {teamUserData.node_data ? <div>
                        <div className={'divider'}></div>
                        {this.prepareNodeData(teamUserData.node_data)}
                    </div> : ''}
                </div>}
            </div>
        )
    }
}

export default Personal