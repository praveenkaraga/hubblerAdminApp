import * as actionTypes from '../actionTypes'
import { getCirclesDataApi, getCustomFieldsApi } from '../../apiCall'



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