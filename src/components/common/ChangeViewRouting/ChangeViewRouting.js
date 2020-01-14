import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    getDepartmentData,
    commonDepartmentAction,
    getDeptTableColumnData,
    postCreateDeptData,
    postAddSelectedUsers,
    getAddSelectedUsersPostedData,
    getAddableUsersData,
    getTableColumnsData,
    getCommonViewHeaderName
} from "../../../store/actions/actions";
import CommonCreationView from "../../common/CommonCreationView/CommonCreationView";
import filter from "lodash/filter";
import CreationPopViewCombined from "../CreationPopViewCombined/CreationPopViewCombined";


class ChangeViewRouting extends Component {
    constructor(props){
        super (props)
        this.state ={
            showAddUsersPopUp : false
        }

    }
    componentDidMount(){
        console.log(this.props)
        this.props.getDeptTableColumnData();
        if (this.props.match.params.id) {
            this.props.commonDepartmentAction({commonViewLoader: true, headerNameWhenRouted: this.props.history.location.state.headerName})
            this.props.getTableColumnsData();
            this.props.getAddSelectedUsersPostedData(this.props.match.params.id)
        } else {
            this.props.getDepartmentData(30)
        }
    }


    commonCreationViewBackButtonClick = () => {
        this.props.history.push(`/people/departments`)
        this.props.getDeptTableColumnData();
        this.props.getDepartmentData(30)
        this.props.commonDepartmentAction({commonViewLoader: true})
    }

    addUsersCommonCardButtonClick =() =>{
        const {createdDepartmentData} = this.props.departmentReducer;
        this.setState({
            showAddUsersPopUp: true,
        });
        this.props.getTableColumnsData();
        this.props.getAddableUsersData(this.props.match.params.id)
        this.props.commonDepartmentAction({viewDecider: false})
    }

    render() {
        const {name, viewDecider, addedUsersData, tableColumnsData, totalAllSelectedUsers, commonViewLoader, headerNameWhenRouted,addableUsersData,totalAddableUsers} = this.props.departmentReducer
        const columnData = tableColumnsData ? filter(tableColumnsData, ele => ele._id !== 'departments') : [];
        console.log(this.props)

        return (
            <CommonCreationView commonCreationViewHeaderName={headerNameWhenRouted}
                                viewDecider={viewDecider}
                                allSelectedUsersUsersData={addedUsersData.result ? addedUsersData.result : []}
                                allSelectedUsersHeadingsData={columnData ? columnData : []} backButton={true}
                                allSelectedUsersTotalUsers={totalAllSelectedUsers}
                                commonCreationViewBackButtonClick={this.commonCreationViewBackButtonClick}
                                commonViewLoader={commonViewLoader}
                                addUsersCommonCardButtonClick={this.addUsersCommonCardButtonClick}
                                showAddUsersPopUp={this.state.showAddUsersPopUp}
                                addUsersPopUpTableColumnsData={tableColumnsData}
                                addUsersPopUpUsersData={addableUsersData}
                                addUsersPopUpTotalUsers={totalAddableUsers}/>
        )
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
            getAddableUsersData,
            getTableColumnsData,
            getCommonViewHeaderName
        },
        dispatch
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangeViewRouting))