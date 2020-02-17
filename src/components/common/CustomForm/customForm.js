import React, { Component } from 'react';
import AllTypes from '../AddUserFiledsType/AllTypes'
import { Form, Button } from 'antd';
import './customForm.scss'

class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    //on Submit of the form it will validate all the validations
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values from form: ', values);
            }
        });
    }


    render() {
        const { formData } = this.props
        const { getFieldDecorator } = this.props.form;
        console.warn = () => { }
        return (
            <Form onSubmit={this.handleSubmit} className="add_users_form">
                {formData.map(data => (

                    <AllTypes key={data.id + data.tatabIndexb} fieldId={data.id}
                        type={data.type} minLength={data.minlength} maxLength={data.maxlength}
                        required={data.required}
                        label={data.label}
                        options={data.options}
                        placeholder={data.placeholder}
                        getFieldDecorator={getFieldDecorator}
                        style={{ width: '60%', marginRight: 8 }}
                        form={this.props.form}
                        repeating={data.repeating} />
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