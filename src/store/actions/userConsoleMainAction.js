import * as actionTypes from '../actionTypes'
import {
    getCirclesDataApi,
    getCustomFieldsApi,
    getCircleSuggestionDataApi, getParentNodeOptions
} from '../../apiCall'



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



export const getCircleSuggestionData = (id, searchData) => {
    const payload = getCircleSuggestionDataApi(id, searchData)
    return {
        type: actionTypes.GET_CIRCLE_SUGGESTION_DATA,
        payload
    }
}

export const getParentNodeOptionsData = () => {
    const payload = getParentNodeOptions()
    return {
        type: actionTypes.GET_PARENT_NODE_OPTIONS,
        payload
    }
}

export const commonUserConsoleAction = (payload) =>{
    return {
        type: actionTypes.COMMON_USER_CONSOLE_ACTION,
        payload
    }
}


// export const getSingleFieldData = (id, perPageRows, currentPage, searchData, headingData, sortingType) => {
//     const payload = getSingleFieldDataApi(id, perPageRows, currentPage, searchData, headingData, sortingType)
//     return {
//         type: actionTypes.GET_SINGLE_FIELD_DATA,
//         payload
//     }
// }