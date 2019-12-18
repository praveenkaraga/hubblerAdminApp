import React, {Component} from 'react';
import {connect} from "react-redux";
import './departments.scss'
import {Modal, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import {bindActionCreators} from "redux";
import {getDepartmentData, commonDepartmentAction, getDeptTableColumnData} from "../../store/actions/actions";
import AllUserSelect from '../allUserSelect/allUserSelect'

class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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


    render() {
        const {departmentColumnData, departmentsData, totalUsers} = this.props.departmentReducer;

        return (
            <div className="departments-main">
                <div className="departments-heading"><h3>Departments</h3></div>
                <AllUserSelect allHeadingsData={departmentColumnData} userData={departmentsData}
                               searchPlaceHolder={"Search Department"} searchFirstButtonName={"IMPORT RESOURCES"}
                               searchSecondButtonName={"ADD USER"} totalUsers={totalUsers}
                               searchSecondButtonClick={() => this.searchSecondButtonClick(true)} />
                <Modal
                    title="Add New Department"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={() => this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="create" onClick={this.handleCancel} type="primary">Create</Button>,
                        ]}
                    centered
                >
                    <div>Department Name</div>
                    <Input placeholder="Enter Department" className={'department-name-input'}/>
                </Modal>
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
            getDepartmentData, commonDepartmentAction, getDeptTableColumnData
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Departments);


