import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    count: 1,
    activeLinkName: 'console',
    consoleDrawerVisible: false,
    orgChartUsers: []

}

export const firstReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }


    switch (action.type) {
        case actionTypes.GET_USER_DATA:
            // console.log(action.payload)
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
    }


    return { ...state }


}