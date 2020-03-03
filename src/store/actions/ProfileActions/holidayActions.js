import * as actionTypes from '../../actionTypes'
import {
    holidayTypeData
} from  '../../../utils/Apis/profileApi'

// import {holidayTypeData} from '../../../utils/Apis/profileApi'


export const getHolidayTypeData = () => {
    const payload = holidayTypeData()
    return {
        type: actionTypes.GET_HOLIDAY_TYPE_DATA,
        payload
    }
};









