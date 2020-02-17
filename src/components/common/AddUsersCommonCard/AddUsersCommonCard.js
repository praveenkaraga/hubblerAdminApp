import React, {Component} from 'react';
import './addUsersCommonCard.scss'
import {Button} from "antd";
import 'antd/dist/antd.css';


class AddUsersCommonCard extends Component {
    render() {
        const {titleName = 'Users', addUsersCardTitle = `Add ${titleName}`, addUsersCardSubText = `You don't have any ${titleName} here. Please add from the ${titleName} list.`, buttonName = `Add from ${titleName} List`, addUsersCommonCardButtonClick} = this.props;
        return (
            <div className={'add-users-common-card'}>
                <div className={'header'}>{addUsersCardTitle}</div>
                <div className={'icon-mini'}></div>
                <div className={'text'}>{addUsersCardSubText}</div>
                <Button key="addUsers" type="primary" onClick={addUsersCommonCardButtonClick}
                        className={'add-users-common-card-button'}>
                    {buttonName} </Button>
            </div>
        )
    }

}

export default AddUsersCommonCard
