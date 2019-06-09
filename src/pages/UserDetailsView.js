import React, {Component} from 'react';
import {connect} from 'react-redux'
import find from 'lodash/find'
import filter from 'lodash/filter'


class UserDetailsView extends Component{
    render(){
        let {users,match,displayItems} = this.props
        let user = find(users, item => item.id === parseInt(match.params.userId))
        displayItems = filter(displayItems, item => item.id !== 'first_name' || item.id !== 'first_name')
        if(user){
            return <div className={'user-details-view'}>
                <div className={'user-details-header'}>
                    <ul>
                        <li className={'back-arrow'} onClick={this.props.history.goBack.bind(this)}>

                        </li>
                        <li className={'user-pic'}>
                            <div className={'profile-pic noPic'} style={{backgroundColor:user.pic_color}}>
                                {user.first_name.substring(0,2)}</div>
                        </li>
                        <li className={'user-name'}>
                            {user.first_name} {user.first_name}
                        </li>
                    </ul>
                </div>
                <div className={'user-details-body'}>
                    <ul>
                    {displayItems.map((item, index) => {
                        return <li key={index}>
                            <span className={'label'}>{item.name}</span>
                            {item.link ?  <span className={'value'}><a href={user[item.id]} target={'_blank'}>{user[item.id]}</a></span>  :    <span className={'value'}>{user[item.id]}</span>}
                        </li>
                    })}
                    </ul>
                </div>
            </div>
        }else {
            return <div>
                User Not Found
            </div>
        }
    }
}

function mapStateToProps(state){
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps)(UserDetailsView)

