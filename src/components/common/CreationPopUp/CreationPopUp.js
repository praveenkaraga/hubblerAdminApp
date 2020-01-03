import React, {Component} from "react";
import {Button, Input, Modal} from "antd";
import './creationPopUp.scss'

class CreationPopUp extends Component {
    getRequiredFields = (customField) =>{
        const {creationPopUpFirstFieldChangeHandler,fieldHeader,fieldPlaceHolder} = this.props
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
                    <div>{fieldHeader}</div>
                    <Input placeholder={fieldPlaceHolder} className={'preferred-field-class'}
                           onChange={creationPopUpFirstFieldChangeHandler}/>
                </div>
            }
        }
    };


    render() {
        const {creationPopUpVisibility = false,creationPopUpTitle = `Add New Department`, creationPopFirstButtonName = `Cancel`, creationPopSecondButtonName = `Create`, creationPopFirstButtonHandler, creationPopSecondButtonHandler,customField,creationPopUpFirstFieldChangeHandler} = this.props
        return (
            <div className={'creation-pop-up'}>
                <Modal
                    title={creationPopUpTitle}
                    visible={creationPopUpVisibility}
                    onCancel={creationPopFirstButtonHandler}
                    footer={[
                        <Button key="cancel" onClick={() => creationPopFirstButtonHandler()}>
                            {creationPopFirstButtonName}
                        </Button>,
                        <Button key="create" onClick={() => creationPopSecondButtonHandler()}
                                type="primary">{creationPopSecondButtonName}</Button>,
                    ]}
                    centered>

                    {this.getRequiredFields(customField)}
                </Modal>

            </div>
        )
    }
}

export default CreationPopUp
