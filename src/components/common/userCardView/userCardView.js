import React, { Component } from 'react';
import './userCardView.scss'
import { Icon } from 'antd'


class UserCardView extends Component {

    render() {
        return (

            <div className="user_details_main">
                <div className="user_details_container">
                    <div className="profile_img">
                        <img src={require('../../../images/profile-male.svg')} />
                    </div>
                    <div className="main_details">
                        <div className="user_name">
                            <p>Nischal</p>
                        </div>
                        <div className="user_designation_with_empId">
                            <p className="designation">Software Engineer</p>
                            <div className="empId_with_dot"><div className="dot"></div><p className="empId">HUB053</p></div>
                        </div>
                    </div>
                    <div className="cross_img"><Icon type="close-circle" theme="filled" /></div>
                </div>
            </div>
        );
    }
}

export default UserCardView;