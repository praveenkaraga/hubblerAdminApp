import * as actionTypes from '../../actionTypes'
import {
    getDepartmentsData,
    getDeptTableColumns,
    postCreteDepartmentData,
    getAddableUserData,
    getAddUserDataForm, getSingleViewSuggestionDataApi
} from '../../../utils/Apis/peopleApi'

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

export const commonDepartmentAction = (payload) => {
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

export const getDepartmentSuggestionData = (id, searchData) => {
    const payload = getSingleViewSuggestionDataApi(id, searchData)

    return {
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
};





