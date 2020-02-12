
import axios from "axios";

axios.defaults.proxy = true;

//getting CSRF token
function getCSRFTokenFromCookie() {
    let cookieValue = null;
    let name = "csrftoken2";
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            cookie = cookie.trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let axiosConfig = {
    headers: {
        "X-CSRFToken": getCSRFTokenFromCookie(),
        "Content-Type": "application/json; charset=utf-8",
        "X-Requested-With": "XMLHttpRequest"
    },
    cache: "no-cache",
    credentials: "same-origin",
    referrer: "no-referrer",
    redirect: "follows" // manual, *follow, error
};



export const getUsers = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/rest/users/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}&version=1`, axiosConfig);
};



//--------------------TEAM VIEW API'S------------------------------------------------------------------
export const getTeamViewUsers = () => {
    return axios.get("/reportees/orgchart//?sortKey=name&sortOrder=asc&filterKey=id&filterQuery=", axiosConfig);
};

export const getClickedTeamViewUser = (id) => {
    return axios.get(`/rest/users/${id}/?page=`, axiosConfig);
};

export const getClickedTeamViewOrgData = (url) => {
    return axios.get(url, axiosConfig);
};


//XXXXXXXXXXXXXXXXX---END OF TEAM VIEW API'S------XXXXXXXXXXXXXXXXXXXXXXXXX




export const downloadExcelCall = (id) => {
    return axios.get(`/bulk-upload/sample-file/users/`, axiosConfig);
};

export const getClickedUserReporteeData = (id) => {
    return axios.get(`/reportees/orgchart/${id}/?sortKey=name&sortOrder=asc&filterKey=id&filterQuery=`, axiosConfig);
};

export const getUploadFieldData = () => {
    return axios.get(`/bulk-upload/users/`, axiosConfig);
};


export const patchUploadData = (id, data) => {
    return axios.patch(`/bulk-upload/users/${id}/`, data, axiosConfig)
}


//---------- Apis for table column Settings

export const getTableColumnSetting = () => { //to get all column setting data
    return axios.get("/table/fields/rest/users/")
}

export const patchTableColumnSettingApi = (data) => { //to patch column setting data
    return axios.patch("/table/fields/rest/users/", data, axiosConfig)
}

//------------*****************----------


export const getAddUserDataForm = () => {
    return axios.get("https://demo1025512.mockable.io/add-users-form-types")
}

export const getDepartmentsData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/rest/departments/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "name" : ""}&filterQuery=${searchData || ""}`, axiosConfig);

};

export const getAddableUserData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/choose-users/departments/${id}/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}`, axiosConfig)
};


export const getDesignationsData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/rest/designations/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "name" : ""}&filterQuery=${searchData || ""}`, axiosConfig);
};

export const getDeptTableColumns = () => {
    return axios.get("https://demo1025512.mockable.io/user-table-des-dep")
};

export const postCreteDepartmentData = (data) => {
    return axios.post("/rest/departments/", data, axiosConfig)
}

export const postAddSelectedUsersData = (data) => {
    return axios.post("/add-people/departments/", data, axiosConfig)
}

export const getAddSelectedUsersData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/users/departments/${id}/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}`)
    /*
        start=1&offset=20&sortKey=_id&sortOrder=dsc&filterKey=&filterQuery=\`
    */
}

export const getDeptAddUsersTableColumns = () => {
    return axios.get("https://demo4798197.mockable.io/dept-user-columns")
};

export const getCirclesDataApi = (searchData) => { // to get all data of circles
    return axios.get(`/rest/circles/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=${searchData || ""}`)
}

export const getCustomFieldsApi = () => { // to get all data of nodes{custom fields}
    return axios.get(`/rest/nodes/?start=1&offset=100&sortKey=_id&sortOrder=asc&filterKey=_id&filterQuery=`)
};

export const getHeaderName = (id) => {
    return axios.get(`/rest/departments/${id}/`);
};


export const getCircleSuggestionDataApi = (id, searchData) => { // to remove
    return axios.get(`/choose-users/circles/${id}/?start=1&offset=20&sortKey=name&sortOrder=dsc&filterKey=name&filterQuery=${searchData || ""}`)
}

export const getSingleFieldDataApi = (id, perPageRows, currentPage, searchData, headingData, sortingType, filterKeyId) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/nodes/rest/${id}/?start=${startNumber || 1}&offset=${perPageRows || 30}&sortKey=${headingData || "_id"}&sortOrder=${sortingType || ""}&filterKey=${searchData ? filterKeyId : ""}&filterQuery=${searchData || ""}`)
};


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

export const getCommonProfilesData = (type, subType, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/${type}/${subType}/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "name" : ""}&filterQuery=${searchData || ""}`, axiosConfig);

};

export const postHolidayCreatedDataApi = (data) => {
    return axios.post(`/holiday/holiday-profiles/`, data, axiosConfig)
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



//-------------------xxxxx-------



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



//-------- Holiday Profile Apis------------------







//-----------------------------------------------------------------------------------------------------------------
//------------------------------PROFILES---------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

export const getHolidayTableColumns = () => {
    return axios.get("https://demo4798197.mockable.io/holiday-profile-columns")
};

/*
/holiday/holiday-profiles/5e4238662b6f454b4c5da24c/
*/

//-----------------------------------------------


//-----------------------------------------------------------------------------------------------------------------
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX------END PROFILES------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//-----------------------------------------------------------------------------------------------------------------
