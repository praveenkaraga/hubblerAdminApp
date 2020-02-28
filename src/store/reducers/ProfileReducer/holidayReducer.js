import {checkError} from "../../../utils/helper";
import * as actionTypes from "../../actionTypes";
import filter from 'lodash/filter'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    count: 1,
    holidayColumnData: [],
    holidayProfilesData:[],
    searchLoader: false,

}

export const holidayReducer = (state = initialState, action) => {
    const {errorData, isError} = checkError(state, action);
    if (isError) {
        return {...errorData}
    }

    switch (action.type) {

    case actionTypes.COMMON_HOLIDAY_ACTION :
        return {
            ...state, ...action.payload
        };


    default:
        return{...state}

    }
}