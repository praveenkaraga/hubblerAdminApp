import React, { Component } from 'react';
import { Input, Button, Tooltip } from 'antd';
import './userSearch.scss'


class UserSearch extends Component {

    constructor(props) {
        super(props);

        this.alluserActions = [
            {
                class: "user_activate",
                img: "user-activate",
                onclick: this.props.onUserActivate,
                tooltip: "Activate User"
            },
            {
                class: "user_deactivate",
                img: "user-deactivate",
                onclick: this.props.onUserDeactivate,
                tooltip: "Deactivate User"
            }, {
                class: "partition_div"
            },
            {
                class: "user_delete",
                img: "trash",
                onclick: this.props.onUserDelete,
                tooltip: "Delete User"
            },
            {
                class: "user_edit",
                img: "edit",
                onclick: this.props.onUserEdit,
                tooltip: "Edit User"
            }
        ]
    }


    debounce = (fn, time) => {
        let timeout;

        return function () {
            const functionCall = () => fn.apply(this, arguments);

            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        }
    }




    render() {

        const { firstButtonName, secondButtonName, searchPlaceHolder, firstButtonLoader, secondButtonLoader, searchLoader, onSearch, onClickFirst,
            onClickSecond, userSelected, isUserData = "false", onlySelectAndAdd = "false" } = this.props
        const endAction = !isUserData ? 3 : 0
        return (
            <div className={`search_and_buttons ${userSelected ? "user_selected" : "no_user_selected"}`}>
                <div className="search_users">
                    <Input.Search placeholder={searchPlaceHolder} loading={searchLoader} onChange={onSearch} />
                </div>
                <div className="all_buttons">
                    {userSelected && !onlySelectAndAdd ?
                        <div className="user_action_buttons">
                            <Tooltip key={`totalUserstooltip`} placement="top" title={"Total Users Selected"}>
                                <div className="user_count">{userSelected}</div>
                            </Tooltip>
                            {this.alluserActions.slice(endAction).map((data, i) => {
                                if (data.class !== "partition_div") {
                                    return (
                                        <Tooltip key={`${data.class}tooltip`} placement="top" title={data.tooltip}>
                                            <img className={data.class === "user_edit" && userSelected > 1 ? ` ${data.class} action_deactivated` : data.class}
                                                src={require(`../../../images/svg/${data.img}.svg`)} onClick={data.onclick} alt={data.class} />
                                        </Tooltip>
                                    )

                                } else {
                                    return (
                                        <div key={data.class} className={data.class}></div>
                                    )
                                }
                            }
                            )}
                        </div>
                        :
                        <>
                            <Button className={`import_button ${onlySelectAndAdd && !userSelected ? "import_button_disable" : ""}`} type="primary" loading={firstButtonLoader} onClick={onClickFirst}>
                                {firstButtonName}
                                {onlySelectAndAdd && userSelected ?
                                    <div>
                                        {userSelected}
                                    </div> : ""}
                            </Button>

                            {!onlySelectAndAdd ? <Button className="add_user_button" type="primary" loading={secondButtonLoader} onClick={onClickSecond}>
                                {secondButtonName}
                            </Button> : ""}

                        </>
                    }

                </div>
            </div>
        );
    }
}

export default UserSearch;
