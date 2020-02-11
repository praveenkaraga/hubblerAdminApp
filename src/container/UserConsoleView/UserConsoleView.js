import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    getUserData,
    createActiveLink,
    getCirclesData,
    getCustomFields,
    getDeptTableColumnData,
    commonDepartmentAction,
    getTableColumnsData,
    getAddSelectedUsersPostedData,
    getDepartmentData,
    patchCommonCreateData,
    commonActionForCommonReducer,
    getLoginSessionData,
    postCommonCreateData,
    postCommonDelete,getParentNodeOptionsData,commonUserConsoleAction
} from '../../store/actions/actions'
import Console from '../../components/console/Console'
import TeamView from '../../components/teamView/TeamView'
import Departments from '../../components/departments/Departments'
import Designations from '../../components/designations/designations'
import CustomDropdown from '../../components/common/CustomDropdown/customDropdown'
import CreationPopUp from '../../components/common/CreationPopUp/CreationPopUp'
// import CircleOpenView from '../../components/nodeOpenView/circleOpenView'
import FieldOpenView from '../../components/nodeOpenView/fieldOpenView'
import CommonSingleOpenView from '../../components/nodeOpenView/commonSingleOpenView'
import ChangeViewRouting from '../../components/common/ChangeViewRouting/ChangeViewRouting'
import {
    Switch,
    Route,
    NavLink,
    Redirect,
    withRouter
} from "react-router-dom";
import {message} from 'antd'
import './userConsoleView.scss'

const routes = [
    {
        path: "/console",
        exact: true,
        main: () => <Console/>,
        name: 'Console',
        link_name: 'console',
        class_name: 'console'
    },
    {
        path: "/teamView",
        main: () => <TeamView/>,
        name: 'Team View',
        link_name: 'teamView',
        class_name: 'team-view'
    },
    {
        path: "/departments",
        main: () => <Departments/>,
        name: 'Departments',
        link_name: 'departments',
        class_name: 'departments'
    },
    {
        path: "/designations",
        main: () => <Designations/>,
        name: 'Designations',
        link_name: 'designations',
        class_name: 'designations'
    }
];

