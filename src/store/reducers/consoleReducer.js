import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    initial: 0,
    consoleColumnData: [],
    consoleUserData: [],
    totalUsers: 0,
    rowsPerPage: 30,
    currentPageNumber: 1,
    searchData: "",
    searchLoader: false,
    activeheading: "",
    sortingType: "dsc",
    columnSettingData: [],
    columnSettingDataOriginal: []
}

export const consoleReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
        case actionTypes.GET_TABLE_COLUMN_DATA:
            const columnDataIntial = action.payload.data
            const columnData = columnDataIntial ? action.payload.data.result : []
            return {
                ...state,
                consoleColumnData: columnData
            }

        case actionTypes.GET_CONSOLE_USER_DATA:
            const consoleUserDataIntital = action.payload.data
            const consoleUserData = consoleUserDataIntital ? consoleUserDataIntital.result : []
            const consoleUserDataCopy = JSON.parse(JSON.stringify(consoleUserData))
            const totalUsers = consoleUserDataIntital ? consoleUserDataIntital.total_count : 0
            return {
                ...state,
                consoleUserData: consoleUserDataCopy,
                totalUsers,
                searchLoader: false
            }

        case actionTypes.COMMON_CONSOLE_ACTION:
            return {
                ...state,
                ...action.payload
            }

        case actionTypes.TABLE_COLUMN_SETTING_DATA:
            console.log(action.payload.data.result)
            const columnSettingData = action.payload.data.result
            return {
                ...state,
                conlumnSettingDataOriginal: columnSettingData,
                columnSettingData: JSON.parse(JSON.stringify(columnSettingData))
            }
    }


    return { ...state }


}