import React, {Component} from 'react'
import './vehicleReimCreatePopUp.scss'
import {Button, Input, Modal, Radio, Checkbox, Form} from "antd";
import 'antd/dist/antd.css';
import map from "lodash/map";


class VehicleReimCreatePopUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'actual'
        }
    }

    onFinish = (values) => {
        console.log('Success:', values);
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    onPaidOptionChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    getInputSkeleton = (ele) => {
        let prefix = ele.prefix ? "₹" : ''
        return <div className={'field-wrap'}>
            <div className={'header'}>{ele.header}</div>
            <Input placeholder={ele.placeholder} prefix={prefix} className={'preferred-field-class'}
                   onChange={this.onLeaveTypeChange}/>
        </div>
    };

    onChangeLinkToTripMeter = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }


    onIconChange = () =>{
        console.log('onIconChange')
    }

    render() {
        const {createNewVisibility} = this.props
        let _this = this
        let input = [
            {
                header: 'Rupees per km', placeholder: 'Enter Amount', prefix: true,
                function: (value) => this.onLeaveTypeChange(value)
            },
            {
                header: 'Max Limit',
                placeholder: 'Enter Amount',
                prefix: true,
                function: (value) => this.onTotalDaysChange(value)
            },
            {
                header: 'Max KM can be claimed',
                placeholder: 'Enter KM',
                prefix: false,
                function: (value) => this.onLeaveTypeChange(value)
            },

        ];
        return (
            <Modal
                title={'Create Reimbursement Profile - Vehicle'}
                visible={createNewVisibility}
                className={'leave-create-new-popup-modal'}
                /*
                                    onCancel={creationPopFirstButtonHandler}
                */
                destroyOnClose={true}
                footer={[
                    <Button key="cancel">Cancel</Button>,
                    <Button key="create" type="primary">Ok</Button>,
                ]}
                centered>
                <div className={'vehicle-content-wrap'}>
                    <div className={'vehicle-icons'} onClick={this.onIconChange}></div>
                    <div>
                        <Form name="basic" onFinish={this.onFinish}
                              onFinishFailed={this.onFinishFailed}>

                            <div className={'field-wrap'}>
                                <Form.Item
                                    label="Card Name"
                                    name="card_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input placeholder={'Enter Card Name'} className={'preferred-field-class'}/>

                                </Form.Item>
                            </div>
                            <div className={'field-wrap paid-wrap'}>
                                <div className={'header'}>Paid</div>
                                <Radio.Group onChange={this.onPaidOptionChange} value={this.state.value}>
                                    <Radio value={'actual'}>Actual</Radio>
                                    <Radio value={'km'}>KM</Radio>
                                </Radio.Group>
                            </div>
                            {this.state.value === 'km' ? <div className={'km-wrap'}>
                                {map(input, function (ele) {
                                    return _this.getInputSkeleton(ele)
                                })}
                            </div> : ''}
                            <div className={'link-to-trip-meter'}>
                                <Checkbox onChange={this.onChangeLinkToTripMeter}>Link to Trip Meter</Checkbox>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal>
        )

    }

}

export default VehicleReimCreatePopUp