
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
    return axios.get(`/rest/users/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}`, axiosConfig);
};

export const getTeamViewUsers = () => {
    return axios.get("/reportees/orgchart//?sortKey=name&sortOrder=asc&filterKey=id&filterQuery=", axiosConfig);
};

export const getClickedTeamViewUser = (id) => {
    return axios.get(`/rest/users/${id}/?page=`, axiosConfig);
};

export const getClickedTeamViewOrgData = (url) => {
    return axios.get(url, axiosConfig);
};

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


export const getTableColumns = () => {
    return axios.get("https://demo1025512.mockable.io/experiment-antd-table")
};


export const getTableColumnSetting = () => {
    return axios.get("https://demo1025512.mockable.io/user-table-setting")
}


export const getAddUserDataForm = () => {
    return axios.get("https://demo1025512.mockable.io/add-users-form-types")
}

export const getDepartmentsData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/rest/departments/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "name" : ""}&filterQuery=${searchData || ""}`, axiosConfig);

    // return axios.get(`/rest/departments/?start=1&offset=20&sortKey=_id&sortOrder=dsc&filterKey=&filterQuery=`, axiosConfig);
};

export const getAddableUserData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/choose-users/departments/${id}/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}`,axiosConfig)
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

export const getAddSelectedUsersData = (id,perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/users/departments/${id}/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "searchAll" : ""}&filterQuery=${searchData || ""}`)
/*
    start=1&offset=20&sortKey=_id&sortOrder=dsc&filterKey=&filterQuery=\`
*/
}

export const getDeptAddUsersTableColumns = () => {
    return axios.get("https://demo4798197.mockable.io/dept-user-columns")
};


export const getCirclesDataApi = (searchData) => {
    return axios.get(`/rest/circles/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=${searchData || ""}`)
}


export const getCustomFieldsApi = () => {
    return axios.get(`/meta/nodes/?start=1&offset=100&sortKey=_id&sortOrder=asc&filterKey=_id&filterQuery=`)
}








