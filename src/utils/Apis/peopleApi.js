
import axios from "axios";
import { axiosConfig } from '../helper'


axios.defaults.proxy = true;


//--------------------Console API'S------------------------------------------------------------------
export const getUsers = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/rest/users/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || "dsc"}&filterKey=${searchData ? "searchAll" : "_id"}&filterQuery=${searchData || ""}&version=1`, axiosConfig);
};
//XXXXXXXXXXXXXXXXX---End of Console API'S------XXXXXXXXXXXXXXXXXXXXXXXXX



//--------------------TEAM VIEW API'S------------------------------------------------------------------
export const getTeamViewUsers = () => { //to get the team views users data
    return axios.get("/reportees/orgchart//?sortKey=name&sortOrder=asc&filterKey=id&filterQuery=", axiosConfig);
};

export const getClickedTeamViewUser = (id) => { //to get the clicked team-view users's data
    return axios.get(`/rest/users/${id}/?page=`, axiosConfig);
};

export const getClickedTeamViewOrgData = (url) => { //to get the clicked team-view users's oraganization data
    return axios.get(url, axiosConfig);
};

export const getClickedUserReporteeData = (id) => { //to get the clicked team-view users's reportees data
    return axios.get(`/reportees/orgchart/${id}/?sortKey=name&sortOrder=asc&filterKey=id&filterQuery=`, axiosConfig);
};
//XXXXXXXXXXXXXXXXX---END OF TEAM VIEW API'S------XXXXXXXXXXXXXXXXXXXXXXXXX






//-----------------------------Import Users Api------------------------------
export const downloadExcelCall = (id) => { //to get sample bulk-upload structure file : which can be filled in later and be uploaded
    return axios.get(`/bulk-upload/sample-file/users/`, axiosConfig);
};

export const getUploadFieldData = () => { // to get the bulk-upload's fields data
    return axios.get(`/bulk-upload/users/`, axiosConfig);
};


export const patchUploadData = (id, data) => { // to patch the bulk-upload fields data
    return axios.patch(`/bulk-upload/users/${id}/`, data, axiosConfig)
};
//XXXXXXXXXXXXXXXXX---End of Import Users Api------XXXXXXXXXXXXXXXXXXXXXXXXXXXX






//-----------------------------Apis for table column Settings------------------------------

export const getTableColumnSetting = (searchData) => { //to get all column setting data
    return axios.get(`/table/fields/rest/users/?filterKey=lbl&search_key=${searchData || ""}&limit=200`)
};

export const patchTableColumnSettingApi = (data) => { //to patch column setting data
    return axios.patch("/table/fields/rest/users/", data, axiosConfig)
};

//XXXXXXXXXXXXXXXXX---End of table column Settings------XXXXXXXXXXXXXXXXXXXXXXXXXXXX



export const getAddUserDataForm = () => { // to remove
    return axios.get("https://demo1025512.mockable.io/add-users-form-types")
};



//-------------------------------Departments Api------------------------------------------
export const getDepartmentsData = (perPageRows, currentPage, searchData, headingData, sortingType) => { // to get the departments data
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/rest/departments/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || "_id"}&sortOrder=${sortingType || "dsc"}&filterKey=${searchData ? "name" : ""}&filterQuery=${searchData || ""}`, axiosConfig);

};

export const getAddableUserData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => { //to get the users data for addUsers Popup
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/choose-users/departments/${id}/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}`, axiosConfig)
};

export const getDeptTableColumns = () => { // to remove
    return axios.get("https://demo1025512.mockable.io/user-table-des-dep")
};


export const postCreteDepartmentData = (data) => { //to post the newly created department data
    return axios.post("/rest/departments/", data, axiosConfig)
}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX---End of Departments Api------XXXXXXXXXXXXXXXXXXXXXXXXXXX




export const getDesignationsData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/rest/designations/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || "_id"}&sortOrder=${sortingType || "dsc"}&filterKey=${searchData ? "name" : ""}&filterQuery=${searchData || ""}`, axiosConfig);
};


