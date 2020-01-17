import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    singleViewName: "",
    singleViewCount: 0,
    singleViewData: [],
    singleViewSuggestionData: [],
    newDataCreatedSuccessfully: false
}

export const commonReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
        case actionTypes.GET_SINGLE_VIEW_DATA:
            const singleViewDataItitial = action.payload.data
            return {
                ...state,
                singleViewName: singleViewDataItitial.name,
                singleViewCount: singleViewDataItitial.total_count,
                singleViewData: singleViewDataItitial.result
            }


        case actionTypes.GET_SINGLE_VIEW_SUGGESTION_DATA:
            const singleViewSuggestionDataInitial = action.payload.data.result
            return {
                ...state,
                singleViewSuggestionData: singleViewSuggestionDataInitial
            }

        case actionTypes.POST_COMMON_CREATE_DATA:
            const newDataInitial = action.payload.data
            return {
                ...state,
                newDataCreatedSuccessfully: true,
                newCreatedDataId: newDataInitial.id
            }

        case actionTypes.COMMON_ACTION_FOR_COMMON_REDUCER:
            return {
                ...state,
                ...action.payload
            }

    }


    return { ...state }

}