import React, { Component } from 'react';
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;
class SearchDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        }
    }

    handleSearch = value => {
        const { onChange } = this.props
        if (onChange) {
            this.props.onChange(value)
        }
    };

    onOptionSelect = (value) => {
        const { onSelect } = this.props
        if (onSelect) {
            this.props.onChange(value)
        }
    }


    render() {
        const result = ["Zac", "Praveen", "Manish", "Anusha", "Nis"] // { result } = this.state;
        const { placeholder = "Search and Add", searchData = [] } = this.props //onSelect, placeholder, searchData, onChange
        console.log(searchData, "searchData")
        const children = searchData.map(data => <Option key={data._id}><div>{data.name}</div></Option>);
        return (
            <div>
                <AutoComplete style={{ width: 200 }} onSelect={this.onOptionSelect} onSearch={this.handleSearch} placeholder={placeholder} optionLabelProp="value">
                    {children}
                </AutoComplete>
            </div>
        );
    }
}

export default SearchDropdown;