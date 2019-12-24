import React, { Component } from 'react';
import { Form, Input } from 'antd';
class Text extends Component {



    render() {
        const { label, validationRules, fieldId, getFieldDecorator } = this.props

        const config = {
            rules: validationRules,
        };
        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator(fieldId, config)(<Input {...this.props} />)}
            </Form.Item>);
    }
}

export default Text;
