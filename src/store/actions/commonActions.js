import * as actionTypes from '../actionTypes'
import {
    getSingleViewDataApi,
    getSingleViewSuggestionDataApi,
    postCommonCreateDataApi,
    patchCommonCreateDataApi,
    getLoginSessionDataApi,
    getSingleFieldDataApi
} from '../../apiCall'
import axios from "axios";

export const getSingleViewData = (viewType, id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getSingleViewDataApi(viewType, id, perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_SINGLE_VIEW_DATA,
        payload
    }
}


export const getSingleViewSuggestionData = (viewType, id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getSingleViewSuggestionDataApi(viewType, id, perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_SINGLE_VIEW_SUGGESTION_DATA,
        payload
    }
}


export const postCommonCreateData = (createForType, data) => {
    const payload = postCommonCreateDataApi(createForType, data)
    return {
        type: actionTypes.POST_COMMON_CREATE_DATA,
        payload
    }
}


export const commonActionForCommonReducer = (payload) => {
    return {
        type: actionTypes.COMMON_ACTION_FOR_COMMON_REDUCER,
        payload
    }
}


export const patchCommonCreateData = (createForType, id, data) => {
    const payload = patchCommonCreateDataApi(createForType, id, data);
    return {
        type: actionTypes.PATCH_COMMON_CREATE_DATA,
        payload
    }
}

//Login Session Get Api
export const getLoginSessionData = () => {
    const payload = getLoginSessionDataApi()
    return {
        type: actionTypes.GET_LOGIN_SESSION_DATA,
        payload
    }
}


export const getSingleFieldData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getSingleFieldDataApi(id, perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_SINGLE_FIELD_DATA,
        payload
    }
}