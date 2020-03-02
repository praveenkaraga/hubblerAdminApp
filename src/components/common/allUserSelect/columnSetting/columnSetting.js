import React, { Component } from 'react';
import './columnSetting.scss'
import CustomSearch from '../../../common/CustomSearch/customSearch'
import { Checkbox } from 'antd'
import Reorder, { reorder } from "react-reorder";


class ColumnSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnData: this.props.columnData,
            columnDataDraggable: this.props.columnData.filter(data => data.is_draggable), //filtering draggable data 
            columnDataNotDraggable: this.props.columnData.filter(data => !data.is_draggable),//filtering non draggable data 
            checkedList: this.props.columnData.map(data => data._id), //colecting all the pre selected ids
            columnSettingData: this.props.columnSettingData
        }
        this.filterDraggablesData = []
    }

    //reordering the element inside the console column setting
    onReorder = (event, previousIndex, nextIndex) => { //on reordering setting the sata
        let updatedColumnData = reorder(
            this.state.columnDataDraggable,
            previousIndex,
            nextIndex
        );
        this.setState({ columnDataDraggable: updatedColumnData })
    };

    onRemoveColumn = (id) => { //removing column when clicked remove
        const updatedColumn = this.state.columnDataDraggable.filter(data => !(data._id === id)) //filtering the removed column 

        //updating this new removed data to checkedList because we have to remove it from below checkbox also
        const newCheckedList = [...this.state.columnDataNotDraggable.map(data => data._id), ...updatedColumn.map(data => data._id)]
        this.setState({ columnDataDraggable: updatedColumn, checkedList: newCheckedList })
    }


    // onCheckColumn = (checkedValue) => { //on checking and unchecking the checkbox
    //     const { columnSettingFields } = this.props.columnSettingData
    //     const { checkedList, searchData } = this.state

    //     // let checkValue = [...new Set([...checkedList, ...checkedValue])]
    //     // checkValue.filter(data =>  )
    //     // if (searchData) {
    //     //     checkValue = [...new Set([...checkedList, ...checkValue])]

    //     // }
    //     //console.log(checkValue, "checkValue")


    //     //filtering datas
    //     // const filterDraggablesData = this.filterDraggablesAndNonDraggables(columnSettingFields, checkedList, true)
    //     // const filterNonDraggablesData = this.filterDraggablesAndNonDraggables(columnSettingFields, checkedList, false)
    //     // this.setState({ columnDataDraggable: filterDraggablesData, columnDataNotDraggable: filterNonDraggablesData })

    // }



    //filtering all data to draggable and non draggable part on selecting and unselecting
    filterDraggablesAndNonDraggables = (columnSettingData, columnDataIds, type) => { // type is to check whether we wt to filter draggable(true) or non-draggable(false) 
        let filteredData = columnSettingData.filter(data => columnDataIds.includes(data._id)) // filtering all the datas of the selected columns
        let filteredDataDraggableAndNonDraggable = filteredData.filter(data => type ? data.is_draggable : !data.is_draggable) // checking if it is draggable or non-draggable
        return filteredDataDraggableAndNonDraggable
    }



    checkBoxValidation = (checkedList, id) => { //validating all the scenarios for enabling and disablinf the checkboxes
        //if checked length is 6 then user can not add more columns
        //if checked length is 3 then user can not disable or remove more columns
        if ((checkedList.length === 6 && !checkedList.includes(id)) || (checkedList.length < 4 && checkedList.includes(id))) {
            return true
        } else {
            return false
        }
    }

    dataSeparationForDom = (data) => { //creating dom nodes for draggable and non-drabble columns..
        const { columnDataDraggable, columnDataNotDraggable } = this.state
        return (
            data.map(singleColumnData => (
                <div key={singleColumnData._id} className={singleColumnData.is_draggable ? "single_draggable" : "single_notDraggable"} draggable={false}>
                    <div className="column_and_dots">
                        <img className="draggable_dots" src={require("../../../../images/svg/braille-six-dots.svg")} alt="draggable" />
                        <p className="column_name"> {singleColumnData.lbl}</p>
                    </div>
                    {
                        !singleColumnData.required && (columnDataNotDraggable.length + columnDataDraggable.length) > 3 //if selected column length less than 3, cross button will be disabled
                            ? <img className="cross_img" src={require("../../../../images/close-app.svg")} onClick={() => this.onRemoveColumn(singleColumnData._id)} alt="croos-img" />
                            : ""
                    }
                </div>
            ))
        )
    }

    onColumnSetingFinalAction = async (status) => { //performing actions on save and cancel 
        const { columnDataDraggable, columnDataNotDraggable } = this.state
        if (status && this.props.onColumnSettingSave) { //if save is clicked and onColumnSettingSave props is available
            this.props.onColumnSettingSave([...columnDataNotDraggable, ...columnDataDraggable]) //we will give all the required data as argument
        } else { // if cancel is clicked 
            if (this.props.onColumnSettingCancel) this.props.onColumnSettingCancel() //checking if onColumnSettingCancel props is available
            this.setState({ //resetting all the datas on cancel
                columnData: this.props.columnData,
                columnDataDraggable: this.props.columnData.filter(data => data.is_draggable),
                columnDataNotDraggable: this.props.columnData.filter(data => !data.is_draggable),
                checkedList: this.props.columnData.map(data => data._id),
                columnSettingData: this.props.columnSettingData,
                searchData: ""
            })
        }
    }

    onSearch = (searchData) => { // on search of this custom search comp
        const { columnSettingFields } = this.props.columnSettingData
        // if (this.props.onSearchColumnSetting) this.props.onSearchColumnSetting(searchData) // checking for prop

        // performing a local search on the data
        const filteredData = columnSettingFields.filter(data => {
            let str = data.lbl.toUpperCase() //converting all incoming data  to capital
            let searchDataCap = searchData.toUpperCase() //converting search data  to capital
            return str.search(searchDataCap) !== -1 //returning all the matched data
        })

        this.setState({ searchData, filteredSearchData: filteredData })
    }


    singleCheckBoxChange = (e) => { // onclick of single checkbox
        const clickedValue = e.target.value
        let { checkedList } = this.state
        const { columnSettingFields } = this.props.columnSettingData
        const copyData = [...checkedList] // making a shallow  copy of selected checkbox ids
        if (checkedList.includes(clickedValue)) { // checking if id is slready there then remove it and if it is not then add it
            const index = checkedList.indexOf(clickedValue)
            copyData.splice(index, 1)
        } else {
            copyData.push(clickedValue)
        }

        const filterDraggablesData = this.filterDraggablesAndNonDraggables(columnSettingFields, copyData, true) //filtering the draggable data
        const filterNonDraggablesData = this.filterDraggablesAndNonDraggables(columnSettingFields, copyData, false) //filtering the non draggable data
        this.setState({ checkedList: copyData, columnDataDraggable: filterDraggablesData, columnDataNotDraggable: filterNonDraggablesData })

    }

    render() {

        const { columnDataDraggable, columnDataNotDraggable, checkedList, searchData, filteredSearchData } = this.state
        const { columnSettingData } = this.props

        const allCategories = columnSettingData.columnSettingCategories || []
        const allFields = columnSettingData.columnSettingFields || []
        const dataToMap = searchData ? filteredSearchData : allFields // if someone is searching then show searchDta and if empty show the fetched data

        return (
            <div className="column_setting_main">
                <div className="column_setting_main_container">
                    <div className="draggable_part">

                        {this.dataSeparationForDom(columnDataNotDraggable)}

                        <Reorder
                            reorderId="console-column-reorder-id" // Unique ID that is used internally to track this list (required)
                            reorderGroup="console-column-reorder"
                            draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
                            lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
                            holdTime={50} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
                            onReorder={this.onReorder} // Callback when an item is dropped (you will need this to update your state)
                            autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                            disabled={false} // Disable reordering (optional), defaults to false
                        >
                            {this.dataSeparationForDom(columnDataDraggable)}
                        </Reorder>
                    </div>
                    <div className="selection_part_and_search">
                        <h4 className="selection_heading">Select Fields</h4>
                        <div className="column_search">
                            <CustomSearch searchPlaceHolder={"Search Fields"} onSearch={this.onSearch} value={searchData} />
                        </div>
                        <div className="selection_part_main">
                            <Checkbox.Group value={checkedList} style={{ width: '100%' }} >
                                {allCategories.map((categories, i) => (
                                    <div key={categories._id} className="user_selection_group">
                                        <h4 className="group_heading">{categories.lbl.toUpperCase()}</h4>
                                        <div className="group_heading_names">
                                            {dataToMap.filter(field => field.category_type === categories._id).map((columnData, columnDataI) => (
                                                <div key={columnData._id} className="single_heading_name" >
                                                    <Checkbox value={columnData._id} disabled={!columnData.required && columnData.is_draggable ? (this.checkBoxValidation(checkedList, columnData._id)) : true} onChange={this.singleCheckBoxChange}>{columnData.lbl}</Checkbox>
                                                </div>))}
                                        </div>
                                    </div>))}
                            </Checkbox.Group>
                        </div>

                        <div className="save_and_cancel">
                            <div className="cancel_button" onClick={() => this.onColumnSetingFinalAction(false)}>Cancel</div>
                            <div className="save_button" onClick={() => this.onColumnSetingFinalAction(true)}>Save</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ColumnSetting;