import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';

class Date extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select Date!' }],
        };
        console.warn = () => { }
        return (
            <Form.Item label="Date">
                {getFieldDecorator('date-picker', config)(<DatePicker {...this.props} />)}
            </Form.Item>);
    }
}

const WrappedDateForm = Form.create()(Date);

export default WrappedDateForm;