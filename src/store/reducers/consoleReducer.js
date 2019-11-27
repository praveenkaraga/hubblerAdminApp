import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    initial: 0,
    consoleColumnData: []
}

export const consoleReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
        case actionTypes.GET_TABLE_COLUMN_DATA:
            const columnData = action.payload.data.result
            return {
                ...state,
                consoleColumnData: columnData
            }

        case actionTypes.GET_CONSOLE_USER_DATA:
            console.log(action.payload)
            return {
                ...state
            }
    }


    return { ...state }


}