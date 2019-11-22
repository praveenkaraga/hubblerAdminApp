import React, {Component} from 'react';
import {connect} from "react-redux";
import './search.scss'
import 'antd/dist/antd.css';
import { Input } from 'antd';
const { Search } = Input;

class SearchTransition extends Component{
    render() {
        return(

            <div className={'search-transition'}>
                <Search
                    className={'search-comp'}
                    placeholder="input search text"
                />
            </div>
        )
    }
}

export default SearchTransition