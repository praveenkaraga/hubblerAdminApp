import * as actionTypes from '../actionTypes'
import { getDesignationsData } from '../../apiCall'

export const designationsData = () => {
    const payload = getDesignationsData()
    return {
        type: actionTypes.GET_DESIGNATIONS_DATA,
        payload
    }

}

export const commonDesignationAction = (payload) => {
    return {
        type: actionTypes.COMMON_DESIGNATION_ACTION,
        payload
    }
}