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
    singleViewSuggestionDataCount: 0,
    singleFieldCount: 0,
    singleFieldData: [],
    postSelectedUsersSuccessMessage: "",
    postSelectedUsersSuccessfully: false,
    postRemovePeopleSuccessfully: false,
    postRemovePeopleSuccessMessage: "",
    postDeletedDataSuccessfulMessage: "",
    postDeletedDataSuccessfully: false
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
            // console.log(newDataInitial)
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
            const intitalTableConf = Object.keys(intitalSessionData).length ? intitalSessionData.table_configuration.users : []
            const finalTableConf = Object.keys(intitalSessionData).length ? intitalTableConf.fields : []
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
            // console.log(singleFieldDataInitial, "singleFieldDataInitial")
            return {
                ...state,
                singleFieldName: singleFieldDataInitial ? singleFieldDataInitial.name : "",
                singleFieldCount: singleFieldDataInitial ? singleFieldDataInitial.total_count : 0,
                singleFieldData: singleFieldDataInitial ? singleFieldDataInitial.result : []
            }

        case actionTypes.POST_COMMON_ADD_SELECTED_USERS_DATA:
            const initialPostSelectedUsersData = action.payload.data
            return {
                ...state,
                postSelectedUsersSuccessMessage: initialPostSelectedUsersData?.msg || "Users Added",
                postSelectedUsersSuccessfully: true
            }


        case actionTypes.POST_COMMON_REMOVE_PEOPLE:
            const intitialRemovePeopleData = action.payload.data
            return {
                ...state,
                postRemovePeopleSuccessMessage: intitialRemovePeopleData ? intitialRemovePeopleData.msg : "Users Removed",
                postRemovePeopleSuccessfully: true
            }


        case actionTypes.POST_COMMON_DELETE:
            const intialDeleteData = action.payload.data
            return {
                ...state,
                postDeletedDataSuccessfulMessage: intialDeleteData?.result?.message || "Deleted Successfully",
                postDeletedDataSuccessfully: true
            }

    }


    return { ...state }

}