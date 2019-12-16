import * as actionTypes from '../actionTypes'
import { getTableColumns, getUsers, getTableColumnSetting } from '../../apiCall'

export const getTableColumnData = () => {
    const payload = getTableColumns()
    return {
        type: actionTypes.GET_TABLE_COLUMN_DATA,
        payload
    }

}

export const getConsoleUserData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getUsers(perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_CONSOLE_USER_DATA,
        payload
    }
}


export const commonConsoleAction = (payload) => {
    return {
        type: actionTypes.COMMON_CONSOLE_ACTION,
        payload
    }
}


export const tableColumnSetting = () => {
    const payload = getTableColumnSetting()
    return {
        type: actionTypes.TABLE_COLUMN_SETTING_DATA,
        payload
    }
}