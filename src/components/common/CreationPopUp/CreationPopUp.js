import React, {Component} from "react";
import {Button, Input, Modal} from "antd";

class CreationPopUp extends Component {
    getRequiredFields = (customField) =>{
        switch (customField) {
            case 'add' : {
                return <div>

                </div>
            }
            case 'edit' : {
                return <div>

                </div>
            }
            default :{
                return <div>

                </div>
            }
        }
    };


    render() {
        const {creationPopUpTitle, firstButtonName, secondButtonName, firstButtonHandler, secondButtonHandler,customField} = this.props

        return (
            <div className={'creation-pop-up'}>
                <Modal
                    title="Add New Department"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={() => this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="create" onClick={this.createDepartment.bind(this)}
                                type="primary">Create</Button>,
                    ]}
                    centered>

                    <div>Department Name</div>
                    <Input placeholder="Enter Department" className={'department-name-input'}
                           onChange={this.onInputChange}/>

                    {this.getRequiredFields(customField)}
                </Modal>

            </div>
        )
    }
}

export default CreationPopUp
