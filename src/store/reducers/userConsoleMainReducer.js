
import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    circlesDataMain: [],
    circlesData: [],
    customFieldsDataMain: [],
    customFieldsData: [],
    singleCircleName: [],
    singleCircleCount: 0,
    singleCircleData: []
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

        case actionTypes.GET_SINGLE_CIRCLE_DATA:
            const singleCircleDataInitial = action.payload.data
            return {
                ...state,
                singleCircleName: singleCircleDataInitial.name,
                singleCircleCount: singleCircleDataInitial.total_count,
                singleCircleData: singleCircleDataInitial ? singleCircleDataInitial.result : []
            }


        case actionTypes.GET_CIRCLE_SUGGESTION_DATA:
            console.log(action.payload)
            return {
                ...state
            }
    }


    return { ...state }


}