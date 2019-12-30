import React, {Component} from 'react';
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import isArray from "lodash/isArray";


class Personal extends Component {
    getDepartments = (departmentArray) => {
        if(isEmpty(departmentArray)){
            return '- -'
        }else{
            return this.checkType(departmentArray,'department')
        }
    }

    prepareNodeData = (nodeArray) => {
        return map(nodeArray,ele =>  <div className={'team-user-info'}>
            <div className={'team-user-info-text'}>{ele.name}</div>
            <div className={'team-user-info-value'}> {ele.value}</div>
        </div>)

    }

    checkType=(data,type)=>{
        let returnValue = ''
        if(!isArray(data)){
            returnValue = data
        }else if(data.length){
            if(type === 'department'){
                return returnValue = map(data, function (ele,index) {
                    if(index !== data.length - 1){
                        return `${ele.name}, `
                    }else{
                        return `${ele.name ? ele.name  : '- -'}`
                    }
                })
            }else{
                returnValue = data[0].name
            }
        }else returnValue = ' '
        return returnValue
    }



    render() {
        const {teamUserData} = this.props
        return (
            <div className={'personal-information'}>
                {isEmpty(teamUserData) ? <div className={'owner-details-loader'}></div> : <div>
                    <div className={'team-user-info'}>

                        <div className={'team-user-info-text'}>Primary Mobile</div>
                        <div
                            className={'team-user-info-value'}> {` +${teamUserData.mobile_country_code ? teamUserData.mobile_country_code.international_dialing : ''} ${teamUserData.mobile ? teamUserData.mobile : '- -'}`}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Email</div>
                        <a href="mailto:hi@hubbler.in" className={'team-user-info-value'}>
                            <div className={'team-user-info-value email'}> {teamUserData.email ? teamUserData.email : "- -"}</div>
                        </a>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Gender</div>
                        <div className={'team-user-info-value'}> {teamUserData.gender ? teamUserData.gender : '- -'}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Date Of Birth</div>
                        <div
                            className={'team-user-info-value'}>{teamUserData.dob ? moment(teamUserData.dob, 'DD/MM/YYYY').format('DD MMM, YYYY') : '- -'}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Date Of Joining</div>
                        <div
                            className={'team-user-info-value'}> {teamUserData.doj ? moment(teamUserData.doj, 'DD/MM/YYYY').format('DD MMM, YYYY') : '- -'}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Designation</div>
                        <div
                            className={'team-user-info-value'}> {teamUserData.designations ? this.checkType(teamUserData.designations): '- -'}</div>
                    </div>
                    <div className={'team-user-info'}>
                        <div className={'team-user-info-text'}>Departments</div>
                        <div className={'team-user-info-value'}> {teamUserData.departments ? this.getDepartments(teamUserData.departments) :  "- -" }</div>
                    </div>
                    {teamUserData.node_data ? <div>
                        <div className={'divider'}></div>
                        <div className={'node-data-wrap'}>
                            {this.prepareNodeData(teamUserData.node_data)}
                        </div>

                    </div> : ''}
                </div>}
            </div>
        )
    }
}

export default Personal