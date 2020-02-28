import * as actionTypes from '../../actionTypes'
import {
    getCommonProfilesLandingViewTableDataApi
} from '../../../utils/Apis/profileApi'


export const getCommonProfilesLandingViewTableData = (type, subType, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getCommonProfilesLandingViewTableDataApi(type,subType,perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_COMMON_PROFILES_LANDING_VIEW_TABLE_DATA,
        payload
    }
};







