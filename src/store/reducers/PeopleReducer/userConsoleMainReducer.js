
import { checkError } from '../../../utils/helper'
import * as actionTypes from '../../actionTypes'

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
    singleFieldData: [],
    parentNodeOptions :[],
    parentNodeSwitch: false,
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


        case actionTypes.GET_CIRCLE_SUGGESTION_DATA:
            const circleSuggestionDataInitial = action.payload.data.result
            return {
                ...state,
                circleSuggestionData: circleSuggestionDataInitial,
            }
        case actionTypes.GET_PARENT_NODE_OPTIONS:
            const intialOptionsData = action.payload.data ? action.payload.data.result : []
            return {
                ...state,
                parentNodeOptions: intialOptionsData,
                parentNodeSwitch: false,
            }

        case actionTypes.COMMON_USER_CONSOLE_ACTION:
            return {
                ...state,
                ...action.payload
            }


    }


    return { ...state }


}