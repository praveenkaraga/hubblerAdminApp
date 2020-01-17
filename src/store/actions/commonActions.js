import * as actionTypes from '../actionTypes'
import { getSingleViewDataApi } from '../../apiCall'

export const getSingleViewData = (viewType, id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getSingleViewDataApi(viewType, id, perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_SINGLE_VIEW_DATA,
        payload
    }
}