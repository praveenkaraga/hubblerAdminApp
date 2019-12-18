import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';

class Date extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const { validationRules, label } = this.props
        const config = {
            rules: [{
                type: 'object',
                message: 'The input is not valid Date!',
            }, ...validationRules],
        };
        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator('date-picker', config)(<DatePicker {...this.props} />)}
            </Form.Item>);
    }
}

const WrappedDateForm = Form.create()(Date);

export default WrappedDateForm;