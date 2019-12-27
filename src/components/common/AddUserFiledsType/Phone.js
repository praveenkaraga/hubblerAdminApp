import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

class Phone extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: ""
        }
    }

    handleNumberChange = e => {
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
            return;
        }
        this.setState({ inputValue: number })
        // this.triggerChange({ number });
    };

    render() {
        const { label, validationRules, fieldId, getFieldDecorator } = this.props

        const config = {
            rules: validationRules,
        };

        const prefixSelector = getFieldDecorator('country-code', {
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
                    <Input value={this.state.inputValue} addonBefore={prefixSelector} style={{ width: '100%' }} {...this.props} onChange={this.handleNumberChange} />
                )}
            </Form.Item>
        );
    }
}


export default Phone;