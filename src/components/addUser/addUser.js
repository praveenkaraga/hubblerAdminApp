import React, { Component } from 'react';
import { Tabs, Popover, Button, Form } from 'antd';
import './addUser.scss'
import AllTypes from '../common/AddUserFiledsType/AllTypes'
import ImageCropper from '../common/ImageCropper/imageCropper'
import CustomForm from '../common/CustomForm/customForm'

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

        const { onClickClose, addUserDataForm } = this.props
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
                                <img src={require("../../images/close-app.svg")} onClick={onClickClose} />
                            </span>
                        </div>
                        <div className="profile_pic_with_details ">
                            <div className="profile_pic">

                                {!croppedImage ?
                                    <label for="uploadPhoto-ImageCropper">
                                        <div className="no_profile_image"><p>Upload Pic</p></div>
                                    </label>

                                    :
                                    <Popover placement="bottom" content={profileImgcontent} trigger="click">
                                        <img className="profile_image" src={croppedImage} />
                                    </Popover>}


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
                                {/* <Form onSubmit={this.handleSubmit}>
                                    {addUserDataForm.map(data => (<AllTypes key={data.id + data.tatabIndexb}
                                        type={data.type} minLength={data.minlength} maxLength={data.maxlength}
                                        required={data.required} label={data.label} options={data.options} placeholder={data.placeholder} />))}
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit">
                                            Register
                                    </Button>
                                    </Form.Item>
                                </Form> */}
                                <CustomForm formData={addUserDataForm} />

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