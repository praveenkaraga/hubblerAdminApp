import React, {Component} from 'react'
import '../../common/VehicleReimCreatePopUp/vehicleReimCreatePopUp.scss'
import {Button, Input, Modal, Radio,Checkbox} from "antd";
import 'antd/dist/antd.css';
import map from "lodash/map";

class MiscReimCreatePopUp extends Component{
    render() {
        const {createNewVisibility} = this.props
        return(
            <Modal
                title={'Create Reimbursement Profile - Miscellaneous'}
                visible={createNewVisibility}
                className={'leave-create-new-popup-modal'}
                /*
                                    onCancel={creationPopFirstButtonHandler}
                */
                destroyOnClose={true}
                footer={[
                    <Button key="cancel">Cancel</Button>,
                    <Button key="create" type="primary">Ok</Button>,
                ]}
                centered>
                <div className={'vehicle-content-wrap'}>
                    {/*<div className={'vehicle-icons'}></div>*/}
                    <div>
                        <div className={'field-wrap'}>
                            <div className={'header'}>Card Name</div>
                            <Input placeholder={'Enter Card Name'} className={'preferred-field-class'}/>
                        </div>
                        <div className={'link-to-trip-meter'}>
                            <Checkbox onChange={this.onChangeLinkToTripMeter}>Link to Trip Meter</Checkbox>
                        </div>
                    </div>
                </div>

            </Modal>
        )
    }

}

export default MiscReimCreatePopUp