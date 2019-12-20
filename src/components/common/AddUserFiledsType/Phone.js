import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

class Phone extends Component {

    render() {
        const { label, validationRules } = this.props
        const { getFieldDecorator } = this.props.form;

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
                {getFieldDecorator('select', config)(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} {...this.props} />
                )}
            </Form.Item>
        );
    }
}

const WrappedPhoneForm = Form.create()(Phone);

export default WrappedPhoneForm;