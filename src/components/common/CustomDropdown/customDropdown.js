import React, { Component } from 'react';
import './customDropdown.scss'
import { Collapse, Icon, Input } from 'antd';

const { Panel } = Collapse;

const customPanelStyle = {
    background: '#fff',
    borderRadius: 4,
    marginBottom: 24,
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
        this.setState({ searchActive: status })
    }


    stopEvent = (event) => {
        if (this.props.collapseStatus) {
            event.stopPropagation()
        }
    }

    render() {
        const { searchActive } = this.state
        const { searchPlaceHolder, headingName, onSearch } = this.props

        return (
            <div className="animationSearch_main">
                <div className={`animationSearch_container ${!searchActive ? "animationSearch_container_active" : "animationSearch_container_inactive"}`}>
                    <div className="animationSearch_heading">{headingName}</div>
                    <div className="search_and_plus">
                        <div className="search_icon" onClick={(e) => this.onClickSearch(e, true)}></div>
                        <div className="plus_icon"></div>
                    </div>
                </div>
                <div className={`input_main ${searchActive ? "input_main_active" : "input_main_inactive"}`}>
                    <div className="input_container" onClick={this.stopEvent}>
                        <Input placeholder={searchPlaceHolder} onChange={onSearch} />
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
            panelDataActive: ""
        }
    }

    collapseChange = (key) => {
        const status = key.length ? true : false
        this.setState({ activeCollapse: status })
    }


    onSlectingPanelData = (data) => {
        this.props.onSinglePanelClick(data)
        this.setState({ panelDataActive: data })
    }

    actionButtonsClick = (event, type) => {
        event.stopPropagation()
        if (type === "settings") {
            console.log("set")
        } else {
            console.log("del")
        }
    }

    render() {
        const { activeCollapse, panelDataActive } = this.state
        const allData = ["ni", "rtree", "fetf", "ffsd"]
        const { panelDataype, onSinglePanelClick } = this.props
        return (
            <div className="custom_dropdown_main">

                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                    onChange={this.collapseChange}
                >
                    <Panel header={<AnimationSearch collapseStatus={activeCollapse} {...this.props} />} key="1" style={customPanelStyle} >
                        {allData.map(data => (<div className={`panelSingleData ${data === panelDataActive ? "panelSingleDataActive" : ""}`} onClick={() => this.onSlectingPanelData(data)}>
                            <div className={`dataImage ${panelDataype === "circle" ? "circleDataImage" : "customDataImage"}`}></div>
                            <div className="singleDataName">
                                <p className="name">{data}</p>
                                <div className="action_buttons">
                                    <img className="setting_icon" src={require("../../../images/svg/settings_grey.svg")} onClick={(e) => this.actionButtonsClick(e, "settings")} />
                                    <img className="delete_icon" src={require("../../../images/svg/delete_red.svg")} onClick={(e) => this.actionButtonsClick(e, "delete")} />
                                </div>
                            </div>
                        </div>))}
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default CustomDropdown;

