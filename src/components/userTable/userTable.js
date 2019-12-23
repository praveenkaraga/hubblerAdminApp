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


    onSelectChange = selectedRowKeys => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.props.onChangeCheckBox(selectedRowKeys)
        this.setState({ selectedRowKeys });
    };

    onChange = (pagination, filters, sorter, extra) => {
        this.props.sortingData(sorter)
      }
    

    render() {
        const { selectedRowKeys } = this.state;
        const { allHeadingsData, modifiedUserData } = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }

        return <Table  rowSelection={rowSelection} columns={allHeadingsData} dataSource={modifiedUserData} pagination={false} scroll={{ y: "unset" }} onChange={this.onChange} {...this.props}/>
    }
}

export default UserTable;