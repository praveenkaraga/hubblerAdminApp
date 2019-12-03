import * as actionTypes from '../actionTypes'
import { getTeamViewUsers,getClickedTeamViewUser,getClickedTeamViewOrgData,getClickedUserReporteeData } from '../../apiCall'
import uniqBy from "lodash/uniqBy";

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

export const storeClickedUserId = (userID,member) =>{
    return {
        type: actionTypes.STORE_CLICKED_USER_ID,
        payload : {
            teamViewClickedUserId : userID,
            clickedMemberData :member
        }
    }
};

export const changeLoaderStatus = (payload) =>{
    return{
        type: actionTypes.CHANGE_LOADER_STATUS,
        payload : {
            contentLoader : payload
        }

    }
};

export const getClickedTeamUserReporteeData = (userId) =>{
    const payload = getClickedUserReporteeData(userId)
    return {
        type: actionTypes.GET_CLICKED_TEAM_USER_REPORTEE_DATA,
        payload
    }
}
export const updateRollBackData = (reportees,preservedData,rootData) =>{
    return {
        type: actionTypes.GET_BACK_MANAGER_DATA,
        payload : {
            orgChartUsers: reportees,
            preservedData: preservedData,
            rootData: rootData
        }
    }
}

export const importUsersPopUPVisibility = (flag) =>{
    return{
        type: actionTypes.IMPORT_USERS_POPUP_VISIBILITY,
        payload:{
            importUsersPopUpVisiblity : flag
        }
    }

}






