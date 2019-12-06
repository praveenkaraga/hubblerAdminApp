import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Modal, Button, Upload, Icon, message, Select} from 'antd';
import './importUsersUploadPopUp.scss'
import map from 'lodash/map'

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

    render() {
        function onChange(value) {
            console.log(`selected ${value}`);
        }

        function onSearch(val) {
            console.log('search:', val);
        }

        function onBlur() {
            console.log('blur');
        }

        function onFocus() {
            console.log('focus')
        }

        const {uploadPopUpData} = this.props;
        console.log(this.props)
        return (
            <ul className={'excel-fields-list'}>
                {
                    map(uploadPopUpData.sheet_columns, function (ele, index) {
                        return (<li className={'excel-field-list-item'} key={index}>
                            <Select
                                showSearch
                                placeholder={ele.name}
                                style={{width: 300}}
                                className={'dropDown'}
                                optionFilterProp="children"
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                            <div className={'field-holder'}>{ele.name}
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
        const {uploadPopUpData} = this.props;
        return (
            <ul className={'sample-data-list'}>
                {
                    map(uploadPopUpData.sheet_columns, function (ele, index) {
                        return (<li className={'sample-data-list-item'} key={index}>
                            <div className={'field-holder'}>{ele.data}
                            </div>
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
        blur: false,
        visible: true,
    };

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

    activateBlur = (flag) => {
        this.setState({
            blur: flag,
        });
    }

    openAnotherFileModal =()=>{
        this.setState({
            open: true,
        });
    };

    handleCancel = () =>{
        this.setState({
            open: false,
        });
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
                            title="Basic Modal"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            centered
                            onCancel={this.handleCancel}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal> : ''
                    }
                    <div className={'upload-pop-header'}>
                        <div onClick={'file-name'}>{`File Name: ${fileName}`}</div>
                        <div className={'import-another-file'} onClick={()=>this.openAnotherFileModal()}>Import Another File</div>
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
                            <ExcelFieldsList {...this.props} activateBlur={this.activateBlur.bind(this)}/>
                            <SampleDataList {...this.props}/>
                        </div>
                    </div>

                </Modal>


            </div>
        )
    }
}

export default ImportUsersUploadPopUp