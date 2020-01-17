import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    singleViewName: "",
    singleViewCount: 0,
    singleViewData: []
}

export const commonReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
        case actionTypes.GET_SINGLE_VIEW_DATA:
            console.log(action.payload, "GET_SINGLE_VIEW_DATA")
            return {
                ...state,
                singleViewName: "",
                singleViewCount: 0,
                singleViewData: []
            }

    }


    return { ...state }

}