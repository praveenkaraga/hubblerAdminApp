import * as actionTypes from '../actionTypes'
import { getTeamViewUsers,getClickedTeamViewUser } from '../../apiCall'

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

