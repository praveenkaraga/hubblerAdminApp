import React, { Component } from 'react';
import { Input, Form } from 'antd';


class Email extends Component {

    render() {

        const { validationRules, getFieldDecorator, fieldId, label } = this.props
        const config = {
            rules: [{
                type: 'email',
                message: 'The input is not valid email!',
            }, ...validationRules],
        };
        return (

            <Form.Item label={label}>
                {getFieldDecorator(fieldId, config)(<Input {...this.props} />)}
            </Form.Item>

        );
    }
}


export default Email