import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Modal, Button, Upload, Icon, message, Select, Switch} from 'antd';
import './importUsersUploadPopUp.scss'
import map from 'lodash/map'
import find from 'lodash/find'
import slice from 'lodash/slice'
import fill from 'lodash/fill'
import isEmpty from 'lodash/isEmpty'
import compact from 'lodash/compact'
import omit from 'lodash/omit'

const {Option} = Select;


class SystemFieldsList extends Component {
    render() {
        const {uploadPopUpData} = this.props;
        return (
            <ul className={'system-fields-List'}>
                {
                    map(uploadPopUpData.fields, function (ele, index) {
                        return (<li className={'system-field-list-item'} key={ele.name}>
                            <div className={'field-holder'}>{ele.title}
                                {ele.required ? <em>*</em> : ''}
                            </div>
                        </li>)
                    })
                }
            </ul>
        )
    }
}

class ExcelFieldsList extends Component {
    onChange(index, ele, mappings,slicedDataFilled, value) {
        const {uploadPopUpData} = this.props;

        let matchedObj = find(this.props.uploadPopUpData.sheet_columns, ['_id', value]);
        let dataObj = {
            value: value,
            index: index,
            ele: ele,
            patchData: matchedObj
        };

        let test = map(slicedDataFilled,item=>{
            if(item._id === dataObj.ele._id){
                return {...item , data:  dataObj.patchData.data}
            }else{
                return item
            }
        })

        console.log(test)

        let dob = map(mappings, function (inEle, ind) {
            if (index === ind) {
                return {...inEle, matchedId: value}
            } else {
                return {...inEle}
            }
        })

        this.props.setDropValue(dataObj, dob);
    }


    onSearch() {
        console.log('searched')
    }

    render() {
        const {uploadPopUpData, switchStatus, mappings} = this.props;
        let slicedData = slice(uploadPopUpData.sheet_columns, 0, uploadPopUpData.fields.length)
        let count = slicedData.length < uploadPopUpData.fields.length ? uploadPopUpData.fields.length - slicedData.length : ''
        let fillArrayData = fill(Array(count), {columnName: 'None', name: "None"})
        let slicedDataFilled = count ? slicedData.concat(fillArrayData) : slicedData
        let _this = this
        return (
            <ul className={'excel-fields-list'}>
                {
                    map(slicedDataFilled, function (ele, index) {
                        return (<li className={'excel-field-list-item'} key={index}>
                            <div className={'field-holder'}>
                                <Select
                                    showSearch
                                    placeholder={switchStatus ? ele.name : `Column ${ele.columnName}`}
                                    style={{width: 300}}
                                    className={'dropDown'}
                                    optionFilterProp="children"
                                    onChange={_this.onChange.bind(_this, index, ele, mappings,slicedDataFilled)}
                                    onSearch={_this.onSearch.bind(_this)}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {map(uploadPopUpData.sheet_columns_original, function (inele, inde) {
                                        return <Option value={inele._id}
                                                       key={inele._id}>{switchStatus ? inele.name : `Column ${inele.columnName}`}</Option>
                                    })}
                                </Select>
                            </div>
                        </li>)
                    })
                }
            </ul>
        )
    }
}

class SampleDataList extends Component {
    render() {
        const {uploadPopUpData, dropDownObj, switchStatus,mappings} = this.props;
        let slicedData = slice(uploadPopUpData.sheet_columns, 0, uploadPopUpData.fields.length);
        console.log(slicedData)
        let count = slicedData.length < uploadPopUpData.fields.length ? uploadPopUpData.fields.length - slicedData.length : ''
        let fillArrayData = fill(Array(count), {data: 'None', name: "None"})
        let slicedDataFilled = count ? slicedData.concat(fillArrayData) : slicedData
        return (
            <ul className={'sample-data-list'}>
                {
                    map(slicedDataFilled, function (ele, index) {
                        return (<li className={'sample-data-list-item'} key={index}>
                            {dropDownObj.index === index ?
                                <div
                                    className={'field-holder nush'}>{switchStatus ? dropDownObj.patchData.data : dropDownObj.patchData.name} </div> :
                                <div className={'field-holder nush'}>{switchStatus ? ele.data : ele.name} </div>}
                        </li>)
                    })
                }
            </ul>
        )
    }
}


