
import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    circlesDataMain: [],
    circlesData: [],
    customFieldsDataMain: [],
    customFieldsData: []
}

export const userConsoleMainReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {

        case actionTypes.GET_CIRCLES_DATA:
            const circlesDataInitial = action.payload.data ? action.payload.data.result : []
            return {
                ...state,
                circlesDataMain: circlesDataInitial,
                circlesData: JSON.parse(JSON.stringify(circlesDataInitial))
            }


        case actionTypes.GET_CUSTOM_FIELDS_DATA:
            const customFieldsInitial = action.payload.data ? action.payload.data.result : []
            return {
                ...state,
                customFieldsDataMain: customFieldsInitial,
                customFieldsData: JSON.parse(JSON.stringify(customFieldsInitial))
            }
    }


    return { ...state }


}