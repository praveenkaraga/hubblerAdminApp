import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Modal, Button, Upload, Icon, message, Select, Switch} from 'antd';
import './importUsersUploadPopUp.scss'
import map from 'lodash/map'
import find from 'lodash/find'
import slice from 'lodash/slice'
import fill from 'lodash/fill'
import isEmpty from 'lodash/isEmpty'

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
    onChange(index, ele, mappings, value) {
        let matchedObj = find(this.props.uploadPopUpData.sheet_columns, ['_id', value]);
        let dataObj = {
            value: value,
            index: index,
            ele: ele,
            patchData: matchedObj
        };
        let dob = map(mappings, function (inEle, ind) {
            if (index === ind) {
                return {...inEle, matchedId: value}
            } else {
                return {...inEle}
            }
        })

        this.props.setDropValue(dataObj);
        console.log(dob)
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
                                    onChange={_this.onChange.bind(_this, index, ele, mappings)}
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
        const {uploadPopUpData, dropDownObj, switchStatus} = this.props;
        let slicedData = slice(uploadPopUpData.sheet_columns, 0, uploadPopUpData.fields.length);
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
                                    className={'field-holder'}>{switchStatus ? dropDownObj.patchData.data : dropDownObj.patchData.name} </div> :
                                <div className={'field-holder'}>{switchStatus ? ele.data : ele.name} </div>}
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
        mappings: []
    };

    setDropValue = (dataObj) => {
        this.setState({
                dropDownObj: dataObj
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
        const {uploadImportUsersPopUPVisibility, uploadProps, sampleExcelFile, modalClose,importStatus} = _this.props
        uploadImportUsersPopUPVisibility()
        uploadProps.onRemove(sampleExcelFile)
        if (_this.state.activateCancel || importStatus) {
            modalClose()
        }
        this.setState({
            visible: false,
        });
    };

    openSubModal = (type) => {
        let activateCancel = ''
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
        const {uploadPopUpData, patchImportUsersData, importUsersUploadResponseData, commonTeamReducerAction} = this.props;
        commonTeamReducerAction({uploadFileStatus: 'true'})
        let patchData = {
            mappings: this.state.mappings,
            skip_first_row: true,
            upload_type: "create",
        }
        patchImportUsersData(uploadPopUpData._id, patchData)

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
        this.setState({
                mappings: mappingData
            }
        )
    }

    render() {
        const {uploadPopUpData, fileName, importUsersUploadResponseData, uploadFileStatus, importStatus} = this.props;
        let _this = this;
        console.log(importStatus)
        return (
            <div>
                <Modal
                    title={importStatus ? 'Import Status' : "IMPORT USERS"}
                    visible={uploadPopUpData}
                    onOk={this.handleOk}
                    onCancel={importStatus ? this.handleOk :() => this.openSubModal('importUser')}
                    centered={importStatus ? true : false}
                    className={importStatus  ? 'upload-modal import-status-pop': 'upload-modal'}
                    footer={importStatus ? [
                        <div className={'import-status-footer'}>
                            <Button key="cancel">
                                <a href={importUsersUploadResponseData.error_file || ''} download> Download Error
                                    Log</a>
                            </Button>
                            <Button onClick={this.handleOk}>Done</Button>
                        </div>

                    ] : [
                        <div>
                            <Button key="cancel" onClick={() => this.openSubModal('importUser')}>
                                Cancel
                            </Button>
                            <Button
                                onClick={_this.processImportUsersData}
                                type="primary"
                                loading={uploadFileStatus}>
                                {uploadFileStatus ? 'Processing' : 'Process'}
                            </Button>
                        </div>

                    ]}>
                    {this.state.open ?
                        <Modal
                            className={'import-another-file-modal'}
                            title={this.state.activateCancel ? 'Cancel Excel Upload' : "Import Another File"}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            centered
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="cancel" onClick={this.handleCancel}>
                                    Cancel
                                </Button>,
                                <Button key="ok" onClick={this.handleOk} className={'okay'}>
                                    {this.state.activateCancel ? 'Ok' : 'Import'}
                                </Button>,
                            ]}
                        >
                            {`Are you sure you want to cancel the ${this.state.activateCancel ? 'Excel Upload ' : 'Excel Upload and Import another file ?'}`}
                        </Modal> : ''
                    }
                    {importStatus ? <div>
                        {isEmpty(importUsersUploadResponseData.result) ? '' : <div>
                            <div>{`Success : ${importUsersUploadResponseData.result[0].created} ${importUsersUploadResponseData.result[0].lbl} Created`}</div>
                            <div>{`Failure : ${importUsersUploadResponseData.result[0].invalid} ${importUsersUploadResponseData.result[0].lbl} Created`}</div>
                        </div>}

                    </div> : <div>
                        <div className={'upload-pop-header'}>
                            <div onClick={'file-name'}>{`File Name: ${fileName}`}</div>
                            <div className={'import-another-file'}
                                 onClick={() => this.openSubModal('importFile')}>Import
                                Another File
                            </div>
                        </div>
                        <div className={'switch-type'}>
                            <Switch defaultChecked onChange={this.onChangeSwitch}/>
                            <div className={'switch-type-text'}>First row contains field names</div>
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
                                                 setDropValue={(obj) => this.setDropValue(obj)}{...this.state}/>
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