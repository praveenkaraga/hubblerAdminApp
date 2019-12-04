import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Modal, Button, Upload, Icon, message} from 'antd';
import './importUsersPopUp.scss'
import ImportUsersUploadPopUp from '../../common/ImportUsersUploadPopUp/ImportUsersUploadPopUp'

class ImportUsersPopUp extends Component {
    state = {
        loading: false,
        visible: false,
        fileList: [],
        uploading: false,
    };


    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 3000);
    };

    render() {
        const {visible, modalClose, onClickDownload, sampleExcelFile, onClickStartUpload, uploadPopUpData, uploadPopUpVisibility} = this.props;
        const {uploading, fileList} = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
        return <div>
            <Modal
                visible={visible}
                title="Import Users"
                onOk={this.handleOk}
                className={'import-users-modal'}
                onCancel={() => modalClose()}
                centered
                footer={[
                    <div>
                        <Button key="download" onClick={onClickDownload}>
                            <a href={sampleExcelFile || ''} download> Download Sample Excel</a>
                        </Button>

                    </div>,
                    <div>
                        <Button key="cancel" onClick={() => modalClose()}>
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            onClick={onClickStartUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </div>

                ]}
            >
                <div className={'import-user-modal-content'}>
                    <Upload {...props} className={'upload-wrap'}
                            accept={'.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'}>
                        <Button>
                            <Icon type="upload"/> Select File
                        </Button>
                    </Upload>
                </div>
            </Modal>

            {uploadPopUpVisibility ? <ImportUsersUploadPopUp uploadPopUpVisibility={uploadPopUpVisibility}
                                                             fileName={fileList[0].name}
                                                             uploadPopUpData={uploadPopUpData}/> : ''}


        </div>

    }
}

export default ImportUsersPopUp