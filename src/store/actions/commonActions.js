import * as actionTypes from '../actionTypes'
import {
    getSingleViewDataApi,
    getSingleViewSuggestionDataApi,
    postCommonCreateDataApi,
    patchCommonCreateDataApi,
    getLoginSessionDataApi,
    getSingleFieldDataApi,
    postCommonAddSelectedUsersDataApi,
    postCommonRemovePeopleApi
} from '../../apiCall'

export const getSingleViewData = (viewType, id, perPageRows, currentPage, searchData, headingData, sortingType, id2) => {
    const payload = getSingleViewDataApi(viewType, id, perPageRows, currentPage, searchData, headingData, sortingType, id2)
    return {
        type: actionTypes.GET_SINGLE_VIEW_DATA,
        payload
    }
}


export const getSingleViewSuggestionData = (viewType, id, perPageRows, currentPage, searchData, headingData, sortingType, id2) => {
    const payload = getSingleViewSuggestionDataApi(viewType, id, perPageRows, currentPage, searchData, headingData, sortingType, id2)
    return {
        type: actionTypes.GET_SINGLE_VIEW_SUGGESTION_DATA,
        payload
    }
}


export const postCommonCreateData = (createForType, data, id) => {
    const payload = postCommonCreateDataApi(createForType, data, id)
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


export const patchCommonCreateData = (createForType, id, data, id2) => {
    const payload = patchCommonCreateDataApi(createForType, id, data, id2)
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


export const getSingleFieldData = (id, perPageRows, currentPage, searchData, headingData, sortingType, filterKeyId) => {
    const payload = getSingleFieldDataApi(id, perPageRows, currentPage, searchData, headingData, sortingType, filterKeyId)
    return {
        type: actionTypes.GET_SINGLE_FIELD_DATA,
        payload
    }
}



export const postCommonAddSelectedUsersData = (viewType, data) => {
    const payload = postCommonAddSelectedUsersDataApi(viewType, data)
    return {
        type: actionTypes.POST_COMMON_ADD_SELECTED_USERS_DATA,
        payload
    }
}


export const postCommonRemovePeople = (viewType, data) => {
    const payload = postCommonRemovePeopleApi(viewType, data)
    return {
        type: actionTypes.POST_COMMON_REMOVE_PEOPLE,
        payload
    }

}