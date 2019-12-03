import {checkError} from '../../utils/helper'
import * as actionTypes from '../actionTypes'
import findIndex from "lodash/findIndex";
import slice from 'lodash/slice'
import uniqBy from "lodash/uniqBy";

const intialState = {
    count: 1,
    activeLinkName: 'console',
    consoleDrawerVisible: false,
    orgChartUsers: [],
    mainData: [],
    loader: true,
    contentLoader: true,
    rootData: [],
    preservedData: [],
    importUsersPopUpVisiblity: false,
    uploadPopUpVisibility : false,
}

export const teamViewReducer = (state = intialState, action) => {
    const {errorData, isError} = checkError(state, action);
    if (isError) {
        return {...errorData}
    }


    switch (action.type) {
        case actionTypes.GET_USER_DATA:
            return {
                ...state,
                count: 2
            }


        case actionTypes.CREATE_ACTIVE_LINK:
            return {
                ...state,
                activeLinkName: action.payload
            }

        case actionTypes.HAMBURGER_ICON_CLICK:
            return {
                ...state,
                consoleDrawerVisible: action.payload
            }
        case actionTypes.GET_TEAM_VIEW_USER_DATA:
            return {
                ...state,
                orgChartUsers: action.payload.data ? action.payload.data.reportees : [] || state.orgChartUsers,
                mainData: action.payload.data ? action.payload.data.reportees : state.mainData,
                loader: false,
            }
        case actionTypes.STORE_CLICKED_USER_ID:
            return {
                ...state, ...action.payload
            }
        case actionTypes.TEAM_VIEW_USER_CLICK:
            return {
                ...state,
                teamViewUserDrawerVisible: action.payload
            }
        case actionTypes.GET_CLICKED_TEAM_USER_DATA:
            return {
                ...state,
                clickedTeamUserData: action.payload.data.result || {},
                contentLoader: false

            }
        case actionTypes.GET_TEAM_VIEW_ORG_DATA:
            return {
                ...state,
                clickedUserOrgManagerData: [action.payload.data.manager] || [],
                clickedUserOrgReporteesData: action.payload.data.reportees || [],
                total_Count: action.payload.data.total_count || '',
                contentLoader: false,
            }

        case actionTypes.CHANGE_LOADER_STATUS:
            return {
                ...state, ...action.payload
            }

        case actionTypes.GET_CLICKED_TEAM_USER_REPORTEE_DATA :
            const rootData = state.rootData;
            const id = state.clickedMemberData._id;
            const user = state.clickedMemberData;
            if (!user.userSelected) {
                rootData.push({...user, userSelected: true})
            }
            let userIndex = findIndex(rootData, {_id: id});
            let newRootData = slice(rootData, 0, (userIndex + 1));
            return {
                ...state,
                orgChartUsers: action.payload.data ? action.payload.data.reportees : [] || state.orgChartUsers,
                preservedData: [...state.preservedData, {
                    id: id,
                    reportees: action.payload.data ? action.payload.data.reportees : []
                }],
                rootData: uniqBy(newRootData, '_id')

            }

        case actionTypes.GET_BACK_MANAGER_DATA :
            return {
                ...state, ...action.payload
            }

        case actionTypes.IMPORT_USERS_POPUP_VISIBILITY :
            return {
                ...state, ...action.payload
            }
        case actionTypes.DOWNLOAD_SAMPLE_EXCEL :
            return {
                ...state,
                sampleExcelFile: action.payload.data.result
            }

        case actionTypes.GET_UPLOAD_FIELDS_DETAILS :
            console.log(action.payload)
            return {
                ...state,
                uploadPopUpData: action.payload.data.result ?  action.payload.data.result[0] : {},
                uploadPopUpVisibility:true
            }

    }

    return {...state}
}