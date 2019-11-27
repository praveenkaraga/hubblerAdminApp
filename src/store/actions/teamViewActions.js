import * as actionTypes from '../actionTypes'
import { getTeamViewUsers,getClickedTeamViewUser,getClickedTeamViewOrgData } from '../../apiCall'

export const getTeamViewUsersData = (data) => {
    const payload = getTeamViewUsers()
    return {
        type: actionTypes.GET_TEAM_VIEW_USER_DATA,
        payload
    }
}

export const teamViewUserClick = (payload) =>{
    return{
        type: actionTypes.TEAM_VIEW_USER_CLICK,
        payload
    }

}

export const getClickedTeamUserData = (userId) =>{
    const payload = getClickedTeamViewUser(userId)
    return {
        type: actionTypes.GET_CLICKED_TEAM_USER_DATA,
        payload
    }
}
export const getTeamViewOrgData = (userId) =>{
    const payload = getClickedTeamViewOrgData(userId)
    return {
        type: actionTypes.GET_TEAM_VIEW_ORG_DATA,
        payload
    }
}

export const storeClickedUserId = (payload) =>{
    return {
        type: actionTypes.STORE_CLICKED_USER_ID,
        payload
    }
}

