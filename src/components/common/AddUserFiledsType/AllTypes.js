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
                break;
            case "number":
                return console.log("number")
                break;
            case "phone":
                return console.log("phone")
                break;
            case "email":
                return console.log("email")
                break;
            case "dropdown":
                return console.log("dropdown")
                break;
            case "multiselect":
                return console.log("multiselect")
                break;
            case "date":
                return console.log("date")
                break;
            case "date-time":
                return console.log("date-time")
                break;
            case "location":
                return console.log("location")
                break;

            default: return <div>Nischal</div>
                break;
        }
    }
}

export default AllTypes;