import * as actionTypes from '../../actionTypes'
import {
    getHolidayTableColumns,
    getCommonProfilesData,
    holidayTypeData
} from  '../../../utils/Apis/profileApi'

// import {holidayTypeData} from '../../../utils/Apis/profileApi'

export const commonHolidayAction = (payload) =>{
    return {
        type: actionTypes.COMMON_HOLIDAY_ACTION,
        payload
    }
}

export const getHolidayTableColumnData = () => {
    const payload = getHolidayTableColumns()
    return {
        type: actionTypes.GET_HOLIDAY_TABLE_COLUMN_DATA,
        payload
    }
}

export const getHolidayProfileData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    let type = 'holiday';
    let subType = 'holiday-profiles';
    const payload = getCommonProfilesData(type,subType,perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_HOLIDAY_PROFILES_DATA,
        payload
    }
};

export const getHolidayTypeData = () => {
    const payload = holidayTypeData()
    return {
        type: actionTypes.GET_HOLIDAY_TYPE_DATA,
        payload
    }
};









