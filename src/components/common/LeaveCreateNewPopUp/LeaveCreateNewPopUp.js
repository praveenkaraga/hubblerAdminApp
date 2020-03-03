import React, {Component} from 'react';
import './leaveCreateNewPopUp.scss'
import {Button, Input, Modal, DatePicker, Select} from "antd";
import 'antd/dist/antd.css';
import map from "lodash/map";
const {Option} = Select;

class LeaveCreateNewPopUp extends Component {
    onChange = (date, dateString) => {
        console.log(date, dateString)
    };

    onSearch = (val) => {
        console.log('search:', val);
    };

    onSelectChange = (value) => {
        console.log(value)
    }

    getInputSkeleton = (ele) => {
        return <div className={'field-wrap'}>
            <div>{ele.header}</div>
            <Input placeholder={ele.placeholder} className={'preferred-field-class'} onChange={this.onLeaveTypeChange}/>
        </div>
    };

    getDropDownSkeleton = (ele) => {
        return <div className={'field-wrap'}>
            <div>{ele.header}</div>
            <Select
                showSearch
                placeholder="Select a type"
                optionFilterProp="children"
                defaultValue={ele.options[0].name}
                onChange={this.onSelectChange}
                className={'leave-selection'}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {map(ele.options, function (inele, inde) {
                    return <Option value={inele.id}
                                   key={inele.id} className={'leave-options'}>{inele.name}</Option>
                })}
            </Select>
        </div>

    }

    onLeaveTypeChange = (value) => {
        console.log(value)
    }
    onTotalDaysChange = (value) => {
        console.log(value)
    }

    render() {
        const {createNewVisibility = false} = this.props
        let _this = this;
        let input = [
            {header: 'Leave Type', placeholder: 'Enter Leave type', function: (value) => this.onLeaveTypeChange(value)},
            {
                header: 'Total No of Days',
                placeholder: 'Enter No of Days',
                function: (value) => this.onTotalDaysChange(value)
            },
        ];
        let dropDown = [
            {
                header: 'Added',
                options: [{id: 'annually', name: 'Annually'}, {id: 'half_yearly', name: 'Half Yearly'}, {
                    id: 'quarterly',
                    name: 'Quarterly'
                }, {id: 'monthly', name: 'Monthly'}, {id: 'one_time', name: 'One Time'}]
            },
            {
                header: 'Gender',
                options: [{id: 'all', name: 'All'}, {id: 'male', name: 'Male'}, {
                    id: 'female',
                    name: 'Female'
                }, {id: 'other', name: 'Other'}]
            },
            {
                header: 'Carry Forward',
                options: [{id: 'no', name: 'No'}, {id: 'yes', name: 'Yes'}]
            },
        ];
        return (
            <div className={'leave-create-new-popup'}>
                <Modal
                    title={'Create Leave'}
                    visible={createNewVisibility}
                    className={'leave-create-new-popup-modal'}
                    /*
                                        onCancel={creationPopFirstButtonHandler}
                    */
                    destroyOnClose={true}
                    footer={[
                        <Button key="cancel">Cancel</Button>,
                        <Button key="create" type="primary">Create</Button>,
                    ]}
                    centered>

                    {map(input, function (ele) {
                        return _this.getInputSkeleton(ele)
                    })}

                    {map(dropDown, function (ele) {
                        return _this.getDropDownSkeleton(ele)
                    })}
                </Modal>
            </div>
        )
    }
}

export default LeaveCreateNewPopUp