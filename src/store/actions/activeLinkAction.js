import * as actionTypes from '../actionTypes'

export const createActiveLink = (payload) => {
    return {
        type: actionTypes.CREATE_ACTIVE_LINK,
        payload
    }
}