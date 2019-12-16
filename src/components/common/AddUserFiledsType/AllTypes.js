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




class AllTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { type } = this.props
        switch (type) {
            case "text":
                return <div>text</div>
            case "number":
                return <div>number</div>

            case "phone":
                return <div>phone</div>

            case "email":
                return <div>email</div>

            case "dropdown":
                return <div>dropdown</div>

            case "multiselect":
                return <div>multiselect</div>

            case "date":
                return <div>date</div>

            case "date-time":
                return <div>date-time</div>

            case "location":
                return <div>location</div>


            default: return <div>Nischal</div>
        }
    }
}

export default AllTypes;