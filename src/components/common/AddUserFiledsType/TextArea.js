import React, { Component } from 'react';
import { Form, Input } from 'antd';



class TextArea extends Component {
    render() {
        const { label, validationRules } = this.props
        const { getFieldDecorator } = this.props.form;

        const config = {
            rules: validationRules,
        };
        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator('textarea', config)(<Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />)}
            </Form.Item>);
    }
}

const WrappedTextAreaForm = Form.create()(TextArea);

export default WrappedTextAreaForm;