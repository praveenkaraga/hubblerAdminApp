import * as actionTypes from '../actionTypes'
import { getTableColumns, getUsers } from '../../apiCall'

export const getTableColumnData = () => {
    const payload = getTableColumns()
    return {
        type: actionTypes.GET_TABLE_COLUMN_DATA,
        payload
    }

}

export const getConsoleUserData = (perPageRows, currentPage) => {
    const payload = getUsers(perPageRows, currentPage)
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