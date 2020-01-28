import React, { Component } from 'react';
import { AutoComplete } from 'antd';
import './searchDropDown.scss'

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
            this.props.onSelect(value)
        }
    }


    render() {
        const { placeholder = "Search and Add", searchData = [] } = this.props
        const children = searchData.map(data => <Option key={data._id} name={data.name}>
            <div className="name_with_profile">
                {data ?
                    data["profile_image"] ?
                        <img src={data["profile_image"]["thumbnail"]} alt="Profile Pic" /> :
                        <div className="no_profile_pic"><p>{data.firstname.substring(0, 2)}</p></div>
                    : ""}
                <div className="name_with_designation">
                    <div className="only_name">{data.name}</div>
                    {
                        data["designations"] ? data["designations"].length ? <div className="only_designation">{data["designations"] ? data["designations"][0]["name"] : ""}</div> : "" : ""
                    }
                </div>
            </div>
        </Option>);
        return (
            <div>
                <AutoComplete className="searchDropdown" allowClear style={{ width: 200 }} onSelect={this.onOptionSelect} onSearch={this.handleSearch} placeholder={placeholder} optionLabelProp="name">
                    {children}
                </AutoComplete>
            </div>
        );
    }
}

export default SearchDropdown;