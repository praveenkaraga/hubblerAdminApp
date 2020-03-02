import {checkError} from "../../../utils/helper";
import * as actionTypes from "../../actionTypes";
import filter from 'lodash/filter'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

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

        case actionTypes.COMMON_HOLIDAY_ACTION :
            return {
                ...state, ...action.payload
            };


        case actionTypes.GET_HOLIDAY_TABLE_COLUMN_DATA:
            const columnDataInitial = action.payload.data;
            const columnData = columnDataInitial ? action.payload.data.result : [];
            return {
                ...state,
                holidayColumnData: columnData
            };


        case actionTypes.GET_HOLIDAY_PROFILES_DATA:
            const holidayDataDataInitial = action.payload.data
            const holidayData = holidayDataDataInitial ? holidayDataDataInitial.result : []
            const holidayDataCopy = JSON.parse(JSON.stringify(holidayData))
            const d = map(holidayDataCopy, ele => ({
                ...ele,
                holiday_profile: ele.name,
                people: ele.user_count,
                holidays: ele.holiday_count
            }))
            const totalUsers = holidayDataDataInitial ? holidayDataDataInitial.total_count : 0
            return {
                ...state,
                holidayProfilesData: d,
                totalUsers,
                searchLoader: false,
            };

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