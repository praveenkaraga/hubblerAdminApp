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


// this component is being used in below main parent component only

//In this Component we have search and plus icon with animating search bar
class AnimationSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchActive: false
        }
    }


    // on Click of Search and cross icon on each collapse panel header
    // triggering serch if "status" true and trggering cross button if false
    onClickSearch = (event, status) => {
        this.stopEvent(event)
        if (!status) { //on pressing cross button removing all the input data
            this.props.onDropdownSearch({ target: { value: "" } })
            this.panelSearchInput.state.value = ""
            this.props.changeState()
        }
        this.setState({ searchActive: status }) //according to status value we are handeling visibility of search bar
    }


    stopEvent = (event) => {
        if (this.props.collapseStatus) event.stopPropagation() //checking if collapse is open then applying  
    }

    onClickPlusIcon = (event) => { // on Click of plus icon we are just checking if props id there
        event.stopPropagation()
        if (this.props.onClickAdd) this.props.onClickAdd()//checking if prop is being is passed or not
    }


    render() {
        const { searchActive } = this.state
        const { searchPlaceHolder, headingName, onDropdownSearch } = this.props


        return (
            <div className="animationSearch_main">
                <div className={`animationSearch_container ${!searchActive ? "animationSearch_container_active" : "animationSearch_container_inactive"}`}>
                    <div className="animationSearch_heading">{headingName}</div>
                    <div className="search_and_plus">
                        <div className="search_icon" onClick={(e) => this.onClickSearch(e, true)}></div>
                        <div className="plus_icon" onClick={this.onClickPlusIcon}></div>
                    </div>
                </div>
                <div className={`input_main ${searchActive ? "input_main_active" : "input_main_inactive"}`}> {/*if searchActive true then only show search bar */}
                    <div className="input_container" onClick={this.stopEvent}>
                        <Input ref={ele => this.panelSearchInput = ele} placeholder={searchPlaceHolder} onChange={onDropdownSearch} />
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
            popConfirmActive: false,
            panelWithPopActive: "",
            localSearchData: ""
        }
    }

    collapseChange = (key) => { //checking if the current panel is close or open
        const status = key.length ? true : false //it gives us as array so er are saving as boolean on our side...
        this.setState({ activeCollapse: status })
    }


    onSelectingPanelData = (data) => { //on selection of each panel data
        if (this.props.onSinglePanelClick) this.props.onSinglePanelClick(data)
    }


    //this fn is being triggered on click of gear or delete icon
    // in "type" we get "setting" for gear icon click and "delete" for delete icon
    actionButtonsClick = (event, type, data) => {
        event.stopPropagation()
        const finalProp = type === "settings" ? this.props.onClickSetting : this.props.onClickDelete //assigning different prop according to type
        if (finalProp) finalProp(data) //checking if prop is being is passed or not
    }

    onLocalSearch = (e) => {
        const searchData = e.target.value || ""
        const { onSearch } = this.props

        //performing a local search on the data
        // const filteredData = panelData.filter(data => {
        //     let str = data.name.toUpperCase() //converting all incoming data  to capital
        //     let searchDataCap = searchData.toUpperCase() //converting search data  to capital
        //     return str.search(searchDataCap) !== -1 //returning all the matched data
        // })
        if (onSearch) onSearch(searchData) //checking if prop is being is passed or not

        this.setState({ localSearchData: searchData }) // saving no data when search is empty to handle empty data from api when search is done

    }


    onVisibleChange = (status, id) => { //this fn is triggered on visibility change of Popover
        this.setState({
            popConfirmActive: status,
            panelWithPopActive: id
        })
    }



    //on Click of Confirm or Cancel
    // type will have "confirm" or "cancel"
    confirmOrCancel = (event, data, type) => {
        event.stopPropagation()
        const finalProp = type === "confirm" ? this.props.onDeleteConfirmClick : this.props.onDeleteCancelClick //assigning different prop according to type
        if (finalProp) finalProp(data) //checking if prop is being is passed or not
    }

    changeState = () => { // making empty string when clicked cross icon
        this.setState({ localSearchData: "" })
    }

    render() {
        const { activeCollapse, localSearchData, popConfirmActive, panelWithPopActive } = this.state
        const { panelDataype, panelData, popUpConfirmButtonName = "Confirm",
            popUpCancelButtonName = "Cancel", defaultActivePanelKey, panelKey, activeDataOfPanelId } = this.props
        return (
            <div className="custom_dropdown_main">

                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                    onChange={this.collapseChange}
                    // activeKey={"circles"}
                    defaultActiveKey={defaultActivePanelKey}
                >
                    <Panel disabled={panelData.length ? false : true} header={<AnimationSearch collapseStatus={activeCollapse} onDropdownSearch={this.onLocalSearch} {...this.props} changeState={this.changeState} />} key={panelKey} style={customPanelStyle}>
                        {localSearchData !== "nodata" && panelData.length ?
                            panelData.map(data => (
                                <div className={`panelSingleData ${data._id == activeDataOfPanelId ? "panelSingleDataActive" : ""}`} onClick={() => this.onSelectingPanelData(data)}>
                                    <div className={`dataImage ${panelDataype === "circles" ? "circleDataImage" : "customDataImage"}`}></div>
                                    <div className="singleDataName">

                                        <p className="name">{data.name}</p>

                                        <div className={data._id === panelWithPopActive && popConfirmActive ? "action_buttons_active" : "action_buttons"}>
                                            <img className="setting_icon" src={require("../../../images/svg/settings_grey.svg")} onClick={(e) => this.actionButtonsClick(e, "settings", data)} alt="setting" />
                                            <Popconfirm
                                                title={<p>Are you sure want to delete: <span className="name">{data.name}</span></p>}
                                                onConfirm={(event) => this.confirmOrCancel(event, data, "confirm")}
                                                onCancel={(event) => this.confirmOrCancel(event, data, "cancel")}
                                                okText={popUpConfirmButtonName}
                                                cancelText={popUpCancelButtonName}
                                                onVisibleChange={(status) => this.onVisibleChange(status, data._id)}
                                                overlayClassName="deletePopUp"
                                            >
                                                <img className="delete_icon" src={require("../../../images/svg/delete_red.svg")} onClick={(e) => this.actionButtonsClick(e, "delete", data)} alt="delete" />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                            ))

                            : <div className="no_match">No Data</div>}
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default CustomDropdown;

