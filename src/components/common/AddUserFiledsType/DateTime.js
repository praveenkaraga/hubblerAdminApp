import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';

class DateTime extends Component {

    render() {
        const { validationRules, label, getFieldDecorator, fieldId } = this.props
        const config = {
            rules: [{
                type: 'object',
                message: 'The input is not valid Date And Time!',
            }, ...validationRules],
        };
        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator(fieldId, config)(<DatePicker showTime format="DD-MM-YYYY HH:mm:ss" {...this.props} />)}
            </Form.Item>);
    }
}


export default DateTime;