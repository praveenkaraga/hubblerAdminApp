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


//-----------------------------------------------------------------------------------------------------------------
//------------------------------PROFILES---------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

//-------- Holiday Profile Apis------------------
export const getHolidayTableColumns = () => {
    return axios.get("https://demo4798197.mockable.io/holiday-profile-columns")
};

export const getCommonProfilesData = (type, subType, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const startNumber = ((currentPage - 1) * perPageRows) + 1
    return axios.get(`/${type}/${subType}/?start=${startNumber || 1}&offset=${perPageRows || 0}&sortKey=${headingData || ""}&sortOrder=${sortingType || ""}&filterKey=${searchData ? "name" : ""}&filterQuery=${searchData || ""}`, axiosConfig);

};

export const postHolidayCreatedDataApi = (data) => {
    return axios.post(`/holiday/holiday-profiles/`, data, axiosConfig)
}


//-----------------------------------------------


//-----------------------------------------------------------------------------------------------------------------
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX------END PROFILES------XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//-----------------------------------------------------------------------------------------------------------------