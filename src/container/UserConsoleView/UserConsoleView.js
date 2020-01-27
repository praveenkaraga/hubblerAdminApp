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
    commonActionForCommonReducer
} from '../../store/actions/actions'
import Console from '../../components/console/Console'
import TeamView from '../../components/teamView/TeamView'
import Departments from '../../components/departments/Departments'
import Designations from '../../components/designations/designations'
import CustomDropdown from '../../components/common/CustomDropdown/customDropdown'
import CreationPopUp from '../../components/common/CreationPopUp/CreationPopUp'
import CircleOpenView from '../../components/nodeOpenView/circleOpenView'
import FieldOpenView from '../../components/nodeOpenView/fieldOpenView'
import DesignationOpenView from '../../components/nodeOpenView/designationOpenView'
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
                type: "circles",
                name: "",
                typeName: "Circle",
                id: ""
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
    }

    dropDownSettingAction = (data, type) => {
        const creationPopUpData = {
            type,
            typeName: type === "circles" ? "Circle" : "Field",
            name: data.name,
            fixedName: data.name,
            id: data._id
        }
        this.setState({creationPopUpVisibility: true, creationPopUpData, creationPopUpInputData: data.name})
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
        const {creationPopUpInputData, creationPopUpData} = this.state
        await this.props.patchCommonCreateData("circles", creationPopUpData.id, {name: creationPopUpInputData})
        const {patchDataCreatedSuccessfully, patchSuccessMessage, errorMsg} = this.props.commonReducer // will be true if success is true from above patch api and pop up will be closed
        if (patchDataCreatedSuccessfully) {
            message.success(patchSuccessMessage)
            this.setState({creationPopUpVisibility: false})
            this.props.commonActionForCommonReducer({patchDataCreatedSuccessfully: false})
            this.props.getCirclesData()
        } else {
            message.error(errorMsg);
        }
    }

    onSinglePanelClick = (data, type) => {
        if (type === "circles") {
            this.props.history.push(`/people/circle/${data._id}`)
        } else {
            this.props.history.push(`/people/field/${data._id}`)
        }
    }

    createActiveLink = (route) => {
        this.props.createActiveLink(route.link_name)

    }

    render() {
        const {activeLinkName} = this.props.firstReducer
        const {circlesData, customFieldsData} = this.props.userConsoleMainReducer
        const {creationPopUpVisibility, creationPopUpData, creationPopUpInputData} = this.state
        console.log(this.props.history)
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
                            />
                        ))
                        }

                        <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                                       creationPopUpTitle={`Edit ${creationPopUpData.typeName}`}
                                       creationPopFirstButtonName={"Cancel"}
                                       creationPopSecondButtonName={"Save"}
                                       inputValue={creationPopUpInputData || creationPopUpData.name}
                                       creationPopFirstButtonHandler={() => this.setState({creationPopUpVisibility: false})}
                                       creationPopSecondButtonHandler={() => this.onSaveCreationPopUp(creationPopUpData.type)}
                                       secondButtonDisable={!creationPopUpInputData || creationPopUpInputData === creationPopUpData.fixedName ? true : false}
                                       afterClose={() => this.setState({creationPopUpInputData: ""})}
                                       creationPopUpFirstFieldChangeHandler={this.creationPopUpInput}
                                       fieldHeader={`${creationPopUpData.typeName} Name`}
                                       fieldPlaceHolder={`Enter ${creationPopUpData.typeName} Name`}
                                       customField={creationPopUpData.type === "circles" ? "" : "edit"}
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
                            <Route exact path={"/people"}>
                                <Redirect to={"/people/console"}/>
                            </Route>
                            <Route exact path={"/people/circle"}>
                                <Redirect to={"/people/console"}/>
                            </Route>
                            <Route exact path={"/people/designation"}>
                                <Redirect to={"/people/designations"}/>
                            </Route>

                            <Route exact path={"/people/console"} component={Console}/>
                            <Route exact path={"/people/departments"} component={Departments}/>
                            <Route exact path={"/people/designations"} component={Designations}/>
                            <Route exact path={"/people/circle/:id"} component={CircleOpenView}/>
                            <Route exact path={"/people/field/:id"} component={FieldOpenView}/>
                            <Route exact path={"/people/department/:id"} children={<ChangeViewRouting/>}/>
                            <Route exact path={"/people/designation/:id"} component={DesignationOpenView}/>
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
            commonActionForCommonReducer
        },
        dispatch
    );
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserConsoleView))



