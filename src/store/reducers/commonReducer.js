import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    singleViewName: "",
    singleViewCount: 0,
    singleViewData: [],
    singleViewSuggestionData: [],
    newDataCreatedSuccessfully: false,
    patchSuccessMessage: "",
    patchDataCreatedSuccessfully: false,
    tableColumnData: [],
    singleViewSuggestionDataCount: 0

}

export const commonReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
        case actionTypes.GET_SINGLE_VIEW_DATA:
            const singleViewDataItitial = action.payload.data
            return {
                ...state,
                singleViewName: singleViewDataItitial ? singleViewDataItitial.name : "",
                singleViewCount: singleViewDataItitial ? singleViewDataItitial.total_count : 0,
                singleViewData: singleViewDataItitial ? singleViewDataItitial.result : []
            }


        case actionTypes.GET_SINGLE_VIEW_SUGGESTION_DATA:
            const singleViewSuggestionDataInitial = action.payload.data
            return {
                ...state,
                singleViewSuggestionData: singleViewSuggestionDataInitial ? singleViewSuggestionDataInitial.result : [],
                singleViewSuggestionDataCount: singleViewSuggestionDataInitial ? singleViewSuggestionDataInitial.total_count : 0
            }

        case actionTypes.POST_COMMON_CREATE_DATA:
            const newDataInitial = action.payload.data
            return {
                ...state,
                newDataCreatedSuccessfully: true,
                newCreatedDataId: newDataInitial ? newDataInitial.id : ""
            }

        case actionTypes.COMMON_ACTION_FOR_COMMON_REDUCER:
            return {
                ...state,
                ...action.payload
            }

        case actionTypes.PATCH_COMMON_CREATE_DATA:
            const patchDataInitial = action.payload.data
            return {
                ...state,
                patchDataCreatedSuccessfully: true,
                patchSuccessMessage: patchDataInitial ? patchDataInitial.result : ""
            }


        case actionTypes.GET_LOGIN_SESSION_DATA:
            const intitalSessionData = action.payload.data ? action.payload.data.session_user : []
            const intitalTableConf =  intitalSessionData.table_configuration.users  || []
            const finalTableConf = intitalTableConf.fields || []
            finalTableConf.forEach((data, i) => {
                finalTableConf[i]["title"] = data.lbl
                finalTableConf[i]["dataIndex"] = data._id
                finalTableConf[i]["sorter"] = true
                finalTableConf[i]["sortDirections"] = ["descend", "ascend"]
                finalTableConf[i]["ellipsis"] = true
            });
            return {
                ...state,
                tableColumnData: finalTableConf
            }


        case actionTypes.GET_SINGLE_FIELD_DATA:
            const singleFieldDataInitial = action.payload.data
            console.log(singleFieldDataInitial, "singleFieldDataInitial")
            return {
                ...state,
                // // singleFieldName: singleFieldDataInitial.name,
                // singleFieldCount: singleFieldDataInitial.total_count,
                // singleFieldData: singleFieldDataInitial ? singleFieldDataInitial.result : []
            }


    }


    return { ...state }

}