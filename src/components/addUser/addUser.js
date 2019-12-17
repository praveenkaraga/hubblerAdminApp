import React, { Component } from 'react';
import { Tabs, Icon, Button } from 'antd';
import './addUser.scss'
import AllTypes from '../common/AddUserFiledsType/AllTypes'


const { TabPane } = Tabs;

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const { onClickClose, addUserDataForm } = this.props
        const allButtons = ["Cancel", "Next", "Done"]
        return (

            <>
                <div className="pop_up_display_block"></div>
                <div className="add_user_main">
                    <div className="add_user_container">
                        <div className="heading-with-close">
                            <h2 className="heading">Add New User</h2>
                            <span className="close-popup">
                                <img src={require("../../images/close-app.svg")} onClick={onClickClose} />
                            </span>
                        </div>
                        <div className="profile_pic_with_details ">
                            <div className="profile_pic">
                                {/* <img className="profile_image" src={require("../../images/svg/defaultProfile.svg")} /> */}
                                <div className="no_profile_image"><p>Upload Pic</p></div>
                                <img className="camera" src={require("../../images/svg/camera-profile.svg")} />
                            </div>
                            <div className="user_details">
                                <h3 className="name">User Details</h3>
                                <p className="designations">Designations</p>
                                <p className="emp_id">Emp Id</p>
                                <p className="location">Location</p>
                            </div>
                        </div>

                        <Tabs defaultActiveKey="1" tabPosition="left" className="add_user_tab_container" >
                            <TabPane key="1" tab="Personal">
                                {addUserDataForm.map(data => (<AllTypes type={data.type} />))}
                            </TabPane>
                            <TabPane key="2" tab="Organisation">
                                Tab 2
                            </TabPane>
                            <TabPane key="3" tab="Apps">
                                Tab 3
                            </TabPane>
                            <TabPane key="4" tab="Profiles">
                                Tab 4
                            </TabPane>
                        </Tabs>


                        <div className="bottom_buttons">
                            {allButtons.map(buttonType => (<Button type="primary">{buttonType}</Button>))}
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default AddUser;