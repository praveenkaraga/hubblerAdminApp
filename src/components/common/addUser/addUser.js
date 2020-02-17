import React, { Component } from 'react';
import { Tabs, Popover, Button, Form } from 'antd';
import './addUser.scss'
import ImageCropper from '../../common/ImageCropper/imageCropper'
import CustomForm from '../../common/CustomForm/customForm'
import ProfilesAddUser from './profilesAddUser/profilesAddUser'

const { TabPane } = Tabs;

const allButtons = ["Cancel", "Next", "Done"]

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            croppedImage: null
        }
    }


    finalImage = (data) => {
        this.setState({ croppedImage: data })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }




    render() {

        const { onClickClose, addUserDataForm, addUserProfileData, onChangeAddUsersTab } = this.props
        const { croppedImage } = this.state
        const profileImgcontent = (
            <div className="actionButtons">
                <label for="uploadPhoto-ImageCropper"> <div>Upload</div></label>
                <div onClick={() => this.finalImage(null)}>Remove</div>
            </div>
        )

        return (

            <>
                <>
                    <ImageCropper uniqueId={"uploadPhoto-ImageCropper"} onClickApply={this.finalImage} />

                </>
                <div className="pop_up_display_block"></div>
                <div className="add_user_main">
                    <div className="add_user_container">
                        <div className="heading-with-close">
                            <h2 className="heading">Add New User</h2>
                            <span className="close-popup">
                                <img src={require("../../../images/close-app.svg")} onClick={onClickClose} />
                            </span>
                        </div>
                        <div className="profile_pic_with_details ">
                            <div className="profile_pic">

                                {!croppedImage ?
                                    <label for="uploadPhoto-ImageCropper">
                                        <div className="no_profile_image"><p>Upload Pic</p></div>
                                    </label>

                                    :
                                    <Popover placement="bottom" content={profileImgcontent} trigger="click" overlayClassName="addUser_popup">
                                        <img className="profile_image" src={croppedImage} />
                                    </Popover>}


                                <img className="camera" src={require("../../../images/svg/camera-profile.svg")} />
                            </div>
                            <div className="user_details">
                                <h3 className="name">User Details</h3>
                                <p className="designations">Designations</p>
                                <p className="emp_id">Emp Id</p>
                                <p className="location">Location</p>
                            </div>
                        </div>

                        <Tabs defaultActiveKey="1" tabPosition="left" className="add_user_tab_container" onChange={onChangeAddUsersTab}>
                            <TabPane key="personal" tab="Personal">
                                <CustomForm formData={addUserDataForm} />
                            </TabPane>
                            <TabPane key="organisation" tab="Organisation">
                                Tab 2
                            </TabPane>
                            <TabPane key="apps" tab="Apps">
                                Tab 3
                            </TabPane>
                            <TabPane key="profiles" tab="Profiles">
                                <ProfilesAddUser addUserProfileData={addUserProfileData} />
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