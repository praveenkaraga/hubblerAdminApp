import React, { Component } from 'react';
import { Input } from 'antd'
import './customSearch.scss'
import {debounce} from '../../../utils/helper'

class CustomSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onSearch = debounce(searchValue => { 
        if(this.props.onSearch) this.props.onSearch(searchValue) 
    }, this.props.debounceTime || 0)
    
    render() {
        const { searchPlaceHolder, searchLoader, value } = this.props

        return (
            <div className="custom_search_main">
                <Input.Search placeholder={searchPlaceHolder} loading={searchLoader} onChange={(e)=>this.onSearch(e.target.value)} value={value} />
            </div>
        );
    }
}

export default CustomSearch;