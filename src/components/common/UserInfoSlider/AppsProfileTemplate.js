import React,{Component} from 'react'
import Image from '../../../images/console.svg'

class AppsProfileTemplate extends Component{
    getProfileType = (data) =>{
        switch(data.type){
            case "Leave" : {
                return "leave";
            }
            case "Holiday" : {
                return "holiday"
            }
            case "Working Day" : {
                return "working-day "
            }
            case "Reimbursement" : {
                return "reimbursement"
            }
            case "Tracking" : {
                return "tracking "
            }
            default : {
                return 'l'
            }
        }
    }

    render() {
        const {data} = this.props;
        let access = '';
        if(data.access){
            if(data.access === 'write'){
                access = 'Create'
            }else if(data.access === 'view'){
                access = 'Read Only'
            }
        }else{
            access = data.name ? data.name : ' - - '
        }



        return(
            <div className={'apps-profile-template'}>
                <div className={'icon-name-wrap'}>
                    <div className={`${this.getProfileType(data)} icon-type`} style={{backgroundImage: `url(${Image})`}}></div>
                    <div className={'name'}>{data.appname ? data.appname : data.type}</div>
                </div>
                <div className={'type'}>{access}</div>
            </div>
        )
    }
}

export default AppsProfileTemplate