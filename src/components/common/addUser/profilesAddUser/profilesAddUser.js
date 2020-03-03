import React, { Component } from 'react';
import CustomSearch from '../../CustomSearch/customSearch'
import './profilesAddUser.scss'
import { Table, Select } from 'antd';
const { Option } = Select;

const columns = [
    {
        title: 'Profile Type',
        dataIndex: 'name'
    },
    {
        title: 'Profile Name',
        dataIndex: 'profile_name',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown'
    },
    {
        key: '2',
        name: 'Jim Green'

    },
    {
        key: '3',
        name: 'Joe Black'

    },
    {
        key: '4',
        name: 'Disabled User'
    },
];




class ProfilesAddUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onChangeProfileSearch = (e) => {
        console.log(e.target.value)
    }


    modellingData = (data) => {
        const copiedData = JSON.parse(JSON.stringify(data))
        copiedData.forEach(singleData => {
            singleData["profile_name"] =
                <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select a Profile Name"
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
        })
        return copiedData
    }

    render() {

        const finalData = this.modellingData(data)
        return (
            <div className="profileAddUser_main">
                <div className="profileAddUser_container">
                    <h3 className="main_heading">Profiles</h3>
                    <CustomSearch searchPlaceHolder="Search Profiles" onSearch={this.onChangeProfileSearch} />
                    <Table pagination={{ position: 'none' }}
                        columns={columns}
                        dataSource={finalData}
                        footer={() => ""}
                        scroll={{ y: "unset" }}
                        className={"profileAddUser_table"}
                    />
                </div>
            </div>
        );
    }
}

export default ProfilesAddUsers;