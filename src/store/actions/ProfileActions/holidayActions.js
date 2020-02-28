import * as actionTypes from '../../actionTypes'
import {
    getHolidayTableColumns,
    getCommonProfilesData,
    getHolidaysTypeData,


    postCreteDepartmentData,
    postAddSelectedUsersData,
    getAddSelectedUsersData,
    getAddableUserData,
    getDeptAddUsersTableColumns, getHeaderName, getCircleSuggestionDataApi, getAddUserDataForm
} from '../../../utils/Apis/peopleApi'

import {holidayTypeData} from '../../../utils/Apis/profileApi'

export const commonHolidayAction = (payload) =>{
    return {
        type: actionTypes.COMMON_HOLIDAY_ACTION,
        payload
    }
}

export const getHolidayTableColumnData = () => {
    const payload = getHolidayTableColumns()
    return {
        type: actionTypes.GET_HOLIDAY_TABLE_COLUMN_DATA,
        payload
    }
}

export const getHolidayProfileData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    let type = 'holiday';
    let subType = 'holiday-profiles';
    const payload = getCommonProfilesData(type,subType,perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_HOLIDAY_PROFILES_DATA,
        payload
    }
};

export const getHolidayTypeData = () => {
    const payload = holidayTypeData()
    return {
        type: actionTypes.GET_HOLIDAY_TYPE_DATA,
        payload
    }
};




/*export const getAddableUsersData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getAddableUserData(id, perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_ADDABLE_USERS_DATA,
        payload
    }
}



export const getTableColumnsData = () => {
    const payload = getDeptAddUsersTableColumns()
    return {
        type: actionTypes.GET_TABLE_COLUMN,
        payload
    }
}

export const postCreateDeptData = (data) => {
    const payload = postCreteDepartmentData(data)
    return {
        type: actionTypes.POST_CREATE_DEPARTMENT_DATA,
        payload
    }
};

export const postAddSelectedUsers = (data) =>{
    const payload = postAddSelectedUsersData(data)
    return {
        type: actionTypes.POST_ADD_SELECTED_USERS_DATA,
        payload
    }
}

export const getAddSelectedUsersPostedData = (id,perPageRows, currentPage, searchData, headingData, sortingType) =>{
    const payload = getAddSelectedUsersData(id,perPageRows, currentPage, searchData, headingData, sortingType)
    return{
        type:actionTypes.GET_ADD_SELECTED_USERS_POSTED_DATA,
        payload
    }
}

export const getCommonViewHeaderName = (id) =>{
    const payload = getHeaderName(id)
    return{
        type: actionTypes.GET_COMMON_VIEW_HEADER_NAME,
        payload
    }
}

export const getDepartmentSuggestionData = (id, searchData) =>{
    const payload = getCircleSuggestionDataApi(id, searchData)

    return{
        type: actionTypes.GET_DEPARTMENTS_SUGGESTION_DATA,
        payload
    }
}

export const editUserDataForm = () => {
    const payload = getAddUserDataForm()
    return {
        type: actionTypes.EDIT_USER_DATA_FORM,
        payload
    }
}*/