//-----------------------------Circle and Custom Field Api------------------------------
export const getCirclesDataApi = (searchData) => { // to get all data of circles
    return axios.get(`/rest/circles/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=name&filterQuery=${searchData || ""}`)
}

export const getCustomFieldsApi = (searchData) => { // to get all data of nodes{custom fields}
    return axios.get(`/rest/nodes/?start=1&offset=100&sortKey=_id&sortOrder=asc&filterKey=name&filterQuery=${searchData || ""}`)
};



export const getCircleSuggestionDataApi = (id, searchData) => { // to remove
    return axios.get(`/choose-users/circles/${id}/?start=1&offset=20&sortKey=name&sortOrder=dsc&filterKey=name&filterQuery=${searchData || ""}`)
}

export const getSingleFieldDataApi = (id, perPageRows, currentPage, searchData, headingData, sortingType, filterKeyId) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/rest/nodes/${id}/?start=${startNumber || 1}&offset=${perPageRows || 30}&sortKey=${headingData || "_id"}&sortOrder=${sortingType || ""}&filterKey=${searchData ? filterKeyId : ""}&filterQuery=${searchData || ""}`)
};

//XXXXXXXXXXXXXXXXX---End of Circle and Custom Field Api------XXXXXXXXXXXXXXXXXXXXXXXXXXXX



//------ Common Apis for few common components -----

export const getSingleViewDataApi = (viewType, id, perPageRows, currentPage, searchData, headingData, sortingType, id2) => { //common api for every view that is being fetched using one id
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    // return axios.get(`/users/${viewType}/${id}/?start=${startNumber || 1}&offset=${perPageRows || 30}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}&version=1`)
    return axios.get(`/users/${viewType}/${viewType === "nodes" ? (id + "/" + id2) : id}/?start=${startNumber || 1}&offset=${perPageRows || 30}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}&version=1`)

};

export const getSingleViewSuggestionDataApi = (viewType, id, perPageRows, currentPage, searchData, headingData, sortingType, id2) => { //common api for every user suggestion that is being fetched using one id
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/choose-users/${viewType}/${viewType === "nodes" ? (id + "/" + id2) : id}/?start=${startNumber || 1}&offset=${perPageRows || 30}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}&version=1`)
}

export const postCommonCreateDataApi = (createForType, data, id) => {
    if (createForType === "node_items") {
        return axios.post(`/rest/nodes/${id}/`, data, axiosConfig)
    } else {
        return axios.post(`/rest/${createForType}/`, data, axiosConfig)

    }
}

export const patchCommonCreateDataApi = (createForType, id, data, id2) => {
    if (createForType === "node_items") {
        return axios.patch(`/rest/nodes/${id}/${id2}/`, data, axiosConfig)
    } else {
        return axios.patch(`/rest/${createForType}/${id}/`, data, axiosConfig)
    }
}

export const postCommonRemovePeopleApi = (viewType, data) => {
    return axios.post(`/remove-people/${viewType}/`, data, axiosConfig)
}


export const postCommonActionOnUserApi = (typeOfAction, data) => { //actions on users
    return axios.post(`/${typeOfAction === "delete" ? "rest/users" : "users"}/${typeOfAction}/`, data, axiosConfig)
}


export const postCommonDeleteApi = (viewType, data, id) => {
    return axios.post(`/rest/${id ? viewType + "/" + id : viewType}/delete/`, data, axiosConfig)
}

export const postCommonAddSelectedUsersDataApi = (viewType, data) => {
    return axios.post(`/add-people/${viewType}/`, data, axiosConfig)
}
export const getParentNodeOptions = () => {
    return axios.get(`/meta/choose-parent-nodes/`, axiosConfig)
}



//XXXXXXXXXXXXXXXXX---End of Common Api------XXXXXXXXXXXXXXXXXXXXXXXXXXXX



//------session api---
export const getLoginSessionDataApi = () => {
    return axios.get('/sessions/check/login/')
}
//-------------------




//----------------Add Users Form Api---------

export const getAddUsersProfileDataApi = (id) => {
    return axios.get(`user-profiles/${id}/`)
}

//--xxxxxxxxxxxxxx--Add Users Form Api---xxxxxxx

