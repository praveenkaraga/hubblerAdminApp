import React, {Component} from 'react';
import {connect} from "react-redux";
import './teamView.scss'
import {Button} from 'antd';
import 'antd/dist/antd.css';
import SearchTransition from '../common/Search/SearchTransition'


class TeamView extends Component {
    render() {
        return (
            <div className={'team-view'}>
                <div className={'component-header'}>Team View</div>
                <div className={'team-view-buttons-wrap'}>
                    <SearchTransition/>
                    <Button type="primary" className={'import-excel'}>Import Excel</Button>
                    <Button type="primary" >Create New User</Button>

                </div>


            </div>
        )
    }
}

export default TeamView