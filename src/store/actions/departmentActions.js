import * as actionTypes from '../actionTypes'
import {getDepartmentsData, getDeptTableColumns,postCreteDepartmentData,postAddSelectedUsersData} from '../../apiCall'

export const getDepartmentData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getDepartmentsData(perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_DEPARTMENTS_DATA,
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



