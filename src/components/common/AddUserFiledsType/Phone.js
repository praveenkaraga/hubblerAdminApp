import React, { Component } from 'react';
import { Form, Input, Select, Icon } from 'antd';
import { removeField, addField } from './formCommonFunctions'
const { Option } = Select;

class NumericInput extends Component {
    onChange = e => {
        const { value } = e.target;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') this.props.onChange(value);
    };

    // '.' at the end or only '-' in the input box.
    onBlur = () => {
        const { value, onBlur, onChange } = this.props;
        if (value && value.charAt(value.length - 1) === '.' || value === '-') onChange(value.slice(0, -1));
        if (onBlur) onBlur();
    };



    render() {

        const { getFieldDecorator, k } = this.props

        const prefixSelector = getFieldDecorator(`country-code[${k}]`, {
            initialValue: '91',
        })(
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );

        return (

            <Input
                {...this.props}
                addonBefore={prefixSelector}
                onChange={this.onChange}
                onBlur={this.onBlur}

            />

        );
    }
}


class Phone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            stateKeys: [0],
            count: 1
        };
    }

    onChange = value => {
        this.setState({ value });
    };

    render() {

        const { label, validationRules, fieldId, getFieldDecorator, repeating } = this.props
        const { stateKeys, value } = this.state
        const config = {
            rules: validationRules,
        };
        console.warn = () => { }
        return (

            <>
                {stateKeys.map((k, index) => (
                    <Form.Item label={index === 0 ? label : ''}>
                        {getFieldDecorator(`${fieldId}[${k}]`, config)(<NumericInput value={value} onChange={this.onChange} {...this.props} k={k} />)}

                        {stateKeys.length > 1 ? (//checking if copy of this component is greater than 1 .. then will enable remove button 
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle"
                                onClick={() => removeField(k, this, stateKeys)}
                            />
                        ) : null}
                        {//if repeatation of this component is true plus icon will be enabled
                            //and also checking the no. of copies made for this field..because plus icon will come in side of last copy only
                            repeating && stateKeys.length === index + 1 ? (
                                <Icon
                                    className="dynamic-add-button"
                                    type="plus-circle"
                                    onClick={() => addField(this)}
                                />
                            ) : null

                        }

                    </Form.Item>))
                }

            </>
        );
    }
}


export default Phone;