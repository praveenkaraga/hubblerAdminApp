import React, { Component } from 'react';
import { Input, Button } from 'antd';
import './userSearch.scss'


class UserSearch extends Component {




    debounce = (fn, time) => {
        let timeout;

        return function () {
            const functionCall = () => fn.apply(this, arguments);

            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        }
    }


    render() {

        const { firstButtonName, secondButtonName, searchPlaceHolder, firstButtonLoader, secondButtonLoader, searchLoader, onSearch, onClickFirst, onClickSecond } = this.props
        return (
            <div className="search_and_buttons">
                <div className="search_users">
                    <Input.Search placeholder={searchPlaceHolder} loading={searchLoader} onChange={onSearch} />
                </div>
                <div className="all_buttons">
                    <Button className="import_button" type="primary" loading={firstButtonLoader} onClick={onClickFirst}>
                        {firstButtonName}
                    </Button>
                    <Button className="add_user_button" type="primary" loading={secondButtonLoader} onClick={onClickSecond}>
                        {secondButtonName}
                    </Button>
                </div>
            </div>
        );
    }
}

export default UserSearch;
