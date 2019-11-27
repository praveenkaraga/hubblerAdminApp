import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Checkbox, Input, Button } from 'antd';
import './allUserSelect.scss'
import { getTableColumnData, getConsoleUserData } from '../../store/actions/actions'


class AllUserSelect extends Component {

    componentDidMount() {
        this.props.getTableColumnData()
    }

    render() {

        const { consoleColumnData } = this.props.consoleReducer
        console.log(consoleColumnData, "consoleColumnData")
        return (
            <div className="allUserSelect_main">
                <div className="allUserSelect_container">
                    <div className="search_and_buttons">
                        <div className="search_users">
                            <Input.Search placeholder="Search Users / Managers / Designation" loading={false} />
                        </div>
                        <div className="all_buttons">
                            <Button className="import_button" type="primary" loading={false}>
                                IMPORT USERS
                            </Button>
                            <Button className="add_user_button" type="primary" loading={false}>
                                ADD USER
                            </Button>
                        </div>
                    </div>
                    <div className="all_user_details" >
                        <div className="upper_heading_details">
                            <div className="upper_checkbox">
                                <Checkbox value="A" />
                            </div>

                            <div className="all_headings" style={{ "grid-template-columns": `repeat(${consoleColumnData.length}, auto)` }}>
                                {consoleColumnData.map(data => (<div key={data._id}>{data.lbl}</div>))}
                            </div>

                            <div className="column_settings">
                                {/* <img src={}/> */}
                            </div>
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
                                    </div>
                                </Checkbox.Group>
                            </div>
                        </div>
                    </div>

                    <div className="total_users">
                        <div className="total_users_container">
                            <div className="total_users_count">
                                <p>Total Users: 5632</p>
                            </div>
                            <div className="pagination">
                                <div className="rows_per_page"></div>
                                <div className="page_no">
                                    <div className="current_page">1 of 10</div>
                                    <div className="change_page">  </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        consoleReducer: state.consoleReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTableColumnData,
            getConsoleUserData
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllUserSelect)