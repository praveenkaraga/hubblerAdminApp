import React, { Component } from 'react';
import './alltypes.scss'
import { Form } from 'antd';





class GenderForm extends Component {


    selectGender = (changedValue) => {
        const { onChange, value } = this.props;
        if (onChange) {
            onChange(changedValue);
        }
    }


    render() {
        const allGender = ["male", "female", "others"]
        const { value } = this.props
        return (
            <div className="select_gender">
                <div className="select_gender_container">
                    {allGender.map(data =>
                        (<div key={data} className={`single_gender_container ${value == data ? "selected-gender" : "not-selected-gender"}`} onClick={() => this.selectGender(data)}>
                            <img src={require(`../../../images/svg/${data}-avatar.svg`)} alt="" />
                            <p>{data}</p>
                        </div>
                        ))}
                </div>
            </div>
        );
    }
}





class Gender extends Component {


    checkGender = (rule, value, callback) => {
        if (value != "no") {
            return callback();
        }
        callback('Please Select Gender');
    };

    render() {

        const { label, getFieldDecorator, validationRules, fieldId } = this.props
        const config = {
            initialValue: "no",

            rules: [...validationRules, { validator: this.checkGender }],
        };

        console.warn = () => { }
        return (
            <Form.Item label={label}>

                {getFieldDecorator(fieldId, config)(
                    <GenderForm />
                )}

            </Form.Item>
        );
    }
}

export default Gender;




