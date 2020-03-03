import * as actionTypes from '../../actionTypes'
import {
    getTeamViewUsers,
    getClickedTeamViewUser,
    getClickedTeamViewOrgData,
    getClickedUserReporteeData,
    downloadExcelCall,
    getUploadFieldData,
    patchUploadData,getUsers
} from '../../../utils/Apis/peopleApi'

export const getTeamViewUsersData = (data) => { // to get the users of the organization for team view
    const payload = getTeamViewUsers()
    return {
        type: actionTypes.GET_TEAM_VIEW_USER_DATA,
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

export const getClickedTeamUserReporteeData = (userId) => {
    const payload = getClickedUserReporteeData(userId)
    return {
        type: actionTypes.GET_CLICKED_TEAM_USER_REPORTEE_DATA,
        payload
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
            uploadPopUpVisibility: flag,
        }
    }
}

export const patchImportUsersData = (id,data,status) =>{
    const payload = patchUploadData(id,data)
    return {
        type: actionTypes.PATCH_IMPORT_USERS_DATA,
        payload
    }
};

export const commonTeamReducerAction = (payload) =>{
    return {
        type: actionTypes.COMMON_ACTION,
        payload
    }
};

export const searchDropDownData = (perPageRows, currentPage, searchData, headingData, sortingType) =>{
    const payload = getUsers(perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_SEARCH_DROPDOWN_DATA,
        payload
    }
};

export const getAllUsers= () =>{
    const payload = getUsers()
    return {
        type: actionTypes.GET_ALL_USERS,
        payload
    }
};









