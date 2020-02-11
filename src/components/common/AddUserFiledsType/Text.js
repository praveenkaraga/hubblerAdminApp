import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';
import { removeField, addField } from './formCommonFunctions'


class Text extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stateKeys: [0],
            count: 1
        }
    }


    render() {
        const { label, validationRules, fieldId, getFieldDecorator, repeating } = this.props
        const { stateKeys } = this.state
        const config = {
            rules: validationRules,
        };
        console.warn = () => { }
        return (
            <>
                {stateKeys.map((k, index) => (
                    <Form.Item label={index === 0 ? label : ''}>
                        {getFieldDecorator(`${fieldId}[${k}]`, config)(<Input {...this.props} />)}

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

export default Text;
