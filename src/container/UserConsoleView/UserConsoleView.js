import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    getUserData,
    createActiveLink,
    getCirclesData,
    getCustomFields
} from '../../store/actions/actions'
import Console from '../../components/console/Console'
import TeamView from '../../components/teamView/TeamView'
import Departments from '../../components/departments/Departments'
import Designations from '../../components/designations/designations'
import CustomDropdown from '../../components/common/CustomDropdown/customDropdown'
import CreationPopUp from '../../components/common/CreationPopUp/CreationPopUp'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
} from "react-router-dom";
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
    },
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


    onSinglePanelClick = (data, type) => {
        if (type === "circles") {
            console.log(data, "circles")
        } else {
            console.log(data, "fields")
        }
    }

    dropDownAction = (data, type) => {
        const creationPopUpData = {
            type,
            typeName: type === "circles" ? "Circle" : "Field",
            name: data.name,
            fixedName: data.name
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

    onSaveCreationPopUp = (type) => {
        if (type === "circles") {
            console.log("circles saved")
        } else {
            console.log("fields saved")
        }
        this.setState({
            creationPopUpVisibility: false
        })
    }

    render() {

        const { activeLinkName } = this.props.firstReducer
        const { circlesData, customFieldsData } = this.props.userConsoleMainReducer
        const { creationPopUpVisibility, creationPopUpData, creationPopUpInputData } = this.state
        return (
            <div className={'user-console-view'}>
                <Router>
                    <div className={'user-console-view-wrap'}>
                        <div className={'left-panel'}>
                            <div className={'people'}>People</div>
                            <div className={'nav-link-wrap'}>
                                {routes.map((route, index) => (
                                    <NavLink
                                        to={`/people${route.path}`}
                                        className={`nav-link ${activeLinkName === route.link_name ? `link-active ${route.class_name}-link-active` : `list-item ${route.class_name}-link`}`}
                                        key={index}
                                        activeClassName={'nav-link-active'}
                                        onClick={() => this.props.createActiveLink(route.link_name)}>{route.name}
                                    </NavLink>
                                ))}
                            </div>

                            {this.customDropdownData.map(singleData => (
                                <CustomDropdown panelDataype={singleData.type} searchPlaceHolder={singleData.searchPlaceHolder} panelData={singleData.type === "circles" ? circlesData : customFieldsData}
                                    onSinglePanelClick={(data) => this.onSinglePanelClick(data, singleData.type)} headingName={singleData.headingName} onClickSetting={(data) => this.dropDownAction(data, singleData.type)}
                                />
                            ))
                            }

                            <CreationPopUp creationPopUpVisibility={creationPopUpVisibility}
                                creationPopUpTitle={`Edit ${creationPopUpData.typeName}`}
                                creationPopFirstButtonName={"Cancel"}
                                creationPopSecondButtonName={"Save"}
                                inputValue={creationPopUpInputData || creationPopUpData.name}
                                creationPopFirstButtonHandler={() => this.setState({ creationPopUpVisibility: false })}
                                creationPopSecondButtonHandler={() => this.onSaveCreationPopUp(creationPopUpData.type)}
                                secondButtonDisable={!creationPopUpInputData || creationPopUpInputData === creationPopUpData.fixedName ? true : false}
                                afterClose={() => this.setState({ creationPopUpInputData: "" })}
                                creationPopUpFirstFieldChangeHandler={this.creationPopUpInput}
                                fieldHeader={`${creationPopUpData.typeName} Name`}
                                fieldPlaceHolder={`Enter ${creationPopUpData.typeName} Name`}
                            />


                        </div>

                        <div className={'route-wrap'}>
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={`/people${route.path}`}
                                        exact={route.exact}
                                        children={<route.main />}
                                    />
                                ))}
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        firstReducer: state.firstReducer,
        userConsoleMainReducer: state.userConsoleMainReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUserData,
            createActiveLink,
            getCirclesData,
            getCustomFields
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConsoleView);


