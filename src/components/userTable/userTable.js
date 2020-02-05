import React, { Component } from 'react';
import { Table } from 'antd';
import './userTable.scss'

class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
        }
    }


    onSelectChange = (selectedRowKeys, selectedRows) => {
        if (this.props.onChangeCheckBox) {
            this.props.onChangeCheckBox(selectedRowKeys, selectedRows)
        }
        this.setState({ selectedRowKeys });
    };

    onChange = (pagination, filters, sorter, extra) => {
        this.props.sortingData(sorter)
    }

    onRowClick = (record, rowIndex) => {
        const { onClickTableRow } = this.props
        if (onClickTableRow) {
            return {
                onClick: event => {
                    onClickTableRow(record)
                }
            }
        }
    }

    onSelectRow = (record, selected, selectedRows) => {
        if (this.props.onSelectRow) {
            this.props.onSelectRow(record, selected, selectedRows)
        }
    }

    onSelectAll = (selected, selectedRows) => {
        if (this.props.onSelectAll) {
            this.props.onSelectAll(selected, selectedRows)
        }
    }


    rowClassName = (record) => { // changing the classname of row of the table according to the active status of user
        return !(record.deactivate === true) ? "user_table_row user_table_row_active_user" : "user_table_row user_table_row_deactivated_user"
    }

    render() {
        const { selectedRowKeys } = this.state;
        const { allHeadingsData, modifiedUserData, onClickTableRow, selectedDataCount = selectedRowKeys.length } = this.props
        const rowSelection = {
            selectedRowKeys: selectedDataCount ? selectedRowKeys : [],
            onChange: this.onSelectChange,
            onSelect: this.onSelectRow,
            onSelectAll: this.onSelectAll
        }

        return <Table rowKey={record => record.key} className={`user_table_main ${onClickTableRow ? "row_clickable" : "row_not_clickable"}`}
            rowSelection={rowSelection} columns={allHeadingsData}
            dataSource={modifiedUserData} pagination={false} scroll={{ y: "unset" }}
            onChange={this.onChange} {...this.props} onRow={this.onRowClick}
            rowClassName={this.rowClassName} scrollToFirstRowOnChange={true}
        />
    }
}

export default UserTable;