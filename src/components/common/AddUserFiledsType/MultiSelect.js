import React, { Component } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

class MultiDropdown extends Component {

    render() {

        const { label, validationRules, options, getFieldDecorator, fieldId } = this.props

        const config = {
            rules: [{
                type: 'array',
                message: 'The input is not valid!',
            }, ...validationRules],
        };


        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator(fieldId, config)(
                    <Select style={{ width: "100%" }} mode="multiple" {...this.props}>
                        {options.map(singleOption => (<Option key={singleOption.id} value={singleOption.id}>{singleOption.name}</Option>))}
                    </Select>
                )}
            </Form.Item>
        );
    }
}

export default MultiDropdown;