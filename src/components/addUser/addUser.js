import React, { Component } from 'react';
import { Tabs, Icon, Button } from 'antd';
import './addUser.scss'


const { TabPane } = Tabs;

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const { onClickClose } = this.props
        return (

            <>
                <div className="pop_up_display_block"></div>
                <div className="add_user_main">
                    <div className="add_user_container">
                        <div className="heading-with-close">
                            <h2 className="heading">Edit User</h2>
                            <span className="close-popup">
                                <img src={require("../../images/close-app.svg")} onClick={onClickClose} />
                            </span>
                        </div>
                        <div className="profile_pic_with_details ">
                            <div className="profile_pic">
                                <img src={require("../../images/svg/defaultProfile.svg")} />
                                <p className="change_photo">Change Photo</p>
                            </div>
                            <div className="user_details">
                                <h3 className="name">User Details</h3>
                                <p className="designations">Designations</p>
                                <p className="emp_id">Emp Id</p>
                                <p className="location">Location</p>
                            </div>
                        </div>
                        <Tabs defaultActiveKey="1" className="add_user_tab_container">
                            <TabPane key="1" tab={<span><Icon type="apple" theme="filled" /> Personal </span>}>
                                Tab 1
                            </TabPane>
                            <TabPane key="2" tab={<span><Icon type="android" theme="filled" /> Organisation </span>}>
                                Tab 2
                            </TabPane>
                            <TabPane key="3" tab={<span><Icon type="appstore" theme="filled" /> Apps </span>}>
                                Tab 3
                            </TabPane>
                            <TabPane key="4" tab={<span><Icon type="profile" theme="filled" /> Profiles </span>}>
                                Tab 4
                            </TabPane>
                        </Tabs>
                        <div className="bottom_buttons">
                            <Button type="primary">Cancel</Button>
                            <Button type="primary">Next</Button>
                            <Button type="primary">Done</Button>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default AddUser;