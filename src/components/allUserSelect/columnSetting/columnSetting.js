import React, { Component } from 'react';
import './columnSetting.scss'
import CustomSearch from '../../common/CustomSearch/customSearch'
import { Checkbox } from 'antd'
import Reorder, { reorder } from "react-reorder";


class ColumnSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnData: this.props.columnData,
            columnDataDraggable: this.props.columnData.filter(data => data.isDraggable),
            columnDataNotDraggable: this.props.columnData.filter(data => !data.isDraggable)
        }
    }

    //reordering the element inside the console column setting
    onReorder = (event, previousIndex, nextIndex) => {
        //const { columnDataDraggable, columnDataNotDraggable } = this.state
        let updatedColumnData = reorder(
            this.state.columnDataDraggable,
            previousIndex,
            nextIndex
        );
        this.setState({ columnDataDraggable: updatedColumnData })
    };

    onRemoveColumn = (id) => { //removing column when clicked remove
        const updatedColumn = this.state.columnDataDraggable.filter(data => !(data._id == id))
        this.setState({ columnDataDraggable: updatedColumn })
    }



    render() {

        const { columnDataDraggable, columnDataNotDraggable, columnData, columnSettingData } = this.state
        return (<div className="column_setting_main">
            <div className="column_setting_main_container">
                <div className="draggable_part">

                    {columnDataNotDraggable.map(singleColumnData => (
                        <div key={singleColumnData._id} className="single_notDraggable " draggable={false}>
                            <div className="column_and_dots">
                                <img className="draggable_dots" src={require("../../../images/svg/braille-six-dots.svg")} />
                                <p className="column_name"> {singleColumnData.lbl}</p>
                            </div>
                            <img className="cross_img" src={require("../../../images/close-app.svg")} />
                        </div>
                    ))
                    }

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
                        {columnDataDraggable.map(singleColumnData => (
                            <div key={singleColumnData._id} className="single_draggable" draggable={false}>
                                <div className="column_and_dots">
                                    <img className="draggable_dots" src={require("../../../images/svg/braille-six-dots.svg")} />
                                    <p className="column_name"> {singleColumnData.lbl}</p>
                                </div>
                                {(columnDataNotDraggable.length + columnDataDraggable.length) > 3 ? <img className="cross_img" src={require("../../../images/close-app.svg")} onClick={() => this.onRemoveColumn(singleColumnData._id)} /> : ""}
                            </div>
                        ))

                        }
                    </Reorder>
                </div>
                <div className="selection_part_and_search">
                    <h4 className="selection_heading">Select Fields</h4>
                    <div className="column_search">
                        <CustomSearch searchPlaceHolder={"Search Fields"} />
                    </div>
                    <div className="selection_part_main">
                        <Checkbox.Group style={{ width: '100%' }} >
                            <div className="user_selection_group">
                                <h4 className="group_heading">Basic Fields</h4>
                                <div className="group_heading_names">
                                    <div className="single_heading_name"><Checkbox value="A">Name</Checkbox></div>
                                    <div className="single_heading_name"><Checkbox value="A">Name</Checkbox></div>
                                    <div className="single_heading_name"><Checkbox value="A">Name</Checkbox></div>
                                    <div className="single_heading_name"><Checkbox value="A">Name</Checkbox></div>
                                    <div className="single_heading_name"><Checkbox value="A">Name</Checkbox></div>
                                </div>
                            </div>
                        </Checkbox.Group>
                    </div>

                    <div className="save_and_cancel">
                        <div className="cancel_button">Cancel</div>
                        <div className="save_button">Save</div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default ColumnSetting;