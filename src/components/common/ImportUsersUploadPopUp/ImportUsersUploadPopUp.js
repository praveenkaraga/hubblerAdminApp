import React , {Component} from 'react'
import 'antd/dist/antd.css';
import {Modal, Button, Upload, Icon, message} from 'antd';


class ImportUsersUploadPopUp extends Component{
    state = { visible: true };

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

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const {uploadPopUpData} = this.props
        return(
            <div>
                <Modal
                    title="Basic Modal"
                    visible={uploadPopUpData}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={600}>
                    {uploadPopUpData._id}
                </Modal>
            </div>
        )
    }
}

export default ImportUsersUploadPopUp