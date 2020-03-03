import React, {Component} from 'react';
import './holidayCreateNewPopUp.scss'
import {Button, Input, Modal, DatePicker, Select} from "antd";
import 'antd/dist/antd.css';
import map from "lodash/map";
const {Option} = Select;
const { RangePicker } = DatePicker;

class HolidayCreateNewPopUp extends Component {
    componentDidMount(){

    }

    getRequiredFields = () => {
        return
    };

    onChange = (date, dateString ) => {
        console.log(date, dateString)
    }

    onSearch = (val) => {
        console.log('search:', val);
    };

    onSelectChange = (value) =>{
        console.log(value)
    }

    render() {
        const {createNewVisibility = false,holidayTypeDropdownData} =  this.props
        return (
            <div className={'holiday-create-new-popup'}>
                <Modal
                    title={'New Holiday'}
                    visible={createNewVisibility}
                    className={'holiday-create-new-popup-modal'}
/*
                    onCancel={creationPopFirstButtonHandler}
*/
                    destroyOnClose={true}
                    footer={[
                        <Button key="cancel" >
                            Cancel
                        </Button>,
                        <Button key="create"
                                type="primary">Create</Button>,
                    ]}
                    centered>

                    {/*{this.getRequiredFields()}*/}

                    <div className={'field-wrap'}>
                        <div>Holiday Name</div>
                        <Input placeholder={'Enter Holiday Name'} className={'preferred-field-class'}/>
                    </div>
                    <div className={'field-wrap'}>
                        <div>Date</div>
                        <RangePicker onChange={this.onChange} className={'range-picker'}/>
                    </div>
                    <div className={'field-wrap'}>
                        <div>Holiday Type</div>
                        <Select
                            showSearch
                            placeholder="Select a type"
                            optionFilterProp="children"
                            onChange={this.onSelectChange}
                            className={'holiday-type-select'}
                            onSearch={this.onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {map(holidayTypeDropdownData, function (inele, inde) {
                                return <Option value={inele._id}
                                               key={inele._id} className={'holiday-type-options'}>{inele.name}</Option>
                            })}
                        </Select>
                    </div>


                </Modal>
            </div>
        )
    }
}

export default HolidayCreateNewPopUp