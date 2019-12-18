import React, { Component } from 'react';
import { Input, Form } from 'antd';


class Email extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const { validationRules } = this.props
        const config = {
            rules: [{
                type: 'email',
                message: 'The input is not valid email!',
            }, ...validationRules],
        };
        return (
            <>

                <Form.Item label="E-mail">
                    {getFieldDecorator('email', config)(<Input {...this.props} />)}
                </Form.Item>

            </>
        );
    }
}

const WrappedEmailForm = Form.create()(Email);

export default WrappedEmailForm