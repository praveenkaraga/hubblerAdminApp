import React, { Component } from 'react';
import { Form, Input } from 'antd';
class Text extends Component {



    render() {
        const { label, validationRules } = this.props
        const { getFieldDecorator } = this.props.form;

        const config = {
            rules: validationRules,
        };
        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator('text', config)(<Input {...this.props} />)}
            </Form.Item>);
    }
}

const WrappedTextForm = Form.create()(Text);

export default WrappedTextForm;
