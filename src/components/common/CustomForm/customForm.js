import React, { Component } from 'react';
import AllTypes from '../AddUserFiledsType/AllTypes'
import { Form, Button } from 'antd';


class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const { formData } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                {formData.map(data => (

                    <AllTypes key={data.id + data.tatabIndexb} fieldId={data.id}
                        type={data.type} minLength={data.minlength} maxLength={data.maxlength}
                        required={data.required} label={data.label} options={data.options} placeholder={data.placeholder} getFieldDecorator={getFieldDecorator} />
                ))

                }

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Register
                </Button>
                </Form.Item>
            </Form>

        )
    }
}


const WrappedCustomForm = Form.create({ name: 'register' })(CustomForm);

export default WrappedCustomForm;