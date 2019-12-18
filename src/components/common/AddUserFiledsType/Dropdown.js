import React, { Component } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

class Dropdown extends Component {

    render() {
        const { label, validationRules, options } = this.props
        const { getFieldDecorator } = this.props.form;

        const config = {
            rules: validationRules,
        };
        console.warn = () => { }
        return (
            <Form.Item label={label} >
                {getFieldDecorator('select', config)(
                    <Select style={{ width: "100%" }} placeholder="Please select a country" showSearch>
                        {options.map(singleOption => (<Option key={singleOption.id} value={singleOption.id}>{singleOption.name}</Option>))}
                        {/* <Option value="usa">U.S.A</Option> */}
                    </Select>
                )}
            </Form.Item>
        );
    }
}

const WrappedDropdownForm = Form.create()(Dropdown);

export default WrappedDropdownForm;