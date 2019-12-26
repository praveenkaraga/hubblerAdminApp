import React, { Component } from 'react';
import { Form, Input } from 'antd';



class TextArea extends Component {
    render() {
        const { label, validationRules, getFieldDecorator, fieldId } = this.props

        const config = {
            rules: validationRules,
        };
        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator(fieldId, config)(<Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />)}
            </Form.Item>);
    }
}


export default TextArea;