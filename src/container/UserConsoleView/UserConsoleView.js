import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
    getLoginSessionData
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
import { message } from 'antd'
import './userConsoleView.scss'

const routes = [
    {
        path: "/console",
        exact: true,
        main: () => <Console />,
        name: 'Console',
        link_name: 'console',
        class_name: 'console'
    },
    {
        path: "/teamView",
        main: () => <TeamView />,
        name: 'Team View',
        link_name: 'teamView',
        class_name: 'team-view'
    },
    {
        path: "/departments",
        main: () => <Departments />,
        name: 'Departments',
        link_name: 'departments',
        class_name: 'departments'
    },
    {
        path: "/designations",
        main: () => <Designations />,
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
            creationPopUpInputData: ""
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
            popUpType: type === "circles" ? "" : "edit" // if empty("") normal pop will be openend else custom filed pop up will open
        }
        this.setState({ creationPopUpVisibility: true, creationPopUpData, creationPopUpInputData: data.name })
    }

    creationPopUpInput = (e) => {
        const { creationPopUpData } = this.state
        const inputData = e.target.value
        this.setState({
            creationPopUpInputData: inputData,
            creationPopUpData: { ...creationPopUpData, name: inputData ? creationPopUpData.name : "" }
        })
    }

    onSaveCreationPopUp = async (type) => {
        const { creationPopUpInputData, creationPopUpData } = this.state
        await this.props.patchCommonCreateData(creationPopUpData.type, creationPopUpData.id, { name: creationPopUpInputData })
        const { patchDataCreatedSuccessfully, patchSuccessMessage, errorMsg } = this.props.commonReducer
        if (patchDataCreatedSuccessfully) {// will be true if success is true from above patch api and pop up will be closed
            message.success(patchSuccessMessage)
            this.setState({ creationPopUpVisibility: false })
            this.props.commonActionForCommonReducer({ patchDataCreatedSuccessfully: false })
            if (creationPopUpData.type === "circles") {
                this.props.getCirclesData()
            } else {
                this.props.getCustomFields()
            }
        } else {
            message.error(errorMsg);
        }
    }

    onSinglePanelClick = (data, type) => { //Onclick of items of dropdown panel
        if (type === "circles") { //making url change acording to type of dropdown
            this.props.history.push(`/people/circle/${data._id}`)
        } else {
            const initialUniqueTableHeadingId = data.fields[0]._id
            this.props.history.push(`/people/field/${data._id}`, { uniqueTableHeadingId: initialUniqueTableHeadingId })
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
        this.setState({ creationPopUpVisibility: true, creationPopUpData })
    }

    render() {
        const { activeLinkName } = this.props.firstReducer
        const { circlesData, customFieldsData } = this.props.userConsoleMainReducer
        const { creationPopUpVisibility, creationPopUpData, creationPopUpInputData } = this.state
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
                            <CustomDropdown panelDataype={singleData.type} searchPlaceHolder={singleData.searchPlaceHolder} panelData={singleData.type === "circles" ? circlesData : customFieldsData}
                                onSinglePanelClick={(data) => this.onSinglePanelClick(data, singleData.type)} headingName={singleData.headingName} onClickSetting={(data) => this.dropDownSettingAction(data, singleData.type)}
                                onClickAdd={() => this.onClickAdd(singleData.type)}
                            />
                        ))
                        }

                        <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                            creationPopUpTitle={`${creationPopUpData.mode === "setting" ? "Edit" : "Add"} ${creationPopUpData.typeName}`}
                            creationPopFirstButtonName={"Cancel"}
                            creationPopSecondButtonName={"Save"}
                            inputValue={creationPopUpInputData || creationPopUpData.name}
                            creationPopFirstButtonHandler={() => this.setState({ creationPopUpVisibility: false })}
                            creationPopSecondButtonHandler={() => this.onSaveCreationPopUp(creationPopUpData.type)}
                            secondButtonDisable={creationPopUpInputData.length < 3 || creationPopUpInputData === creationPopUpData.fixedName ? true : false}
                            afterClose={() => this.setState({ creationPopUpInputData: "" })}
                            creationPopUpFirstFieldChangeHandler={this.creationPopUpInput}
                            fieldHeader={`${creationPopUpData.typeName} Name`}
                            fieldPlaceHolder={`Enter ${creationPopUpData.typeName} Name`}
                            customField={creationPopUpData.popUpType}
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
                                <Redirect to={"/people/console"} />
                            </Route>
                            <Route exact path={"/people/designation"}>
                                <Redirect to={"/people/designations"} />
                            </Route>

                            <Route exact path={"/people/console"} component={Console} />
                            <Route exact path={"/people/departments"} component={Departments} />
                            <Route exact path={"/people/designations"} component={Designations} />
                            <Route exact path={"/people/circle/:id"} children={<CommonSingleOpenView viewType="circles" />} />
                            <Route exact path={"/people/field/:id/:id"} children={<CommonSingleOpenView viewType="nodes" />} />
                            <Route exact path={"/people/field/:id/"} component={FieldOpenView} />
                            <Route exact path={"/people/department/:id"} children={<CommonSingleOpenView viewType="departments" />} />
                            <Route exact path={"/people/designation/:id"} children={<CommonSingleOpenView viewType="designations" />} />
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
            getLoginSessionData
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserConsoleView))



