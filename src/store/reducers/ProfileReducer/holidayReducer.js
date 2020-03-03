import {checkError} from "../../../utils/helper";
import * as actionTypes from "../../actionTypes";

const initialState = {
    count: 1,
    holidayColumnData: [],
    holidayProfilesData: [],
    searchLoader: false,

}

export const holidayReducer = (state = initialState, action) => {
    const {errorData, isError} = checkError(state, action);
    if (isError) {
        return {...errorData}
    }

    switch (action.type) {

        
    case actionTypes.GET_HOLIDAY_TYPE_DATA :
        const holidayTypeDataInitial = action.payload.data;
        const holidayTypeData = holidayTypeDataInitial ? holidayTypeDataInitial.result : [];
        return {
            holidayTypeData: holidayTypeData,
        }


    default:
        return {...state}

    }
}