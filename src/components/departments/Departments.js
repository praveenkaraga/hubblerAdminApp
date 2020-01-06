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
import CreationPopViewCombined from '../common/CreationPopViewCombined/CreationPopViewCombined'
import CreationPopUp from "../common/CreationPopUp/CreationPopUp";
import CommonCreationView from "../common/CommonCreationView/CommonCreationView";

class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeToCreatedView: false,  //changeToDepartmentCreatedView
            showAddUsersPopUp: false, //showUsersList
            usersIdArray: [], //usersIdArray
            creationPopUpVisibility: false,
        }
    }

    componentDidMount() {
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30)
    }

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

    //retain this
    searchSecondButtonClick = (status) => {
        this.setState({
            creationPopUpVisibility: true

        })
    }

    //new stuff
    creationPopFirstButtonHandler = () => {
        this.setState({
            creationPopUpVisibility: false
        })
    };


    creationPopSecondButtonHandler = () => {
        let data = {name: this.state.commonCreationViewHeaderName};
        this.props.postCreateDeptData(data);
        this.setState({
            changeToCreatedView: true,
            creationPopUpVisibility: false,
        })
    }

    creationPopUpFirstFieldChangeHandler = (e) => {
        this.setState({
            commonCreationViewHeaderName: e.target.value
        })
    };


    addUsersCommonCardButtonClick = () => {
        const {createdDepartmentData} = this.props.departmentReducer;
        this.setState({
            showAddUsersPopUp: true,
        });
        this.props.getTableColumnsData();
        this.props.getAddableUsersData(createdDepartmentData ? createdDepartmentData.id : '')
        this.props.commonDepartmentAction({viewDecider: false})

    }

    allSelectedUsersOnChangeCheckBox = (value) => {
        this.setState({
            usersIdArray: value,
        })
    }

    allSelectedUsersFirstButtonClick = () => {
        console.log('yet to write the function : allSelectedUsersFirstButtonClick')
    }

    commonCreationViewBackButtonClick = () => { //backToMainDepartmentView
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30)
        this.setState({
            changeToCreatedView: false //changeToDepartmentCreatedView
        })
    }


    addUsersPopUpClose = () => {
        this.setState({
            showAddUsersPopUp: false
        })
    };

    addUsersPopUpFirstButtonClick = () => { // onClickFirst
        const {createdDepartmentData} = this.props.departmentReducer;
        let data = {
            users: this.state.usersIdArray,
            _id: createdDepartmentData.id
        };
        this.setState({
            showAddUsersPopUp: false
        })
        this.props.postAddSelectedUsers(data);
        this.props.getAddSelectedUsersPostedData(createdDepartmentData.id)
    };

    addUsersPopUpOnChangeCheckBox = (value) => { //onChangeAddUsersCheckBox
        this.setState({
            usersIdArray: value,
        })
    };


    render() {
        const {departmentColumnData, departmentsData, addableUsersData, totalUsers, addedUsersData, tableColumnsData, viewDecider} = this.props.departmentReducer;
        console.log(addedUsersData);
        const columnData = tableColumnsData ? filter(tableColumnsData, ele => ele._id !== 'departments') : [];

        const {creationPopUpVisibility, changeToCreatedView, showAddUsersPopUp, commonCreationViewHeaderName} = this.state;

        return (
            <div className="departments-main">
                {/*{changeToCreatedView ? viewDecider ?
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
                </div>}*/}


                {!changeToCreatedView ? <div className={'departments-main-view'}>
                    <div className="departments-heading"><h3>Departments</h3></div>
                    <AllUserSelect allHeadingsData={departmentColumnData} userData={departmentsData}
                                   searchPlaceHolder={"Search Department"} searchFirstButtonName={"IMPORT RESOURCES"}
                                   searchSecondButtonName={"ADD DEPARTMENT"} totalUsers={totalUsers}
                                   searchSecondButtonClick={() => this.searchSecondButtonClick(true)} isUserData={false}
                                   onChangeCheckBox={this.onChangeCheckBox}/>
                </div> : ""}

                <CreationPopViewCombined creationPopUpVisibility={creationPopUpVisibility}
                                         //implies the visibility status of creation PopUP = boolean
                                         creationPopFirstButtonHandler={this.creationPopFirstButtonHandler}
                                         //function that gets invoked on click of the the first button of create pop
                                         creationPopSecondButtonHandler={this.creationPopSecondButtonHandler}
                                         //function that gets invoked on click of the second button of create popup
                                         creationPopUpFirstFieldChangeHandler={this.creationPopUpFirstFieldChangeHandler}
                                         //function that gets invoked for first fieldType (input) of the creation popup
                                         fieldHeader={"Department Name"}
                                         //value for fieldType header
                                         fieldPlaceHolder={'Enter Department'}
                                         //value for fieldType placeholder
                                         customField={''} // custom field type ('add' or 'edit') that implies the type of fields that can be added
                    // end of CreationPopUp props
                                         commonCreationViewBackButtonClick={this.commonCreationViewBackButtonClick}
                                         //function that gets invoked on click of the back button of commonCreationView
                                         commonCreationViewHeaderName={commonCreationViewHeaderName}
                                         //name of the header (usually the value obtained from first fieldType of creation popu)
                                         backButton={true}
                                         //implies whether back button is required or not = boolean
                                         viewDecider={viewDecider}
                                         //implies value(true or false or 0 or 1) that dicides whether to show the AddUsersCommonCardView or AllUserSelectTable
                                         addUsersCommonCardButtonClick={this.addUsersCommonCardButtonClick}
                                         //function that gets invoked on click of the addUsersCommonCardButton
                                         allSelectedUsersHeadingsData={columnData}
                                         //column data (array) for allHeadingsData of AllUsersSelect
                                         allSelectedUsersUsersData={addedUsersData}
                                         //users data (array) for userData AllUsersSelect
                                         allSelectedUsersTotalUsers={totalUsers}
                                         //total count of users for totalUsers AllUsersSelect
                                         allSelectedUsersIsUserData={true}
                                         //boolean value for isUserData of AllUsersSelect
                                         allSelectedUsersOnChangeCheckBox={this.allSelectedUsersOnChangeCheckBox}
                                         //function that gets invoked on click of checkbox of AllUsersSelect
                                         allSelectedUsersOnlySelectAndAdd={true}
                                         //boolean value for onlySelectAndAdd AllUsersSelect
                                         allSelectedUsersFirstButtonClick={this.allSelectedUsersFirstButtonClick}
                                         //function that gets invoked on click of first button of AllUsersSelect
                                         showAddUsersPopUp={showAddUsersPopUp}
                                         //boolean value that enables the visibility of AddUsersPopUp
                                         addUsersPopUpClose={this.addUsersPopUpClose}
                                         //function that gets invoked on click of close icon of AddUsersPopUp
                                         addUsersPopUpFirstButtonClick={this.addUsersPopUpFirstButtonClick}
                                         //function that gets invoked on click of first button of AddUsersPopUp
                                         addUsersPopUpOnChangeCheckBox={this.addUsersPopUpOnChangeCheckBox}
                                         //function that gets invoked on click of checkbox of AddUsersPopUp
                                         addUsersPopUpTableColumnsData={tableColumnsData}
                                         //column data (array) for allHeadingsData of AllUsersSelect of AddUsersPopUp
                                         addUsersPopUpUsersData={addableUsersData}
                                         //users data (array) for userData of AllUsersSelect of AddUsersPopUp
                                         addUsersPopUpTotalUsers={totalUsers}
                                         //total count of users for totalUsers of AllUsersSelect of AddUsersPopUp
                                         addUsersPopUpIsUserData={true}
                                         //boolean value for isUserData of AllUsersSelect of AddUsersPopUp
                                         addUsersPopUpOnlySelectAndAdd={true}
                                         //boolean value for onlySelectAndAdd of AllUsersSelect of AddUsersPopUp
                                         changeToCreatedView={changeToCreatedView}
                                         //boolean value to shift to CommonCreationView
                    // end of CommonCreationView props
                />
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


