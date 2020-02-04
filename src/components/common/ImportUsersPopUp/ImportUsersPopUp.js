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

    closeModal = (uploadProps) => {
        let _this = this
        _this.props.thirdButtonClickHandler()
        uploadProps.onRemove(_this.props.sampleExcelFile)
    };


    render() {
        const {visible, modalClose, firstButtonName = `Select File`, secondButtonName = 'Download Sample Excel', secondButtonClickHandler, thirdButtonName = `Cancel`, thirdButtonClickHandler, fourthButtonOnLoadingText = `Uploading`, fourthButtonName = `Start Upload`, fourthButtonClickHandler, fourthButtonLoaderStatus = false, sampleExcelFile, onClickStartUpload, uploadPopUpData, importUsersUploadPopUpVisibility, importUsersPopUpCloseHandler, patchImportUsersDataHandler, importUsersUploadResponseData, uploadFileLoadingStatus, commonAction, isFileUploaded, importUsersUploadPopUpHeaderFirstButtonHandler} = this.props;
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
                onCancel={() => this.closeModal(props)}
                centered
                footer={[
                    <div>
                        <Button key="download" onClick={secondButtonClickHandler}>
                            <a href={sampleExcelFile || ''} download> {secondButtonName}</a>
                        </Button>

                    </div>,
                    <div>
                        <Button key="cancel" onClick={() => this.closeModal(props)}>
                            {thirdButtonName}
                        </Button>
                        <Button
                            type="primary"
                            onClick={fourthButtonClickHandler}
                            disabled={fileList.length === 0}
                            loading={fourthButtonLoaderStatus}>
                            {fourthButtonLoaderStatus ? fourthButtonOnLoadingText : fourthButtonName}
                        </Button>
                    </div>

                ]}
            >
                <div className={'import-user-modal-content'}>
                    <Upload {...props} className={'upload-wrap'}
                            accept={'.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'}>
                        <Button>
                            <Icon type="upload"/> {firstButtonName}
                        </Button>
                    </Upload>
                </div>
            </Modal>

            {importUsersUploadPopUpVisibility ?
                <ImportUsersUploadPopUp importUsersUploadPopUpVisibility={importUsersUploadPopUpVisibility}
                                        importUsersPopUpCloseHandler={importUsersPopUpCloseHandler}
                                        fileName={fileList[0] ? fileList[0].name : ''}
                                        modalClose={thirdButtonClickHandler}
                                        uploadProps={props}
                                        sampleExcelFile={sampleExcelFile}
                                        uploadPopUpData={uploadPopUpData}
                                        patchImportUsersDataHandler={patchImportUsersDataHandler}
                                        importUsersUploadResponseData={importUsersUploadResponseData}
                                        uploadFileLoadingStatus={uploadFileLoadingStatus}
                                        commonAction={commonAction}
                                        isFileUploaded={isFileUploaded}
                                        importUsersUploadPopUpHeaderFirstButtonHandler={importUsersUploadPopUpHeaderFirstButtonHandler}/> : ''}
        </div>

    }
}

export default ImportUsersPopUp