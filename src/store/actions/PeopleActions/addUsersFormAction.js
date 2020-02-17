import * as actionTypes from '../../actionTypes'
import {
    getAddUsersProfileDataApi
} from '../../../utils/Apis/peopleApi'



export const getAddUsersProfileData = (id) => {
    const payload = getAddUsersProfileDataApi(id)
    return {
        type: actionTypes.GET_ADD_USERS_PROFILE_DATA,
        payload
    }
}