import React, { Component } from 'react';
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;
class SearchDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            value: ""
        }
    }

    handleSearch = value => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ result });
    };


    render() {
        const { result, value } = this.state;
        const { onSearchDropdownSelect, searchDropdownPlaceholder, searchDropdownData, onChangeSearchDropdown } = this.props //onSelect, placeholder, searchData, onChange
        const children = result.map(email => <Option key={email}><div>{email}</div></Option>);
        return (
            <div>
                <AutoComplete style={{ width: 200 }} onSearch={this.handleSearch} placeholder="Enter Name to Add" optionLabelProp="value">
                    {children}
                </AutoComplete>
            </div>
        );
    }
}

export default SearchDropdown;