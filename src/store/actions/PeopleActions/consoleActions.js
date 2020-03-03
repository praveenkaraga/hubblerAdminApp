import * as actionTypes from '../../actionTypes'
import { getUsers, getTableColumnSetting, getAddUserDataForm, postCommonActionOnUserApi, patchTableColumnSettingApi } from '../../../utils/Apis/peopleApi'


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

export const tableColumnSetting = (searchData) => {
    const payload = getTableColumnSetting(searchData)
    return {
        type: actionTypes.TABLE_COLUMN_SETTING_DATA,
        payload
    }
}

export const patchTableColumnSetting = (settingData) => { //patching the saved table column setting data
    const payload = patchTableColumnSettingApi(settingData)
    return {
        type: actionTypes.PATCH_TABLE_COLUMN_SETTING,
        payload
    }
}


export const postCommonActionOnUser = (typeOfAction, data) => {
    const payload = postCommonActionOnUserApi(typeOfAction, data)
    return {
        type: actionTypes.POST_COMMON_ACTION_ON_USER,
        payload
    }
}