class ImportUsersUploadPopUp extends Component {
    state = {
        visible: true,
        dropDownObj: {},
        switchStatus: true,
        mappings: [],
        uploadOption: 'create',
        reqFieldIds: [],
        activateCancel: false,
    };

    setDropValue = (dataObj, dob) => {
        this.setState({
                dropDownObj: dataObj,
                mappings: dob,
            }
        )
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        let _this = this
        const {importUsersPopUpCloseHandler, uploadProps, sampleExcelFile, modalClose, isFileUploaded, commonAction} = _this.props
        importUsersPopUpCloseHandler() //importUsersPopUpCloseHandler //uploadImportUsersPopUPVisibility
        uploadProps.onRemove(sampleExcelFile)
        if (_this.state.activateCancel || isFileUploaded) {
            modalClose()
        }
        commonAction({isFileUploaded: false})
        this.setState({
            visible: false,
        });
    };

    openSubModal = (type) => {
        let activateCancel = '';
        if (type === 'importUser') {
            activateCancel = true
        } else {
            activateCancel = false
        }
        this.setState({
            open: true,
            activateCancel: activateCancel
        });
    };

    handleCancel = () => {
        this.setState({
            open: false,
        });
    }

    onChangeSwitch = (checked) => {
        this.setState({
            switchStatus: checked
        })
        console.log(`switch to ${checked}`);
    }

    getMatchedFieldsId(data, index) {
        let matchedData = find(data, function (ele, ind) {
            if (index === ind) {
                return ele
            }
        })
        return matchedData ? matchedData._id : ''
    }

    processImportUsersData = () => {
        const {uploadPopUpData, patchImportUsersDataHandler, importUsersUploadResponseData, commonTeamReducerAction} = this.props;
        let _this = this
        let addingUpdatedBy = this.state.mappings.map(function (ele) {
            var result = _this.state.reqFieldIds.filter(inEle => inEle === ele._id);
            if (result.length > 0) {
                ele.update_by = true;
            }
            return ele
        })
        let omitIndexes = map(addingUpdatedBy, item => omit(item, 'index'));
        // commonTeamReducerAction({uploadFileStatus: 'true'});
        /*let patchData = {
            mappings: omitIndexes,
            skip_first_row: true,
            upload_type: this.state.uploadOption,
        }*/
        // patchImportUsersData(uploadPopUpData._id, patchData,)
        patchImportUsersDataHandler(uploadPopUpData._id, omitIndexes, true, this.state.uploadOption)
    }

    componentDidMount() {
        let _this = this
        let mappingData = map(_this.props.uploadPopUpData.fields, function (ele, index) {
            return {
                _id: ele._id,
                index: index,
                matchedId: _this.getMatchedFieldsId(_this.props.uploadPopUpData.sheet_columns, index)
            }
        })

        let reqFields = map(_this.props.uploadPopUpData.fields, function (ele) {
            if (ele.required) {
                return ele
            }
        });
        this.setState({
                mappings: mappingData,
                reqFields: compact(reqFields),
            }
        )
    }

    uploadOptionChange(value) {
        let _this = this
        _this.setState({
            uploadOption: value
        })
    }

    uploadUpdateOptionChange(value) {
        this.setState({
            reqFieldIds: value
        })
    }


    onCloseHandler = () => {
        const {isFileUploaded, importUsersUploadPopUpHeaderFirstButtonHandler} = this.props
        if (isFileUploaded) {
            this.handleOk()
        } else {
            this.openSubModal('importUser')
        }
        if (importUsersUploadPopUpHeaderFirstButtonHandler) {
            importUsersUploadPopUpHeaderFirstButtonHandler()
        }
    }

