import {checkError} from "../../../utils/helper";
import * as actionTypes from "../../actionTypes";

const initialState = {
    profileLandingDataCount : 0,
    profileLandingData : [],
    tableLoading : true,
    landingViewProfileActionSuccessMessage:"",
    landingViewProfileActionSuccess :  false,
    searchLoader : false
}

export const commonProfileReducer = (state = initialState, action) => {
    const {errorData, isError} = checkError(state, action);
    if (isError) {
        return {...errorData}
    }

    switch (action.type) {
      
    case actionTypes.GET_COMMON_PROFILES_LANDING_VIEW_TABLE_DATA:
        const initialLandingData = action.payload.data
        const initialLandingData2 =  initialLandingData ? initialLandingData.result :[]
        // initialLandingData2.forEach(data => data.copyName = data.name)

        return {
            ...state,
            tableLoading : false,
            searchLoader: false,
            profileLandingDataCount :initialLandingData ? initialLandingData.total_count : 0,
            profileLandingData : initialLandingData2
        };

    case actionTypes.COMMON_ACTIONS_ON_PROFILE_DATA:
        const initialActionData =  action.payload.data

        return{
            ...state,
            landingViewProfileActionSuccess : true,
            landingViewProfileActionSuccessMessage : initialActionData ? initialActionData.message : ""
        }   


    case actionTypes.COMMON_ACTION_FOR_COMMON_PROFILE_REDUCER:
        return {
            ...state,
            ...action.payload
        }    

    default:
        return{...state}

    }
};