import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    count: 1,
    activeLinkName: 'console',
    consoleDrawerVisible: false,
    orgChartUsers: [],


}

export const teamViewReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
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
                orgChartUsers: action.payload.data.reportees || state.orgChartUsers
            }
        case actionTypes.STORE_CLICKED_USER_ID:
            return {
                ...state,
                teamViewClickedUserId: action.payload
            }
        case actionTypes.TEAM_VIEW_USER_CLICK:
            return {
                ...state,
                teamViewUserDrawerVisible: action.payload
            }
        case actionTypes.GET_CLICKED_TEAM_USER_DATA:
            console.log(action.payload.data.result)
            return {
                ...state,
                clickedTeamUserData: action.payload.data.result || {}
            }
        case actionTypes.GET_TEAM_VIEW_ORG_DATA:
            console.log(action.payload.data.result)
            return {
                ...state,
                clickedUserOrgManagerData: action.payload.data.manager || {},
                clickedUserOrgReporteesData: action.payload.data.reportees || [],
            }
    }


    return { ...state }


}