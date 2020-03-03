import * as actionTypes from '../../actionTypes'
import {
    getDepartmentsData,
    getDeptTableColumns,
    postCreteDepartmentData,
    getAddableUserData,
    getAddUserDataForm, getSingleViewSuggestionDataApi
} from '../../../utils/Apis/peopleApi'

export const getDepartmentData = (perPageRows, currentPage, searchData, headingData, sortingType) => { //to get the departments data
    const payload = getDepartmentsData(perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_DEPARTMENTS_DATA,
        payload
    }
}
export const getAddableUsersData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => { // //to get the users data for addUsers Popup
    const payload = getAddableUserData(id, perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_ADDABLE_USERS_DATA,
        payload
    }
}

export const commonDepartmentAction = (payload) => { //common action to update the state values
    return {
        type: actionTypes.COMMON_DEPARTMENT_ACTION,
        payload
    }
}

export const getDeptTableColumnData = () => { //to remove
    const payload = getDeptTableColumns()
    return {
        type: actionTypes.GET_DEPT_TABLE_COLUMN_DATA,
        payload
    }
}
export const postCreateDeptData = (data) => {  //to post the newly created department data
    const payload = postCreteDepartmentData(data)
    return {
        type: actionTypes.POST_CREATE_DEPARTMENT_DATA,
        payload
    }
};

export const getDepartmentSuggestionData = (id, searchData) => {  //to get the suggestion search data
    const payload = getSingleViewSuggestionDataApi(id, searchData)

    return {
        type: actionTypes.GET_DEPARTMENTS_SUGGESTION_DATA,
        payload
    }
}

export const editUserDataForm = () => { // to remove
    const payload = getAddUserDataForm()
    return {
        type: actionTypes.EDIT_USER_DATA_FORM,
        payload
    }
};





