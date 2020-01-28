
import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    circlesDataMain: [],
    circlesData: [],
    customFieldsDataMain: [],
    customFieldsData: [],
    singleCircleName: "",
    singleCircleCount: 0,
    singleCircleData: [],
    circleSuggestionData: [],
    singleFieldName: "",
    singleFieldCount: 0,
    singleFieldData: []
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
                singleCircleName: singleCircleDataInitial ? singleCircleDataInitial.name : "",
                singleCircleCount: singleCircleDataInitial ? singleCircleDataInitial.total_count : 0,
                singleCircleData: singleCircleDataInitial ? singleCircleDataInitial.result : []
            }


        case actionTypes.GET_CIRCLE_SUGGESTION_DATA:
            const circleSuggestionDataInitial = action.payload.data.result
            return {
                ...state,
                circleSuggestionData: circleSuggestionDataInitial,
            }

        case actionTypes.GET_SINGLE_FIELD_DATA:
            const singleFieldDataInitial = action.payload.data
            console.log(singleFieldDataInitial, "singleFieldDataInitial")
            return {
                ...state,
                // singleFieldName: singleFieldDataInitial.name,
                singleFieldCount: singleFieldDataInitial.total_count,
                singleFieldData: singleFieldDataInitial ? singleCircleDataInitial.result : []
            }
    }


    return { ...state }


}