import React, { Component } from 'react';
import { Input } from 'antd';
import Text from '../AddUserFiledsType/Text'
import Date from '../AddUserFiledsType/Date'
import DateTime from '../AddUserFiledsType/DateTime'
import Dropdown from '../AddUserFiledsType/Dropdown'
import Email from '../AddUserFiledsType/Email'
import MultiSelect from '../AddUserFiledsType/MultiSelect'
import Number from '../AddUserFiledsType/Number'
import Phone from '../AddUserFiledsType/Phone'
import Gender from '../AddUserFiledsType/Gender'




class AllTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { type } = this.props
        switch (type) {
            case "text":
                return <Text />

            case "number":
                return < Number />

            case "phone":
                return < Phone />

            case "email":
                return <Email />

            case "dropdown":
                return < Dropdown />

            case "multiselect":
                return < MultiSelect />

            case "date":
                return <Date />

            case "date-time":
                return <DateTime />

            case "location":
                return <div>location</div>

            case "gender":
                return <Gender />

            default: return <div>Nischal</div>
        }
    }
}

export default AllTypes;