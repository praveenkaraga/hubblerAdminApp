import React, { Component } from 'react';
import './customDropdown.scss'
import { Collapse, Icon, Input, Popconfirm, message } from 'antd';

const { Panel } = Collapse;

const customPanelStyle = {
    background: '#fff',
    borderRadius: 4,
    border: 0,
    overflow: 'hidden',
}


class AnimationSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchActive: false
        }
    }

    onClickSearch = (event, status) => {
        this.stopEvent(event)
        if (!status) {
            this.props.onLocalSearch({ target: { value: "" } })
            this.panelSearchInput.state.value = ""
        }
        this.setState({ searchActive: status })
    }


    stopEvent = (event) => {
        if (this.props.collapseStatus) {
            event.stopPropagation()
        }
    }

    onClickPlusIcon = (event) => {
        event.stopPropagation()
        if (this.props.onClickAdd) {
            this.props.onClickAdd()
        }
    }


    render() {
        const { searchActive } = this.state
        const { searchPlaceHolder, headingName, onLocalSearch } = this.props


        return (
            <div className="animationSearch_main">
                <div className={`animationSearch_container ${!searchActive ? "animationSearch_container_active" : "animationSearch_container_inactive"}`}>
                    <div className="animationSearch_heading">{headingName}</div>
                    <div className="search_and_plus">
                        <div className="search_icon" onClick={(e) => this.onClickSearch(e, true)}></div>
                        <div className="plus_icon" onClick={this.onClickPlusIcon}></div>
                    </div>
                </div>
                <div className={`input_main ${searchActive ? "input_main_active" : "input_main_inactive"}`}>
                    <div className="input_container" onClick={this.stopEvent}>
                        <Input ref={ele => this.panelSearchInput = ele} placeholder={searchPlaceHolder} onChange={onLocalSearch} />
                        <div className="cross_icon" onClick={(e) => this.onClickSearch(e, false)}></div>
                    </div>
                </div>

            </div>
        );
    }
}





class CustomDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCollapse: false,
            panelDataActive: "",
            localPanelData: [],
            popConfirmActive: false,
            panelWithPopActive: ""
        }
    }

    collapseChange = (key) => {
        const status = key.length ? true : false
        this.setState({ activeCollapse: status })
    }


    onSlectingPanelData = (data) => {
        this.props.onSinglePanelClick(data)
        this.setState({ panelDataActive: data._id })
    }

    actionButtonsClick = (event, type, data) => {
        event.stopPropagation()
        if (type === "settings") {
            if (this.props.onClickSetting) {
                this.props.onClickSetting(data)
            }
        } else {
            if (this.props.onClickDelete) {
                this.props.onClickDelete(data)
            }
        }
    }

    onLocalSearch = (e) => {
        const searchData = e.target.value || ""
        const { panelData, onSearch } = this.props
        const filteredData = panelData.filter(data => {
            let str = data.name.toUpperCase()
            let searchDataCap = searchData.toUpperCase()
            return str.search(searchDataCap) !== -1
        })
        if (onSearch) {
            onSearch(searchData)
        }

        this.setState({ localPanelData: filteredData.length ? filteredData : "noData" })

    }

    confirm = (event) => {
        event.stopPropagation()
    }

    onVisibleChange = (status, id) => {
        this.setState({
            popConfirmActive: status,
            panelWithPopActive: id
        })
    }

    render() {
        const { activeCollapse, panelDataActive, localPanelData, popConfirmActive, panelWithPopActive } = this.state
        const { panelDataype, panelData, onDeleteConfirmClick = this.confirm, onDeleteCancelClick = this.confirm, popUpConfirmButtonName = "Confirm",
            popUpCancelButtonName = "Cancel" } = this.props
        const finalMapData = localPanelData.length ? localPanelData : panelData
        return (
            <div className="custom_dropdown_main">

                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                    onChange={this.collapseChange}
                >
                    <Panel disabled={panelData.length ? false : true} header={<AnimationSearch collapseStatus={activeCollapse} onLocalSearch={this.onLocalSearch} {...this.props} />} key="1" style={customPanelStyle}>
                        {!(finalMapData === "noData") ?
                            finalMapData.map(data => (
                                <div className={`panelSingleData ${data._id === panelDataActive ? "panelSingleDataActive" : ""}`} onClick={() => this.onSlectingPanelData(data)}>
                                    <div className={`dataImage ${panelDataype === "circles" ? "circleDataImage" : "customDataImage"}`}></div>
                                    <div className="singleDataName">

                                        <p className="name">{data.name}</p>

                                        <div className={data._id === panelWithPopActive && popConfirmActive ? "action_buttons_active" : "action_buttons"}>
                                            <img className="setting_icon" src={require("../../../images/svg/settings_grey.svg")} onClick={(e) => this.actionButtonsClick(e, "settings", data)} alt="setting" />
                                            <Popconfirm
                                                title={<p>Are you sure want to delete: <span className="name">{data.name}</span></p>}
                                                onConfirm={onDeleteConfirmClick}
                                                onCancel={onDeleteCancelClick}
                                                okText={popUpConfirmButtonName}
                                                cancelText={popUpCancelButtonName}
                                                onVisibleChange={(status) => this.onVisibleChange(status, data._id)}
                                                overlayClassName="deletePopUp"
                                            // onClick={event => event.stopPropagation()}
                                            >
                                                <img className="delete_icon" src={require("../../../images/svg/delete_red.svg")} onClick={(e) => this.actionButtonsClick(e, "delete", data)} alt="delete" />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                            ))

                            : <div className="no_match">No Match Found</div>}
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default CustomDropdown;

