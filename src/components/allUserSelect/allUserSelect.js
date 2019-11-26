import React, { Component } from 'react';
import { connect } from "react-redux";
import { Checkbox, Input, Button } from 'antd';
import './allUserSelect.scss'


class AllUserSelect extends Component {


    render() {
        return (
            <div className="allUserSelect_main">
                <div className="allUserSelect_container">
                    <div className="search_and_buttons">
                        <div className="search_users">
                            {/* <input type="search" placeholder="Search Users / Managers / Designation" /> */}
                            <Input.Search placeholder="Search Users / Managers / Designation" loading={false} />
                        </div>
                        <div className="all_buttons">
                            <Button className="import_button" type="primary" loading={false}>
                                IMPORT USERS
                            </Button>
                            <Button className="add_user_button" type="primary" loading={false}>
                                ADD USERS
                            </Button>
                        </div>
                    </div>
                    <div className="all_user_details" >
                        <div className="upper_heading_details">
                            <div className="upper_checkbox">
                                <Checkbox value="A" />
                            </div>
                            <div className="all_headings" style={{ "grid-template-columns": `repeat(3, auto)` }}>
                                <div>Nis</div>
                                <div>Nis</div>
                                <div>Nis</div>
                            </div>
                            <div className="column_settings"></div>
                        </div>
                        <div className="lower_user_details">
                            <div className="lower_user_details_container">
                                <Checkbox.Group >
                                    <div className="user_details_container">
                                        <div className="lower_checkbox">
                                            <Checkbox value="A" />
                                        </div>
                                        <div className="single_user_details" style={{ "grid-template-columns": `repeat(3, auto)` }}>
                                            <div>nis</div>
                                            <div>nis</div>
                                            <div>nis</div>
                                        </div>
                                        <div className="column_settings"></div>
                                    </div>
                                </Checkbox.Group>
                            </div>
                        </div>
                    </div>

                    <div className="total_users"></div>

                </div>
            </div>
        )
    }
}

export default AllUserSelect