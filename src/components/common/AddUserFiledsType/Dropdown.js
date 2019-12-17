import React, { Component } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

class Dropdown extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ required: true, message: 'Please select your country!' }],
        };
        console.warn = () => { }
        return (
            <Form.Item label="Dropdown" >
                {getFieldDecorator('select', config)(
                    <Select style={{ width: "100%" }} placeholder="Please select a country" showSearch>
                        <Option value="china">China</Option>
                        <Option value="usa">U.S.A</Option>
                    </Select>
                )}
            </Form.Item>
        );
    }
}

const WrappedDropdownForm = Form.create()(Dropdown);

export default WrappedDropdownForm;