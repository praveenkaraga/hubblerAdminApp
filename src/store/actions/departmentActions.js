import * as actionTypes from '../actionTypes'
import {getDepartmentsData, getDeptTableColumns,postCreteDepartmentData,postAddSelectedUsersData,getAddSelectedUsersData,getAddableUserData,getDeptAddUsersTableColumns} from '../../apiCall'

export const getDepartmentData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getDepartmentsData(perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_DEPARTMENTS_DATA,
        payload
    }
}
export const getAddableUsersData = (id, sortingType) => {
    const payload = getAddableUserData(id, sortingType)
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

export const getAddSelectedUsersPostedData = (id) =>{
    debugger
    const payload = getAddSelectedUsersData(id)
    return{
        type:actionTypes.GET_ADD_SELECTED_USERS_POSTED_DATA,
        payload
    }
}



