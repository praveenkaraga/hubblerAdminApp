import React, { Component } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

class MultiDropdown extends Component {

    render() {

        const { label, validationRules, options } = this.props
        const { getFieldDecorator } = this.props.form;

        const config = {
            rules: [{
                type: 'array',
                message: 'The input is not valid!',
            }, ...validationRules],
        };


        console.warn = () => { }
        return (
            <Form.Item label={label}>
                {getFieldDecorator('select-multiple', config)(
                    <Select style={{ width: "100%" }} mode="multiple" placeholder="Please select atleast one">
                        {options.map(singleOption => (<Option key={singleOption.id} value={singleOption.id}>{singleOption.name}</Option>))}
                    </Select>
                )}
            </Form.Item>
        );
    }
}

const WrappedMultiDropdownForm = Form.create()(MultiDropdown);

export default WrappedMultiDropdownForm;