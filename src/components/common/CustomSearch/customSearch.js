import React, { Component } from 'react';
import { Input } from 'antd'
import './customSearch.scss'

class CustomSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { searchPlaceHolder, searchLoader, onSearch, value } = this.props

        return (
            <div className="custom_search_main">
                <Input.Search placeholder={searchPlaceHolder} loading={searchLoader} onChange={onSearch} value={value} />
            </div>
        );
    }
}

export default CustomSearch;