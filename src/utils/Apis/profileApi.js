import axios from "axios";
import {axiosConfig} from '../helper'


axios.defaults.proxy = true;


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