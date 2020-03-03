import * as actionTypes from '../../actionTypes'
import {
    getAddUsersProfileDataApi, getAddUserDataForm
} from '../../../utils/Apis/peopleApi'



export const addUserDataForm = () => {
    const payload = getAddUserDataForm()
    return {
        type: actionTypes.ADD_USER_DATA_FORM,
        payload
    }
}


export const getAddUsersProfileData = (id) => {
    const payload = getAddUsersProfileDataApi(id)
    return {
        type: actionTypes.GET_ADD_USERS_PROFILE_DATA,
        payload
    }
}