    onCancelHandler = () => {
        const {importUsersUploadPopUpFooterFirstButtonHandler} = this.props
        if (importUsersUploadPopUpFooterFirstButtonHandler) {
            importUsersUploadPopUpFooterFirstButtonHandler()
        }
        this.openSubModal('importUser')
    }

    headerFirstButtonClick = () => {
        this.openSubModal('importFile')
    }

    footerSecondButtonClick = () => {
        const {importUsersUploadPopUpFooterSecondButtonHandler} = this.props
        this.processImportUsersData() //patchImportUsersData
        if (importUsersUploadPopUpFooterSecondButtonHandler) {
            importUsersUploadPopUpFooterSecondButtonHandler()
        }
    }

    render() {
        const {importUsersUploadResponseData, uploadFileLoadingStatus, isFileUploaded} = this.props;
        const {importUsersUploadPopUpHeaderFirstButtonHandler, importUsersUploadPopUpFooterFirstButtonHandler, importUsersUploadPopUpFooterSecondButtonHandler} = this.props
        const {
            importUsersUploadPopUpVisibility = false, importUsersUploadPopUpTitle = "IMPORT USERS", uploadPopUpData, fileName, importUsersUploadPopUpHeaderFirstButtonName = `Import Another File`, importUsersUploadPopUpFooterFirstButtonName = `Cancel`, importUsersUploadPopUpFooterSecondButtonName = `Process`, uploadingStatusText = 'Processing', footerSecondButtonPopUpTitle = `Import Status`, footerSecondButtonPopUpPrimaryButtonName = `Download Error Log`, footerSecondButtonPopUpSecondaryButtonName = `Done`, footerFirstButtonConfirmationPopUpTitle = `Cancel Excel Upload`, headerFirstButtonConfirmationPopUpTitle = `Import Another File`, confirmationPopUpPrimaryButtonName = `Cancel`, footerFirstButtonConfirmationPopUpSecondaryButtonName = `Ok`, headerFirstButtonConfirmationPopUpSecondaryButtonName = `Import`, headerFirstButtonConfirmationPopUpBodyText = `Are you sure you want to cancel the Excel Upload and Import another file ?`, footerFirstButtonConfirmationPopUpBodyText = `Are you sure you want to cancel the Excel Upload?`
        } = this.props
        let _this = this;
        return (
            <div>
                <Modal
                    title={isFileUploaded ? footerSecondButtonPopUpTitle : importUsersUploadPopUpTitle}
                    visible={importUsersUploadPopUpVisibility}
                    onOk={this.handleOk}
                    onCancel={this.onCloseHandler}
                    centered={isFileUploaded ? true : false}
                    className={isFileUploaded ? 'upload-modal import-status-pop' : 'upload-modal'}
                    footer={isFileUploaded ? [
                        <div className={'import-status-footer'}>
                            <Button key="cancel">
                                <a href={importUsersUploadResponseData.error_file || ''}
                                   download>{footerSecondButtonPopUpPrimaryButtonName}</a>
                            </Button>
                            <Button onClick={this.handleOk}>{footerSecondButtonPopUpSecondaryButtonName}</Button>
                        </div>

                    ] : [<div>
                        <Button key="cancel" onClick={this.onCancelHandler}>
                            {importUsersUploadPopUpFooterFirstButtonName}
                        </Button>
                        <Button
                            onClick={this.footerSecondButtonClick}
                            type="primary"
                            loading={uploadFileLoadingStatus}>
                            {uploadFileLoadingStatus ? uploadingStatusText : importUsersUploadPopUpFooterSecondButtonName}
                        </Button>
                    </div>]}>
                    {this.state.open ?
                        <Modal
                            className={'import-another-file-modal'}
                            title={this.state.activateCancel ? footerFirstButtonConfirmationPopUpTitle : headerFirstButtonConfirmationPopUpTitle}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            centered
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="cancel" onClick={this.handleCancel}>
                                    {confirmationPopUpPrimaryButtonName}
                                </Button>,
                                <Button key="ok" onClick={this.handleOk} className={'okay'}>
                                    {this.state.activateCancel ? footerFirstButtonConfirmationPopUpSecondaryButtonName : headerFirstButtonConfirmationPopUpSecondaryButtonName}
                                </Button>,
                            ]}
                        >
                            {this.state.activateCancel ? footerFirstButtonConfirmationPopUpBodyText : headerFirstButtonConfirmationPopUpBodyText}
                            {/*{`Are you sure you want to cancel the ${this.state.activateCancel ? 'Excel Upload ' : 'Excel Upload and Import another file ?'}`}*/}
                        </Modal> : ''
                    }
                    {isFileUploaded ? <div>
                        {isEmpty(importUsersUploadResponseData.result) ? '' : <div>
                            <div>{`Success : ${importUsersUploadResponseData.result[0].created} ${importUsersUploadResponseData.result[0].lbl} Created`}</div>
                            <div>{`Failure : ${importUsersUploadResponseData.result[0].invalid} ${importUsersUploadResponseData.result[0].lbl} Created`}</div>
                        </div>}

                    </div> : <div>
                        <div className={'upload-pop-header'}>
                            <div onClick={'file-name'}>{`File Name: ${fileName}`}</div>
                            <Button key="importFile" onClick={this.headerFirstButtonClick}
                                    className={'import-another-file'}>
                                {importUsersUploadPopUpHeaderFirstButtonName}
                            </Button>
                        </div>
                        <div className={'switch-type'}>
                            <Switch defaultChecked onChange={this.onChangeSwitch}/>
                            <div className={'switch-type-text'}>First row contains field names</div>
                        </div>
                        <div className={'upload-option-wrap'}>
                            <div>
                                <div>Upload Option</div>
                                <Select defaultValue="create" onChange={_this.uploadOptionChange.bind(_this)}
                                        className={'upload-option-select'}>
                                    <Option value="create">Create</Option>
                                    <Option value="update">Update</Option>
                                    <Option value="updateOrCreate">Update Or Create</Option>
                                </Select>
                            </div>
                            {this.state.uploadOption === 'update' || this.state.uploadOption === 'updateOrCreate' ?
                                <div className={'update-create'}>
                                    <div>Select reference fields to find reports</div>
                                    <div>
                                        <Select onChange={_this.uploadUpdateOptionChange.bind(_this)}
                                                mode="multiple"
                                                placeholder={'Select'}
                                                className={'upload-update-select'}>
                                            {map(this.state.reqFields, function (inele, inde) {
                                                return <Option value={inele._id}
                                                               key={inele._id}>{inele.title}</Option>

                                            })}
                                        </Select>
                                    </div>
                                </div> : ''}

                        </div>
                        <hr className={'divider'}/>
                        <div className={'record-count-wrap'}>1 Record Found</div>
                        <div className={this.state.blur ? 'records-wrap-blurred' : 'records-wrap'}>
                            <div className={'records-header-wrap'}>
                                <div className={'record-headings'}>System Fields</div>
                                <div className={'record-headings'}>Excel Fields (Select To Change)</div>
                                <div className={'record-headings'}>Sample Data From The Excel</div>
                            </div>
                            <div className={'record-content-wrap'}>
                                <SystemFieldsList {...this.props}/>
                                <ExcelFieldsList {...this.props}
                                                 setDropValue={(obj,arr) => this.setDropValue(obj,arr)}{...this.state}/>
                                <SampleDataList {...this.props} {...this.state}/>
                            </div>
                        </div>
                    </div>}
                </Modal>
            </div>
        )
    }
}

export default ImportUsersUploadPopUp