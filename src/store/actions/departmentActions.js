import * as actionTypes from '../actionTypes'
import {
    getDepartmentsData,
    getDeptTableColumns,
    postCreteDepartmentData,
    postAddSelectedUsersData,
    getAddSelectedUsersData,
    getAddableUserData,
    getDeptAddUsersTableColumns, getHeaderName, getCircleSuggestionDataApi
} from '../../apiCall'

export const getDepartmentData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getDepartmentsData(perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_DEPARTMENTS_DATA,
        payload
    }
}
export const getAddableUsersData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getAddableUserData(id, perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_ADDABLE_USERS_DATA,
        payload
    }
}

export const commonDepartmentAction = (payload) =>{
    return {
        type: actionTypes.COMMON_DEPARTMENT_ACTION,
        payload
    }
}

export const getDeptTableColumnData = () => {
    const payload = getDeptTableColumns()
    return {
        type: actionTypes.GET_DEPT_TABLE_COLUMN_DATA,
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





