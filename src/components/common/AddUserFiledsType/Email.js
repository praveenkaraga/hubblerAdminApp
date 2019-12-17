import React, { Component } from 'react';
import { Input, Form } from 'antd';


class Email extends Component {

    render() {
        const { getFieldDecorator } = this.props.form
        console.warn = () => { }
        return (
            <>

                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid email!',
                            },
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ],
                    })(<Input {...this.props} />)}
                </Form.Item>

            </>
        );
    }
}

const WrappedEmailForm = Form.create()(Email);

export default WrappedEmailForm