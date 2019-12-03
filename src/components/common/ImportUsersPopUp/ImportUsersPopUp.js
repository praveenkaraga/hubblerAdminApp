import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Modal, Button,Upload, Icon, message} from 'antd';
import './importUsersPopUp.scss'

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
        const {visible, modalClose} = this.props;
        const { uploading, fileList } = this.state;
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
                        <Button key="download" onClick={this.handleCancel}>
                            Download Sample Excel
                        </Button>
                    </div>,
                    <div>
                        <Button key="cancel" onClick={() => modalClose()}>
                            Cancel
                        </Button>
                        {/*<Button disabled={true} key="upload" type="primary" loading={this.state.loading}
                                onClick={this.handleOk}>
                            Upload
                        </Button>*/}
                        <Button
                            type="primary"
                            onClick={this.handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </div>

                ]}
            >
                <div className={'import-user-modal-content'}>
                    <Upload {...props} className={'upload-wrap'}>
                        <Button className={'nusha'}>
                            <Icon type="upload" /> Select File
                        </Button>
                    </Upload>
                    {/*<Button key="choose" onClick={this.handleCancel} type={'file'}>
                       Choose File
                    </Button>*/}
                    {/*<div className={'file-content'}>Anusha</div>*/}
                </div>
            </Modal>
        </div>
    }
}

export default ImportUsersPopUp