import React, {Component} from 'react';
import {connect} from "react-redux";
import './departments.scss'
import {Modal, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import {bindActionCreators} from "redux";
import {
    getDepartmentData,
    commonDepartmentAction,
    getDeptTableColumnData,
    postCreateDeptData, postAddSelectedUsers, getAddSelectedUsersPostedData, getAddableUsersData, getTableColumnsData
} from "../../store/actions/actions";
import AllUserSelect from '../allUserSelect/allUserSelect'
import filter from "lodash/filter";
import CommonCreationView from '../../components/common/CommonCreationView/CommonCreationView'

class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeToDepartmentCreatedView: false,
            showUsersList: false,
            usersIdArray: [],
        }
    }

    componentDidMount() {
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30)
    }

    searchSecondButtonClick = (status) => {
        this.setState({
            visible: true

        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onInputChange = (e) => {
        this.setState({
            departmentName: e.target.value
        })
    }


    onChangeCheckBox = (value) => {
        console.log(value)
    }

    createDepartment() {
        let data = {name: this.state.departmentName};
        this.props.postCreateDeptData(data);
        this.setState({
            changeToDepartmentCreatedView: true,
            visible: false,
        })
    }

    backToMainDepartmentView = () => {
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30)
        this.setState({
            changeToDepartmentCreatedView: false
        })
    }

    addFromUsersClick = () => {
        const {createdDepartmentData} = this.props.departmentReducer;
        this.setState({
            showUsersList: true,
        });
        this.props.getTableColumnsData();
        this.props.getAddableUsersData(createdDepartmentData ? createdDepartmentData.id : '')
        this.props.commonDepartmentAction({populateSelectedUsersView: false})
    };

    onUserListCancel = () => {
        this.setState({
            showUsersList: false,
        });
    };

    onClickFirst = () => {
        const {createdDepartmentData} = this.props.departmentReducer;
        let data = {
            users: this.state.usersIdArray,
            _id: createdDepartmentData.id
        };
        this.props.postAddSelectedUsers(data);
        this.props.getAddSelectedUsersPostedData(createdDepartmentData.id)
    };

    onChangeAddUsersCheckBox = (value) => {
        this.setState({
            usersIdArray: value,
        })
    };

    addUsersCommonCardButtonClick = () =>{
        this.setState({

        })
    }

    render() {
        const {departmentColumnData, departmentsData, addableUsersData, totalUsers, addedUsersData, tableColumnsData, populateSelectedUsersView} = this.props.departmentReducer;
        console.log(addedUsersData);
        console.log(populateSelectedUsersView);
        const columnData = tableColumnsData ? filter(tableColumnsData, ele => ele._id !== 'departments') : [];

        return (
            <div className="departments-main">
                {this.state.changeToDepartmentCreatedView ? populateSelectedUsersView ?
                    <div className={'departments-secondary-view'}>

                        <div className={'departments-secondary-view-wrap'}>
                            <div>
                                <div className={'department-name'}
                                     onClick={this.backToMainDepartmentView}>{this.state.departmentName}</div>
                            </div>
                            <div className={'all-select-wrap'}>
                                <AllUserSelect allHeadingsData={columnData}
                                               userData={addedUsersData ? addedUsersData.result : []}
                                               searchPlaceHolder={"Search Department"}
                                               searchFirstButtonName={"Add Selected"}
                                               searchSecondButtonName={"ADD USER"} totalUsers={totalUsers}
                                               searchSecondButtonClick={() => this.searchSecondButtonClick(true)}
                                               isUserData={true}
                                               onChangeCheckBox={this.onChangeAddUsersCheckBox} onlySelectAndAdd={true}
                                               searchFirstButtonClick={this.onClickFirst}/>

                            </div>

                        </div>
                    </div> : <div className={'departments-secondary-view'}>
                        <div className={'departments-secondary-view-wrap'}>
                            <div>
                                <div className={'department-name'}
                                     onClick={this.backToMainDepartmentView}>{this.state.departmentName}</div>
                            </div>
                            <div className={'add-user-card'}>
                                <div className={'header'}>Add Users</div>
                                <div className={'icon-mini'}></div>
                                <div className={'text'}>You don't have any Users here. Please add from the Users list.
                                </div>
                                <Button key="addUsers" type="primary" onClick={this.addFromUsersClick}
                                        className={'add-from-users-list'}>
                                    Add from Users List </Button>
                            </div>
                            <Modal
                                visible={this.state.showUsersList}
                                centered={true}
                                title={'Add Users'}
                                footer={null} className={'user-pop-model'}
                                onCancel={this.onUserListCancel}>
                                <AllUserSelect allHeadingsData={tableColumnsData} userData={addableUsersData}
                                               searchPlaceHolder={"Search Department"}
                                               searchFirstButtonName={"Add Selected"}
                                               searchSecondButtonName={"ADD USER"} totalUsers={totalUsers}
                                               searchSecondButtonClick={() => this.searchSecondButtonClick(true)}
                                               isUserData={true}
                                               onChangeCheckBox={this.onChangeAddUsersCheckBox} onlySelectAndAdd={true}
                                               searchFirstButtonClick={this.onClickFirst}/>
                            </Modal>


                        </div>
                    </div> : <div className={'departments-main-view'}>
                    <div className="departments-heading"><h3>Departments</h3></div>
                    <AllUserSelect allHeadingsData={departmentColumnData} userData={departmentsData}
                                   searchPlaceHolder={"Search Department"} searchFirstButtonName={"IMPORT RESOURCES"}
                                   searchSecondButtonName={"ADD DEPARTMENT"} totalUsers={totalUsers}
                                   searchSecondButtonClick={() => this.searchSecondButtonClick(true)} isUserData={false}
                                   onChangeCheckBox={this.onChangeCheckBox}/>
                    <Modal
                        title="Add New Department"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="cancel" onClick={() => this.handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="create" onClick={this.createDepartment.bind(this)}
                                    type="primary">Create</Button>,
                        ]}
                        centered
                    >
                        <div>Department Name</div>
                        <Input placeholder="Enter Department" className={'department-name-input'}
                               onChange={this.onInputChange}/>
                    </Modal>
                </div>}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        departmentReducer: state.departmentReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDepartmentData,
            commonDepartmentAction,
            getDeptTableColumnData,
            postCreateDeptData,
            postAddSelectedUsers,
            getAddSelectedUsersPostedData,
            getAddableUsersData, getTableColumnsData
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Departments);


