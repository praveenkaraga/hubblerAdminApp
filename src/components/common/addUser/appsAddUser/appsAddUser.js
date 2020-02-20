import React, { Component } from 'react';
import './appsAddUser.scss'
import CustomSearch from '../../CustomSearch/customSearch'
import { Switch, Select } from 'antd'

const { Option } = Select
class AppsAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="appsAddUser_main">
                <div className="appsAddUser_container">
                    <div className="main_heading_with_search"> <h3 className="main_heading">Apps permissions</h3> <CustomSearch searchPlaceHolder="Search App" /></div>
                    <hr className="heading_divider" />
                    <div className="apps_main">
                        <div className="apps_container">
                            <div className="single_category_main">
                                <div className="singleApp_upper_part">
                                    <div className="name_switch">
                                        <div className="category_switch">
                                            <Switch size="small" defaultChecked={false} />
                                        </div>
                                        <h4 className="category_name">Modules</h4>
                                    </div>
                                    <div className="app_selected_count">
                                        6 of 6 selected
                                    </div>
                                </div>
                                <div className="singleApp_bottom_part">
                                    <div className="main_content">
                                        <div className="name_image_switch">
                                            <div className="singleApp_switch"><Switch size="small" defaultChecked={false} /></div>
                                            <div className="singleApp_image"><img src={require('../../../../images/svg/default_app.svg')} /></div>
                                            <div className="singleApp_name">Attendence</div>
                                            <div className="published_status_dot"></div>
                                        </div>
                                        <div className="singleApp_select_permission">
                                            <Select defaultValue={"write"} size={"small"}>
                                                <Option value="write">Create and View</Option>
                                                <Option value="read">View</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <hr className="singleApp_divider" />

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default AppsAddUser;