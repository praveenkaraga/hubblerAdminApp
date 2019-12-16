import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

class Phone extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ required: true, message: 'Please input your phone number!' }],
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );
        console.warn = () => { }
        return (
            <Form.Item label="Dropdown" >
                {getFieldDecorator('select', config)(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
            </Form.Item>
        );
    }
}

const WrappedPhoneForm = Form.create()(Phone);

export default WrappedPhoneForm;