class UserConsoleView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            creationPopUpVisibility: false,
            creationPopUpData: {
                type: "circles", //type of dropdown
                name: "", //name of the item selected
                typeName: "Circle", //used this for showing heading and few more props of popup
                id: "", // id of the user on which has been clicked
                mode: "setting", //checking if user has clicked on setting or add icon [input box will have default value if "setting"]
                popUpType: ""  // according to this we will change different types of popup ui and fn
            },
            creationPopUpInputData: "",
            fieldPopUpSelectData: "drop down",
            fieldPopUpSwitchData: false,
            parentNodeSwitchData:false,

        }

        this.customDropdownData = [
            {
                type: "circles",
                searchPlaceHolder: "Search Circles",
                headingName: "Circles",
            }, {
                type: "fields",
                searchPlaceHolder: "Search Fields",
                headingName: "Custom Fields",
            }
        ]
    }

    componentDidMount() {
        this.props.createActiveLink(window.location.pathname.substr(1))
        this.props.getCirclesData()
        this.props.getCustomFields()
        this.props.getLoginSessionData()
    }

    dropDownSettingAction = (data, type) => { //onCLick of setting icon of header in dropdown
        const creationPopUpData = {
            type,
            typeName: type === "circles" ? "Circle" : "Field",
            name: data.name,
            fixedName: data.name,
            id: data._id,
            mode: "setting", // will have default value in input box 
            popUpType: type === "circles" ? "" : "edit" // if empty("") normal pop will be openend else custom field pop up will open
        }

        this.setState({
            creationPopUpVisibility: true,
            creationPopUpData,
            creationPopUpInputData: data.name,
            fieldPopUpSelectData: data.type || "drop down",
            fieldPopUpSwitchData: data.required
        })
    }

    creationPopUpInput = (e) => {
        const {creationPopUpData} = this.state
        const inputData = e.target.value
        this.setState({
            creationPopUpInputData: inputData,
            creationPopUpData: {...creationPopUpData, name: inputData ? creationPopUpData.name : ""}
        })
    }

    onSaveCreationPopUp = async (type) => {
        const {creationPopUpInputData, creationPopUpData, fieldPopUpSelectData, fieldPopUpSwitchData} = this.state
        const popUpMode = creationPopUpData.mode // type of pop which is opening 
        const popUpDataType = creationPopUpData.type
        const finalDataCircle = {name: creationPopUpInputData}
        const finalDataField = {
            name: creationPopUpInputData,
            type: fieldPopUpSelectData,
            required: fieldPopUpSwitchData,
            parent_enabled: false
        }


        if (popUpMode === "setting") {
            await this.props.patchCommonCreateData(popUpDataType === "fields" ? "nodes" : popUpDataType, creationPopUpData.id, popUpDataType === "fields" ? finalDataField : finalDataCircle)
        } else {
            await this.props.postCommonCreateData(popUpDataType === "fields" ? "nodes" : popUpDataType, popUpDataType === "fields" ? finalDataField : finalDataCircle)
        }
        const {patchDataCreatedSuccessfully, patchSuccessMessage, errorMsg, newDataCreatedSuccessfully} = this.props.commonReducer
        if (popUpMode === "setting" ? patchDataCreatedSuccessfully : newDataCreatedSuccessfully) {// will be true if success is true from above patch / post api and pop up will be closed
            message.success(popUpMode === "setting" ? "Saved Successfully" : "Created Successfully")
            this.setState({creationPopUpVisibility: false})
            this.props.commonActionForCommonReducer({
                patchDataCreatedSuccessfully: false,
                newDataCreatedSuccessfully: false
            })
            popUpDataType === "circles" ? this.props.getCirclesData() : this.props.getCustomFields()
        } else {
            message.error(errorMsg);
        }
    }


    onSinglePanelClick = (data, type) => { //Onclick of items of dropdown panel
        if (type === "circles") { //making url change acording to type of dropdown
            this.props.history.push(`/people/circle/${data._id}`)
        } else {
            const initialUniqueTableHeadingId = data.fields[0]._id
            this.props.history.push(`/people/field/${data._id}`, {uniqueTableHeadingId: initialUniqueTableHeadingId})
        }
    }

    createActiveLink = (route) => {
        this.props.createActiveLink(route.link_name)
    }

    onClickAdd = (type) => { //if click plus(add) icon of the dropdown Header making changes in the pop up data
        const creationPopUpData = {
            type,
            typeName: type === "circles" ? "New Circle" : "New Custom Field",
            mode: "add", //will be opened with empty value in input box
            popUpType: type === "circles" ? "" : "add" // if empty normal pop up will open and else it will open for custom fields
        }
        this.setState({creationPopUpVisibility: true, creationPopUpData})
    }


    customFieldPopUpSelectAndSwitchData = (data, type) => {
        if (type === "select") {
            const fieldPopUpSelectData = data === "single_select" ? "drop down" : "multi select"
            this.setState({fieldPopUpSelectData})
        } else {
            this.setState({fieldPopUpSwitchData: data})
        }

    }

    onDeleteConfirmClick = async (panelData, panelType) => {
        const changeType = panelType === "fields" ? "nodes" : "circles"
        await this.props.postCommonDelete(changeType, {[changeType]: [panelData._id]})
        const {postDeletedDataSuccessfulMessage, postDeletedDataSuccessfully, errorMsg} = this.props.commonReducer
        if (postDeletedDataSuccessfully) {
            message.success(postDeletedDataSuccessfulMessage)
            panelType === "circles" ? this.props.getCirclesData() : this.props.getCustomFields()
            this.props.commonActionForCommonReducer({postDeletedDataSuccessfully: false})

            //checking if the open view is of the deliting fields or circles...
            //if it is then after deleting we are deriecting them to console page
            const currentUrl = this.props.history.location
            const currentUrlDataArray = currentUrl.pathname.split("/")
            if (currentUrlDataArray.includes(panelData._id)) this.props.history.push("/people/console")

        } else {
            message.error(errorMsg)
        }

    }

    creationPopUpFourthFieldChangeHandler = (data) => {
        if(data){
            this.props.commonUserConsoleAction({parentNodeSwitch : true})
            this.props.getParentNodeOptionsData()
        }
        this.setState({parentNodeSwitchData: data})
    }

    render() {
        const {activeLinkName} = this.props.firstReducer
        const {circlesData, customFieldsData,parentNodeOptions,parentNodeSwitch} = this.props.userConsoleMainReducer
        console.log(parentNodeOptions)
        const {creationPopUpVisibility, creationPopUpData, creationPopUpInputData} = this.state
        return (
            <div className={'user-console-view'}>
                <div className={'user-console-view-wrap'}>
                    <div className={'left-panel'}>
                        <div className={'people'}>People</div>
                        <div className={'nav-link-wrap'}>
                            {routes.map((route, index) => (
                                <NavLink
                                    to={`/people${route.path}`}
                                    className={`nav-link ${activeLinkName === route.link_name ? `link-active ${route.class_name}-link-active` : `list-item ${route.class_name}-link`}`}
                                    key={index}
                                    activeClassName={`${route.class_name}-link-active nav-link-active`}
                                    onClick={() => this.createActiveLink(route)}>{route.name}
                                </NavLink>
                            ))}
                        </div>

                        <div>

                        </div>
                        {this.customDropdownData.map(singleData => (
                            <CustomDropdown panelDataype={singleData.type}
                                            searchPlaceHolder={singleData.searchPlaceHolder}
                                            panelData={singleData.type === "circles" ? circlesData : customFieldsData}
                                            onSinglePanelClick={(data) => this.onSinglePanelClick(data, singleData.type)}
                                            headingName={singleData.headingName}
                                            onClickSetting={(data) => this.dropDownSettingAction(data, singleData.type)}
                                            onClickAdd={() => this.onClickAdd(singleData.type)}
                                            onDeleteConfirmClick={(data) => this.onDeleteConfirmClick(data, singleData.type)}
                            />
                        ))
                        }

                        <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                                       creationPopUpTitle={`${creationPopUpData.mode === "setting" ? "Edit" : "Add"} ${creationPopUpData.typeName}`}
                                       creationPopFirstButtonName={"Cancel"}
                                       creationPopSecondButtonName={"Save"}
                                       inputValue={creationPopUpInputData || creationPopUpData.name}
                                       creationPopFirstButtonHandler={() => this.setState({creationPopUpVisibility: false})}
                                       creationPopSecondButtonHandler={() => this.onSaveCreationPopUp(creationPopUpData.type)}
                                       secondButtonDisable={creationPopUpInputData.length < 3 || creationPopUpInputData === creationPopUpData.fixedName ? true : false}
                                       afterClose={() => this.setState({
                                           creationPopUpInputData: "",
                                           fieldPopUpSwitchData: false,
                                           fieldPopUpSelectData: "drop down"
                                       })}
                                       creationPopUpFirstFieldChangeHandler={this.creationPopUpInput}
                                       fieldHeader={`${creationPopUpData.typeName} Name`}
                                       fieldPlaceHolder={`Enter ${creationPopUpData.typeName} Name`}
                                       customField={creationPopUpData.popUpType}
                                       creationPopUpSecondFieldChangeHandler={(data) => this.customFieldPopUpSelectAndSwitchData(data, "select")}
                                       creationPopUpThirdFieldChangeHandler={(data) => this.customFieldPopUpSelectAndSwitchData(data, "switch")}
                                       requiredCheckValue={this.state.fieldPopUpSwitchData}
                                       typeDropDownSelectedValue={this.state.fieldPopUpSelectData}
                                       creationPopUpFourthFieldChangeHandler={this.creationPopUpFourthFieldChangeHandler}
                                       parentNodeCheckValue={this.state.parentNodeSwitchData}
                                       parentNodeSwitch={parentNodeSwitch}
                                       parentNodeOptions={parentNodeOptions}


                        />


                    </div>

                    <div className={'route-wrap'}>
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={`/people${route.path}`}
                                    exact={route.exact}
                                    component={route.main}
                                />

                            ))}
                            <Route exact path={["/people", "/people/circle", "/people/field"]}>
                                <Redirect to={"/people/console"}/>
                            </Route>
                            <Route exact path={"/people/designation"}>
                                <Redirect to={"/people/designations"}/>
                            </Route>

                            <Route exact path={"/people/console"} component={Console}/>
                            <Route exact path={"/people/departments"} component={Departments}/>
                            <Route exact path={"/people/designations"} component={Designations}/>
                            <Route exact path={"/people/circle/:id"}
                                   children={<CommonSingleOpenView viewType="circles"/>}/>
                            <Route exact path={"/people/field/:id/:id"}
                                   children={<CommonSingleOpenView viewType="nodes"/>}/>
                            <Route exact path={"/people/field/:id/"} component={FieldOpenView}/>
                            <Route exact path={"/people/department/:id"}
                                   children={<CommonSingleOpenView viewType="departments"/>}/>
                            <Route exact path={"/people/designation/:id"}
                                   children={<CommonSingleOpenView viewType="designations"/>}/>
                        </Switch>
                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        firstReducer: state.firstReducer,
        userConsoleMainReducer: state.userConsoleMainReducer,
        commonReducer: state.commonReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUserData,
            createActiveLink,
            getCirclesData,
            getCustomFields,
            getDeptTableColumnData,
            commonDepartmentAction,
            getTableColumnsData,
            getAddSelectedUsersPostedData,
            getDepartmentData,
            patchCommonCreateData,
            commonActionForCommonReducer,
            getLoginSessionData,
            postCommonCreateData,
            postCommonDelete,getParentNodeOptionsData,commonUserConsoleAction
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserConsoleView))



