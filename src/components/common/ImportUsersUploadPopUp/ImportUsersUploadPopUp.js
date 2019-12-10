import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Modal, Button, Upload, Icon, message, Select, Switch} from 'antd';
import './importUsersUploadPopUp.scss'
import map from 'lodash/map'
import find from 'lodash/find'
import {InlineModal, InlineModalBody, InlineModalButton, List} from 'react-starter-components'

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

class ExtendedInlineModalButton extends InlineModalButton {
    render() {
        const childNode = React.Children.only(this.props.children);
        return React.cloneElement(childNode, {
            onMouseOver: this.props.togglePopup,
            ref: element => this.rootEl = element
        });
    }
}


class ExcelFieldsList extends Component {
    onChange(index, ele, value) {
        let matchedObj = find(this.props.uploadPopUpData.sheet_columns, ['_id', value]);
        let dataObj = {
            value: value,
            index: index,
            ele: ele,
            patchData: matchedObj

        }
        this.props.setDropValue(dataObj)
        console.log(index)
    }


    onSearch() {
        console.log('searched')
    }

    render() {
        const {uploadPopUpData} = this.props;
        let _this = this
        return (
            <ul className={'excel-fields-list'}>
                {
                    map(uploadPopUpData.sheet_columns, function (ele, index) {
                        return (<li className={'excel-field-list-item'} key={index}>
                            <div className={'field-holder'}>
                                <Select
                                    showSearch
                                    placeholder={ele.name}
                                    style={{width: 300}}
                                    className={'dropDown'}
                                    optionFilterProp="children"
                                    onChange={_this.onChange.bind(_this, index, ele)}
                                    onSearch={_this.onSearch.bind(_this)}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {map(uploadPopUpData.sheet_columns_original, function (inele, inde) {
                                        return <Option value={inele._id} key={inele._id}>{inele.name}</Option>

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
        const {uploadPopUpData, dropDownObj} = this.props;
        console.log(dropDownObj);
        return (
            <ul className={'sample-data-list'}>
                {
                    map(uploadPopUpData.sheet_columns, function (ele, index) {
                        return (<li className={'sample-data-list-item'} key={index}>
                            {dropDownObj.index === index ?
                                <div className={'field-holder'}>{dropDownObj.patchData.data} </div> :
                                <div className={'field-holder'}>{ele.data} </div>}
                        </li>)
                    })
                }
            </ul>
        )
    }
}


class ImportUsersUploadPopUp extends Component {
    state = {
        uploading: false,
        visible: true,
        dropDownObj: {}
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
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    openAnotherFileModal = () => {
        this.setState({
            open: true,
        });
    };

    handleCancel = () => {
        this.setState({
            open: false,
        });
    }

    onChangeSwitch = (checked) => {
        console.log(`switch to ${checked}`);
    }


    render() {
        const {uploadPopUpData, fileName, uploadImportUsersPopUPVisibility} = this.props;
        return (
            <div>
                <Modal
                    title="IMPORT USERS"
                    visible={uploadPopUpData}
                    onOk={this.handleOk}
                    onCancel={() => uploadImportUsersPopUPVisibility()}
                    className={'upload-modal'}
                    footer={[
                        <div>
                            <Button key="cancel" onClick={() => uploadImportUsersPopUPVisibility()}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                loading={this.state.uploading}>
                                {this.state.uploading ? 'Processing' : 'Process'}
                            </Button>
                        </div>

                    ]}>
                    {this.state.open ?
                        <Modal
                            className={'import-another-file-modal'}
                            title="Import Another File"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            centered
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="ok" onClick={this.handleOk} className={'okay'}>
                                    Ok
                                </Button>,
                                <Button key="cancel" onClick={this.handleCancel}>
                                    Cancel
                                </Button>
                            ]}
                        >
                            Are you sure you want to cancel the Excel Upload and Import another file ?
                        </Modal> : ''
                    }
                    <div className={'upload-pop-header'}>
                        <div onClick={'file-name'}>{`File Name: ${fileName}`}</div>
                        <div className={'import-another-file'} onClick={() => this.openAnotherFileModal()}>Import
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
                            <ExcelFieldsList {...this.props} setDropValue={(obj) => this.setDropValue(obj)}/>
                            <SampleDataList {...this.props} dropDownObj={this.state.dropDownObj}/>
                        </div>
                    </div>

                </Modal>


            </div>
        )
    }
}

export default ImportUsersUploadPopUp