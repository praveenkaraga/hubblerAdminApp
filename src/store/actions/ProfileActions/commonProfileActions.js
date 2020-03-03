import * as actionTypes from '../../actionTypes'
import {
    getCommonProfilesLandingViewTableDataApi,
    commonActionsOnProfileDataApi
} from '../../../utils/Apis/profileApi'


export const getCommonProfilesLandingViewTableData = (viewType, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getCommonProfilesLandingViewTableDataApi(viewType,perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_COMMON_PROFILES_LANDING_VIEW_TABLE_DATA,
        payload,
    }
}

       
        export const commonActionForCommonProfileReducer = (payload) => {
            return {
                type: actionTypes.COMMON_ACTION_FOR_COMMON_PROFILE_REDUCER,
                payload
            }
        };
    




export const commonActionsOnProfileData = (viewType, typeOfAction,  data) =>{
    const payload = commonActionsOnProfileDataApi(viewType, typeOfAction,  data)
    return {
        type : actionTypes.COMMON_ACTIONS_ON_PROFILE_DATA,
        payload
    }
}







