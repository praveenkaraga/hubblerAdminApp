import React, { Component } from 'react';
import { Input, Button } from 'antd';
import './userSearch.scss'


class UserSearch extends Component {




    render() {

        const { fristButtonName, secondButtonName, searchPlaceHolder, fristButtonLoader, secondButtonLoader, searchLoader, onSearch, onClickFirst, onClickSecond } = this.props
        return (
            <div className="search_and_buttons">
                <div className="search_users">
                    <Input.Search placeholder={searchPlaceHolder} loading={fristButtonLoader} onChange={onSearch} />
                </div>
                <div className="all_buttons">
                    <Button className="import_button" type="primary" loading={secondButtonLoader} onClick={onClickFirst}>
                        {fristButtonName}
                    </Button>
                    <Button className="add_user_button" type="primary" loading={searchLoader} onClick={onClickSecond}>
                        {secondButtonName}
                    </Button>
                </div>
            </div>
        );
    }
}

export default UserSearch;
