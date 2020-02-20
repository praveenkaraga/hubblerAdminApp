import {checkError} from '../../../utils/helper'
import * as actionTypes from '../../actionTypes'
import findIndex from "lodash/findIndex";
import slice from 'lodash/slice'
import uniqBy from "lodash/uniqBy";
import first from 'lodash/first'
import find from 'lodash/find'

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
    uploadPopUpVisibility: false,
    importUsersUploadResponseData: {},
    uploadFileStatus: false,
    startUploadStatus: false,
    importStatus: false,
    clickedUserOrgData: {},
    clickedTeamUserData: {},
    searchDropdownData: [],
    reporteeLoader: false,
    allUsers:[],
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
                rootData: [],
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
                clickedUserOrgData: action.payload.data,
                total_Count: action.payload.data.total_count || '',
                /* clickedUserOrgManagerData: [action.payload.data.manager] || [],
                 clickedUserOrgReporteesData: action.payload.data.reportees || [],
                 total_Count: action.payload.data.total_count || '',*/
                contentLoader: false,
            }

        case actionTypes.CHANGE_LOADER_STATUS:
            return {
                ...state, ...action.payload
            }

        case actionTypes.GET_CLICKED_TEAM_USER_REPORTEE_DATA:
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
                    reportees: action.payload.data ? action.payload.data.reportees : [],
                    total_count :  action.payload.data.total_count ||  ''
                }],
                total_count: action.payload.data.total_count ||  '',
                rootData: uniqBy(newRootData, '_id'),
                reporteeLoader: false

            }

        case actionTypes.GET_BACK_MANAGER_DATA:
            return {
                ...state, ...action.payload
            }

        case actionTypes.IMPORT_USERS_POPUP_VISIBILITY:
            return {
                ...state, ...action.payload
            };
        case actionTypes.DOWNLOAD_SAMPLE_EXCEL:
            return {
                ...state,
                sampleExcelFile: action.payload.data ? action.payload.data.result : ""
            };

        case actionTypes.GET_UPLOAD_FIELDS_DETAILS:
            return {
                ...state,
                uploadPopUpData: action.payload.data ? action.payload.data.result ? action.payload.data.result.length ? first(action.payload.data.result) : [] : [] : {},
                uploadPopUpVisibility: true,
                startUploadStatus: false,

                /*importUsersPopUpVisiblity:false*/
            };
        case actionTypes.UPLOAD_IMPORT_USERS_POPUP_VISIBILITY:
            return {
                ...state, ...action.payload
            };
        case actionTypes.PATCH_IMPORT_USERS_DATA:
            return {
                ...state,
                importUsersUploadResponseData: action.payload.data || {},
                uploadFileStatus: false,
                isFileUploaded: true,
                importUsersPopUpVisiblity: false
            };
        case actionTypes.COMMON_ACTION:
            return {
                ...state, ...action.payload
            };
        case actionTypes.GET_SEARCH_DROPDOWN_DATA:
            console.log(action.payload);
            return {
                ...state,
                searchDropDownData: action.payload.data ? action.payload.data.result : []
            };
        case actionTypes.GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload.data ? action.payload.data.result : []
            };

    }

    return {...state}
}