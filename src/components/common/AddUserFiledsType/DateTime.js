import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';

class DateTime extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select Date and Time!' }],
        };
        console.warn = () => { }
        return (
            <Form.Item label="Date and Time Picker">
                {getFieldDecorator('date-picker', config)(<DatePicker showTime format="DD-MM-YYYY HH:mm:ss" placeholder=" Select Date and Time"{...this.props} />)}
            </Form.Item>);
    }
}

const WrappedDateTimeForm = Form.create()(DateTime);

export default WrappedDateTimeForm;