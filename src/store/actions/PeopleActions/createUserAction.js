import * as actionTypes from '../../actionTypes'
import { getUsers } from '../../../utils/Apis/peopleApi'

export const getUserData = (data) => {
    const payload = getUsers()
    return {
        type: actionTypes.GET_USER_DATA,
        payload
    }
}

