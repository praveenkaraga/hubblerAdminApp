import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

class Phone extends Component {

    render() {
        const { label, validationRules, fieldId, getFieldDecorator } = this.props

        const config = {
            rules: validationRules,
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '91',
        })(
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );
        console.warn = () => { }
        return (
            <Form.Item label={label} >
                {getFieldDecorator(fieldId, config)(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} {...this.props} />
                )}
            </Form.Item>
        );
    }
}


export default Phone;