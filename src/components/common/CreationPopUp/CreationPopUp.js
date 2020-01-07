import React, { Component } from "react";
import { Button, Input, Modal } from "antd";
import './creationPopUp.scss'

class CreationPopUp extends Component {
    getRequiredFields = (customField) => {
        const { creationPopUpFirstFieldChangeHandler, fieldHeader, fieldPlaceHolder, inputValue } = this.props
        switch (customField) {
            case 'add': {
                return <div>

                </div>
            }
            case 'edit': {
                return <div>

                </div>
            }
            default: {
                return <div>
                    <div>{fieldHeader}</div>
                    <Input placeholder={fieldPlaceHolder} className={'preferred-field-class'}
                        onChange={creationPopUpFirstFieldChangeHandler} value={inputValue} />
                </div>
            }
        }
    };


    render() {
        const { creationPopUpVisibility = false, creationPopUpTitle = `Add New Department`, creationPopFirstButtonName = `Cancel`,
            creationPopSecondButtonName = `Create`, creationPopFirstButtonHandler, creationPopSecondButtonHandler,
            customField, afterClose, secondButtonDisable } = this.props
        return (
            <div className={'creation-pop-up'}>
                <Modal
                    title={creationPopUpTitle}
                    visible={creationPopUpVisibility}
                    onCancel={creationPopFirstButtonHandler}
                    afterClose={afterClose}
                    footer={[
                        <Button key="cancel" onClick={() => creationPopFirstButtonHandler()}>
                            {creationPopFirstButtonName}
                        </Button>,
                        <Button key="create" onClick={() => creationPopSecondButtonHandler()}
                            type="primary" disabled={secondButtonDisable}>{creationPopSecondButtonName}</Button>,
                    ]}
                    centered >

                    {this.getRequiredFields(customField)}
                </Modal>

            </div>
        )
    }
}

export default CreationPopUp
