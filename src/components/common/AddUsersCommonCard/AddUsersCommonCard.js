import React, {Component} from 'react';
import './addUsersCommonCard.scss'
import {Button} from "antd";
import 'antd/dist/antd.css';


class AddUsersCommonCard extends Component {
    render() {
        const {titleName = 'Users', profileType = 'Holiday',addUsersCardTitle = `Add ${titleName}`, addUsersCardSubText = `You don't have any ${titleName} here. Please add from the ${titleName} list.`, buttonName = `Add from ${titleName} List`, addUsersCommonCardButtonClick, secondButton = false , secondButtonName = `Create New ${profileType}`} = this.props;
        return (
            <div className={'add-users-common-card'}>
                <div className={'header'}>{addUsersCardTitle}</div>
                <div className={'icon-mini'}></div>
                <div className={'text'}>{addUsersCardSubText}</div>
                <div className={'common-card-buttons-wrap'}>
                <Button key="addUsers" type="primary" onClick={addUsersCommonCardButtonClick}
                        className={'add-users-common-card-button'}>
                    {buttonName} </Button>

                    {secondButton ? <Button key="addUsers" type="primary" onClick={addUsersCommonCardButtonClick}
                                            className={'add-users-common-card-button'}>
                        {secondButtonName} </Button> : ''}</div>
            </div>
        )
    }
}

export default AddUsersCommonCard
