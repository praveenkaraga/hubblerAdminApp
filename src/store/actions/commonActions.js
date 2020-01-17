import * as actionTypes from '../actionTypes'
import { getSingleViewDataApi, getSingleViewSuggestionDataApi } from '../../apiCall'

export const getSingleViewData = (viewType, id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getSingleViewDataApi(viewType, id, perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_SINGLE_VIEW_DATA,
        payload
    }
}


export const getSingleViewSuggestionData = (viewType, id, searchData) => {
    const payload = getSingleViewSuggestionDataApi(viewType, id, searchData)
    return {
        type: actionTypes.GET_SINGLE_VIEW_SUGGESTION_DATA,
        payload
    }
}