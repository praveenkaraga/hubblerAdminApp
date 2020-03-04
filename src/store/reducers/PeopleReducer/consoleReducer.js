import { checkError } from '../../../utils/helper'
import * as actionTypes from '../../actionTypes'

const intialState = {
    initial: 0,
    consoleColumnData: [],
    consoleUserData: [],
    totalUsers: 0,
    rowsPerPage: 30,
    currentPageNumber: 1,
    searchData: null,
    searchLoader: false,
    activeheading: "",
    sortingType: "",
    columnSettingData: {},
    columnSettingDataOriginal: {},
    actionSuccessMessage: "",
    actionOnUserSuccess: false,
    patchColumnSettingStatus: false,
    tableLoading : true,
    patchColumnSettingSuccessMessage : "",
    viewDeciderLoader : true
}

export const consoleReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {

    case actionTypes.GET_CONSOLE_USER_DATA:
        const consoleUserDataIntital = action.payload.data
        const consoleUserData = consoleUserDataIntital ? consoleUserDataIntital.result : []
        const consoleUserDataCopy = JSON.parse(JSON.stringify(consoleUserData))
        const totalUsers = consoleUserDataIntital ? consoleUserDataIntital.total_count : 0
        return {
            ...state,
            consoleUserData: consoleUserDataCopy,
            totalUsers,
            searchLoader: false,
            tableLoading : false,
            viewDeciderLoader : false
        }

    case actionTypes.COMMON_CONSOLE_ACTION:
        return {
            ...state,
            ...action.payload
        }

    case actionTypes.TABLE_COLUMN_SETTING_DATA:
        const intialcolumnSettingData = action.payload.data ? action.payload.data.result : []
        const columnSettingCategories = intialcolumnSettingData ? intialcolumnSettingData.categories : []
        const columnSettingFields = intialcolumnSettingData ? intialcolumnSettingData.fields : []
        const finalColumnSettingData = {
            columnSettingCategories,
            columnSettingFields
        }

        return {
            ...state,
            columnSettingDataOriginal: finalColumnSettingData,
            columnSettingData: JSON.parse(JSON.stringify(finalColumnSettingData)),
        }



    case actionTypes.POST_COMMON_ACTION_ON_USER:
        const actionOnUserDataInitial = action.payload.data
        return {
            ...state,
            actionOnUserSuccess: true,
            actionSuccessMessage: actionOnUserDataInitial ? actionOnUserDataInitial.message : "Success"
        }

    case actionTypes.PATCH_TABLE_COLUMN_SETTING:
        const patchColumnSettingInitial  = action.payload.data
        return {
            ...state,
            patchColumnSettingStatus: true,
            patchColumnSettingSuccessMessage : patchColumnSettingInitial ? patchColumnSettingInitial.message : "Table Column Setting Saved"
        }

    default :
        return {...state}   

    }


  


}