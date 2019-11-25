import * as actionTypes from '../actionTypes'
import { getTeamViewUsers } from '../../apiCall'

export const getTeamViewUsersData = (data) => {
    const payload = getTeamViewUsers()
    return {
        type: actionTypes.GET_TEAM_VIEW_USER_DATA,
        payload
    }
}

export const getUsersInfo = () =>{

}

export const teamViewUserClick = (payload) =>{
    return{
        type: actionTypes.TEAM_VIEW_USER_CLICK,
        payload
    }

}

