import * as actionTypes from '../actionTypes'
import {getDepartmentsData, getDeptTableColumns} from '../../apiCall'

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