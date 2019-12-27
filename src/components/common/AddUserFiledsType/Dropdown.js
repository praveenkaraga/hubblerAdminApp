import React, { Component } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

class Dropdown extends Component {

    render() {
        const { label, validationRules, options, fieldId, getFieldDecorator } = this.props

        const config = {
            rules: validationRules,
        };
        console.warn = () => { }
        return (
            <Form.Item label={label} >
                {getFieldDecorator(fieldId, config)(
                    <Select style={{ width: "100%" }} showSearch {...this.props}>
                        {options.map(singleOption => (<Option key={singleOption.id} value={singleOption.id}>{singleOption.name}</Option>))}
                    </Select>
                )}
            </Form.Item>
        );
    }
}



export default Dropdown;