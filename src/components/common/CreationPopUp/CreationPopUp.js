import React, {Component} from "react";
import {Button, Input, Modal, Select, Switch} from "antd";
import './creationPopUp.scss'
import map from "lodash/map";
import find from "lodash/find";
import isEmpty from 'lodash/isEmpty'


const {Option} = Select;


class CreationPopUp extends Component {

    test = () => {
        console.log("Enter")
    }

    inputField = (type) => {

    }



    getCustomFieldsSkeleton = (type) => {
        const {creationPopUpFirstFieldChangeHandler, fieldHeader, fieldPlaceHolder, creationPopUpSecondFieldChangeHandler, secondFieldHeader = `Type`, thirdFieldHeader = `Required`, fourthFieldHeader = `Enable Parent Node`, creationPopUpThirdFieldChangeHandler, creationPopSecondButtonHandler, inputValue, inputMaxLength, typeDropDownSelectedValue, requiredCheckValue = false, parentNodeCheckValue = false, creationPopUpFourthFieldChangeHandler, parentNodeOptions, parentNodeSwitch,parentNodeOnchange,
            parentNodeOnSearch} = this.props
        const {
            secondFieldOptions = [{name: 'Single Select', key: 'single_select'}, {
                name: 'Multi Select',
                key: 'multi_select'
            }]
        } = this.props;
        let dropDownValue = typeDropDownSelectedValue === 'drop down' ? "Single Select" : "Multi Select"
        return <div>
            <div>
                <div>{fieldHeader}</div>
                <Input placeholder={fieldPlaceHolder} className={'preferred-field-class'}
                       onChange={creationPopUpFirstFieldChangeHandler}
                       value={inputValue} onPressEnter={creationPopSecondButtonHandler}
                       maxLength={inputMaxLength}
                />
            </div>
            <div className={'second-field-wrap'}>
                <div>{secondFieldHeader}</div>
                <Select defaultValue={dropDownValue ? dropDownValue : secondFieldOptions[0].key}
                        onChange={creationPopUpSecondFieldChangeHandler}
                        className={'second-field-element'}
                        disabled={type === 'edit' ? true : false}
                >
                    {map(secondFieldOptions, function (ele, inde) {
                        return <Option value={ele.key}
                                       key={ele.key}>{ele.name}</Option>

                    })}
                </Select>
            </div>
            <div className={'third-field-wrap'}>
                <Switch onChange={creationPopUpThirdFieldChangeHandler} className={'third-field-element'}
                        checked={requiredCheckValue}/>
                <div className={'field-header-name'}>{thirdFieldHeader}</div>

            </div>
            <div className={'fourth-field-wrap'}>
                <div className={'switch-header-wrap'}>
                    <Switch onChange={creationPopUpFourthFieldChangeHandler} className={'third-field-element'}
                            loading={parentNodeSwitch}
                            checked={parentNodeCheckValue}/>
                    <div className={'field-header-name'}>{fourthFieldHeader}</div>
                </div>
                {parentNodeCheckValue && !isEmpty(parentNodeOptions) ?
                    <div className={'dropdown-wrap'}>
                        <Select
                            showSearch
                            placeholder={'Select'}
                            className={'dropDown'}
                            optionFilterProp="children"
                            onChange={parentNodeOnchange}
                            onSearch={parentNodeOnSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {map(parentNodeOptions, function (inele, inde) {
                                return <Option value={inele._id}
                                               key={inele._id}>{inele.name}</Option>
                            })}
                        </Select></div> : ''}
            </div>
        </div>
    }

    getRequiredFields = (customField) => {
        const {creationPopUpFirstFieldChangeHandler, fieldHeader, fieldPlaceHolder, inputValue, creationPopSecondButtonHandler, inputMaxLength} = this.props
        switch (customField) {
            case 'add' : {
                return this.getCustomFieldsSkeleton('add')
            }
            case 'edit' : {
                return this.getCustomFieldsSkeleton('edit')
            }
            default : {
                return <div>
                    <div>{fieldHeader}</div>
                    <Input placeholder={fieldPlaceHolder} className={'preferred-field-class'}
                           onChange={creationPopUpFirstFieldChangeHandler} value={inputValue}
                           onPressEnter={creationPopSecondButtonHandler} maxLength={inputMaxLength}/>
                </div>
            }
        }
    };


    render() {
        const {
            creationPopUpVisibility = false, creationPopUpTitle = `Add New Department`, creationPopFirstButtonName = `Cancel`,
            creationPopSecondButtonName = `Create`, creationPopFirstButtonHandler, creationPopSecondButtonHandler,
            customField = 'default', afterClose, secondButtonDisable, inputMaxLength = "50",inputValue
        } = this.props
        return (
            <div className={'creation-pop-up'}>
                <Modal
                    title={creationPopUpTitle}
                    visible={creationPopUpVisibility}
                    onCancel={creationPopFirstButtonHandler}
                    afterClose={afterClose}
                    destroyOnClose={true}
                    footer={[
                        <Button key="cancel" onClick={(e) => creationPopFirstButtonHandler(e)}>
                            {creationPopFirstButtonName}
                        </Button>,
                        <Button key="create" onClick={(e) => creationPopSecondButtonHandler(e)}
                                type="primary" disabled={secondButtonDisable}>{creationPopSecondButtonName}</Button>,
                    ]}
                    centered>

                    {this.getRequiredFields(customField)}
                </Modal>

            </div>
        )
    }
}

export default CreationPopUp
