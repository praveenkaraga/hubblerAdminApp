import React, { Component } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

class MultiDropdown extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [
                { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ]
        };
        console.warn = () => { }
        return (
            <Form.Item label="Multi Select">
                {getFieldDecorator('select-multiple', config)(
                    <Select style={{ width: "100%" }} mode="multiple" placeholder="Please select atleast one">
                        <Option value="red">Red</Option>
                        <Option value="green">Green</Option>
                        <Option value="blue">Blue</Option>
                    </Select>
                )}
            </Form.Item>
        );
    }
}

const WrappedMultiDropdownForm = Form.create()(MultiDropdown);

export default WrappedMultiDropdownForm;