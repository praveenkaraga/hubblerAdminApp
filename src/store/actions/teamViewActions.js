import * as actionTypes from '../actionTypes'
import {
    getTeamViewUsers,
    getClickedTeamViewUser,
    getClickedTeamViewOrgData,
    getClickedUserReporteeData,
    downloadExcelCall,
    getUploadFieldData,
    patchUploadData
} from '../../apiCall'
import uniqBy from "lodash/uniqBy";

export const getTeamViewUsersData = (data) => {
    const payload = getTeamViewUsers()
    return {
        type: actionTypes.GET_TEAM_VIEW_USER_DATA,
        payload
    }
}

export const teamViewUserClick = (payload) => {
    return {
        type: actionTypes.TEAM_VIEW_USER_CLICK,
        payload
    }

}

export const getClickedTeamUserData = (id) => {
    const payload = getClickedTeamViewUser(id)
    return {
        type: actionTypes.GET_CLICKED_TEAM_USER_DATA,
        payload
    }
}
export const getTeamViewOrgData = (url) => {
    const payload = getClickedTeamViewOrgData(url)
    return {
        type: actionTypes.GET_TEAM_VIEW_ORG_DATA,
        payload
    }
}

export const storeClickedUserId = (userID, member) => {
    return {
        type: actionTypes.STORE_CLICKED_USER_ID,
        payload: {
            teamViewClickedUserId: userID,
            clickedMemberData: member
        }
    }
};

export const changeLoaderStatus = (payload) => {
    return {
        type: actionTypes.CHANGE_LOADER_STATUS,
        payload: {
            contentLoader: payload
        }

    }
};

export const getClickedTeamUserReporteeData = (userId) => {
    const payload = getClickedUserReporteeData(userId)
    return {
        type: actionTypes.GET_CLICKED_TEAM_USER_REPORTEE_DATA,
        payload
    }
}
export const updateRollBackData = (reportees, preservedData, rootData) => {
    return {
        type: actionTypes.GET_BACK_MANAGER_DATA,
        payload: {
            orgChartUsers: reportees,
            preservedData: preservedData,
            rootData: rootData
        }
    }
}

export const importUsersPopUPVisibility = (flag) => {
    return {
        type: actionTypes.IMPORT_USERS_POPUP_VISIBILITY,
        payload: {
            importUsersPopUpVisiblity: flag
        }
    }

}

export const onClickOfDownloadExcel = () => {
    const payload = downloadExcelCall()
    return {
        type: actionTypes.DOWNLOAD_SAMPLE_EXCEL,
        payload
    }
}
export const getImportUserUploadDetails = () => {
    const payload = getUploadFieldData()
    return {
        type: actionTypes.GET_UPLOAD_FIELDS_DETAILS,
        payload
    }
}

export const uploadImportUsersPopUPVisibility = (flag) => {
    return {
        type: actionTypes.UPLOAD_IMPORT_USERS_POPUP_VISIBILITY,
        payload: {
            uploadPopUpVisibility: flag
        }
    }
}

export const patchImportUsersData = (id,data,status) =>{
    const payload = patchUploadData(id,data)
    return {
        type: actionTypes.PATCH_IMPORT_USERS_DATA,
        payload
    }
}

export const commonTeamReducerAction = (payload) =>{
    return {
        type: actionTypes.COMMON_ACTION,
        payload
    }
}









