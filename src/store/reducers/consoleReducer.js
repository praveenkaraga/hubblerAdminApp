import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    initial: 0,
    consoleColumnData: [],
    consoleUserData: [],
    totalUsers: 0
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
            const totalUsers = consoleUserDataIntital ? consoleUserDataIntital.total_count : 0
            return {
                ...state,
                consoleUserData,
                totalUsers
            }
    }


    return { ...state }


}