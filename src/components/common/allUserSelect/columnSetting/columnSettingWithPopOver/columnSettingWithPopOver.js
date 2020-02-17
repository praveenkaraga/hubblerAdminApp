import React, { Component } from 'react';
import { Popover } from 'antd';
import ColumnSetting from '../columnSetting'
import './columnSettingWithPopOver.scss'

class ColumnSettingWithPopOver extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const { columnSettingData, onColumnSettingSave, onColumnSettingCancel, onSearchColumnSetting, tableColumnHeadingData,
            title = "Column Setting", trigger = "click", visibleColumnSetting, placement = "bottomRight", onClickColumnSetting } = this.props
        return (
            <div className="column_settings">
                <Popover
                    content={<ColumnSetting columnData={tableColumnHeadingData} //opening content of gear icon on popover
                        columnSettingData={columnSettingData}
                        onColumnSettingSave={onColumnSettingSave}
                        onColumnSettingCancel={onColumnSettingCancel}
                        onSearchColumnSetting={onSearchColumnSetting} />}
                    title={title}
                    trigger={trigger}
                    visible={visibleColumnSetting}
                    placement={placement}
                    autoAdjustOverflow
                    overlayClassName={`allUserSelect_popover`}
                >
                    <img src={require(`../../../../../images/svg/${!visibleColumnSetting ? "settings_grey" : "close-app"}.svg`)} //if visibleColumnSetting false then whow gear icon otherwise will show cross icon
                        onClick={onClickColumnSetting} alt="Column Setting" />

                </Popover>
            </div>
        );
    }
}

export default ColumnSettingWithPopOver;