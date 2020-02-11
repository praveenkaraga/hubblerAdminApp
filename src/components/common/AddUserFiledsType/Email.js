import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';
import { removeField, addField } from './formCommonFunctions'
import './alltypes.scss'



class Email extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stateKeys: [0],
            count: 1
        }
    }

    render() {

        const { validationRules, getFieldDecorator, fieldId, label, repeating } = this.props
        const config = {
            rules: [{
                type: 'email',
                message: 'The input is not valid email!',
            }, ...validationRules],
        };
        const { stateKeys } = this.state
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


export default Email