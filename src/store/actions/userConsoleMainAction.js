import * as actionTypes from '../actionTypes'
import { getCirclesDataApi, getCustomFieldsApi, getSingleCircleDataApi } from '../../apiCall'



export const getCirclesData = searchData => {
    const payload = getCirclesDataApi(searchData)
    return {
        type: actionTypes.GET_CIRCLES_DATA,
        payload
    }
}


export const getCustomFields = () => {
    const payload = getCustomFieldsApi()
    return {
        type: actionTypes.GET_CUSTOM_FIELDS_DATA,
        payload
    }
}



export const getSingleCircleData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getSingleCircleDataApi(id, perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_SINGLE_CIRCLE_DATA,
        payload
    }
}