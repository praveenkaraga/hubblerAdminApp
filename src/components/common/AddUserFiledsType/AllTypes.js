import React, { Component } from 'react';
import Text from '../AddUserFiledsType/Text'
import Date from '../AddUserFiledsType/Date'
import DateTime from '../AddUserFiledsType/DateTime'
import Dropdown from '../AddUserFiledsType/Dropdown'
import Email from '../AddUserFiledsType/Email'
import MultiSelect from '../AddUserFiledsType/MultiSelect'
import Number from '../AddUserFiledsType/Number'
import Phone from '../AddUserFiledsType/Phone'
import Gender from '../AddUserFiledsType/Gender'
import TextArea from '../AddUserFiledsType/TextArea'
import { validationRules } from '../../../utils/helper'
import './alltypes.scss'


class AllTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    filterRulesForDate = (normalRules) => { //removing max and min length wherever we don't them... {like in date}
        let filteredData = normalRules.filter(data => "required" in data)
        return filteredData
    }

    render() {
        const { type, required, label, minLength, maxLength } = this.props
        const customValidationRules = validationRules(required, label, minLength, maxLength)
        console.error = () => { }
        console.warn = () => { }

        switch (type) { //returning different form fields according to data
        case "text":
            return <Text validationRules={customValidationRules} {...this.props} />

        case "number":
            return <Number validationRules={customValidationRules} {...this.props} />

        case "phone":
            return <Phone validationRules={customValidationRules} {...this.props} />

        case "email":
            return <Email validationRules={customValidationRules} {...this.props} />

        case "dropdown":
            return <Dropdown validationRules={this.filterRulesForDate(customValidationRules)} {...this.props} />

        case "multiselect":
            return <MultiSelect validationRules={this.filterRulesForDate(customValidationRules)} {...this.props} />

        case "date":
            return <Date validationRules={this.filterRulesForDate(customValidationRules)} {...this.props} />

        case "date-time":
            return <DateTime validationRules={this.filterRulesForDate(customValidationRules)} {...this.props} />

        case "location":
            return <></>

        case "gender":
            return <Gender validationRules={this.filterRulesForDate(customValidationRules)}  {...this.props} />

        case "textarea":
            return <TextArea validationRules={customValidationRules} {...this.props} />

        default: return <div></div>
        }
    }
}

export default AllTypes;