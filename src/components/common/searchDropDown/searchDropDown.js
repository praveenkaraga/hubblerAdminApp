import React, { Component } from 'react';
import { AutoComplete, Icon, Input } from 'antd';
import './searchDropDown.scss'

const { Option } = AutoComplete;
class SearchDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        }
    }

    handleSearch = value => { //passing search value to prop on search
        if (this.props.onChange) this.props.onChange(value) //checking if prop is being passed or not
    };

    onOptionSelect = (value) => { //on Select of a data from dropdown
        if (this.props.onSelect) this.props.onSelect(value) //checking if prop is being passed or not
    }


    render() {
        const { placeholder = "Search and Add", searchData = [], searchIcon = false, width = 200, value = "" } = this.props

        // modelling all the options for below autocomplete component
        const children = searchData.map(data => <Option key={data._id} name={data.name}>
            <div className="name_with_profile">
                {data ?
                    data["profile_image"] ?
                        <img src={data["profile_image"]["thumbnail"]} alt="Profile Pic" /> :
                        <div className="no_profile_pic"><p>{data.firstname.substring(0, 2)}</p></div> // if no profile pic is there , first two initials of there name will come
                    : ""}
                <div className="name_with_designation">
                    <div className="only_name">{data.name}</div>
                    {
                        <div className="only_designation">
                            {data["designations"] && data["designations"].length ? data["designations"][0]["name"] : null} {/*checking if designation is available then will show there designation*/}
                        </div>
                    }
                </div>
            </div>
        </Option>);
        return (
            <div>
                <AutoComplete className="searchDropdown" allowClear style={{ width }} onSelect={this.onOptionSelect}
                    onSearch={this.handleSearch}
                    dataSource={children} optionLabelProp="name" value={value}>

                    <Input prefix={searchIcon ? <Icon type="search" className="search-icon" /> : null} placeholder={placeholder} />
                </AutoComplete>
            </div>
        );
    }
}

export default SearchDropdown;