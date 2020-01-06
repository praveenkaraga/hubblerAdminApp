import React, { Component } from 'react';
import './customDropdown.scss'
import { Collapse, Icon, Input } from 'antd';

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


    render() {
        const { searchActive } = this.state
        const { searchPlaceHolder, headingName, onLocalSearch } = this.props


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
            localPanelData: []
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

    actionButtonsClick = (event, type) => {
        event.stopPropagation()
        if (type === "settings") {
            console.log("set")
        } else {
            console.log("del")
        }
    }

    onLocalSearch = (e) => {
        const searchData = e.target.value || ""
        const { panelData } = this.props
        const filteredData = panelData.filter(data => {
            let str = data.name.toUpperCase()
            let searchDataCap = searchData.toUpperCase()
            return str.search(searchDataCap) !== -1
        })

        this.setState({ localPanelData: filteredData.length ? filteredData : "noData" })

    }

    render() {
        const { activeCollapse, panelDataActive, localPanelData } = this.state
        const { panelDataype, panelData } = this.props
        const finalMapData = localPanelData.length ? localPanelData : panelData
        return (
            <div className="custom_dropdown_main">

                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                    onChange={this.collapseChange}
                >
                    <Panel header={<AnimationSearch collapseStatus={activeCollapse} onLocalSearch={this.onLocalSearch} {...this.props} />} key="1" style={customPanelStyle} >
                        {!(finalMapData === "noData") ?


                            finalMapData.map(data => (
                                <div className={`panelSingleData ${data._id === panelDataActive ? "panelSingleDataActive" : ""}`} onClick={() => this.onSlectingPanelData(data)}>
                                    <div className={`dataImage ${panelDataype === "circles" ? "circleDataImage" : "customDataImage"}`}></div>
                                    <div className="singleDataName">
                                        <p className="name">{data.name}</p>
                                        <div className="action_buttons">
                                            <img className="setting_icon" src={require("../../../images/svg/settings_grey.svg")} onClick={(e) => this.actionButtonsClick(e, "settings")} alt="setting" />
                                            <img className="delete_icon" src={require("../../../images/svg/delete_red.svg")} onClick={(e) => this.actionButtonsClick(e, "delete")} alt="delete" />
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

