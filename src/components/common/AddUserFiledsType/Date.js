import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';

class Date extends Component {

    render() {
        const { validationRules, label, getFieldDecorator, fieldId } = this.props
        const config = {
            rules: [{
                type: 'object',
                message: 'The input is not valid Date!',
            }, ...validationRules],
        };
        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator(fieldId, config)(<DatePicker {...this.props} />)}
            </Form.Item>);
    }
}

export default Date;