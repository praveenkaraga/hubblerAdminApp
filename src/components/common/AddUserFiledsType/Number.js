import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';
import { removeField, addField } from './formCommonFunctions'



class NumericInput extends Component {
    onChange = e => {
        const { value } = e.target;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange(value);
        }
    };

    // '.' at the end or only '-' in the input box.
    onBlur = () => {
        const { value, onBlur, onChange } = this.props;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            onChange(value.slice(0, -1));
        }
        if (onBlur) {
            onBlur();
        }
    };

    render() {
        return (

            <Input
                {...this.props}
                onChange={this.onChange}
                onBlur={this.onBlur}

            />

        );
    }
}


class Number extends Component {
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
        const { stateKeys } = this.state
        const config = {
            rules: validationRules,
        };
        console.warn = () => { }
        return (

            // <Form.Item label={label}>
            //     {getFieldDecorator(fieldId, config)(<NumericInput value={this.state.value} onChange={this.onChange} {...this.props} />)}
            // </Form.Item>

            <>
                {stateKeys.map((k, index) => (
                    <Form.Item label={index === 0 ? label : ''}>
                        {getFieldDecorator(`${fieldId}[${k}]`, config)(<NumericInput value={this.state.value} onChange={this.onChange} {...this.props} />)}

                        {stateKeys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle"
                                onClick={() => removeField(k, this, stateKeys)}
                            />
                        ) : null}
                        {
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


export default Number;