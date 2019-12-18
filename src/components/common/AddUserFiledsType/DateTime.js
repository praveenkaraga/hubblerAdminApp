import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';

class DateTime extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const { validationRules, label } = this.props
        const config = {
            rules: [{
                type: 'object',
                message: 'The input is not valid Date And Time!',
            }, ...validationRules],
        };
        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator('date-picker', config)(<DatePicker showTime format="DD-MM-YYYY HH:mm:ss" placeholder=" Select Date and Time"{...this.props} />)}
            </Form.Item>);
    }
}

const WrappedDateTimeForm = Form.create()(DateTime);

export default WrappedDateTimeForm;