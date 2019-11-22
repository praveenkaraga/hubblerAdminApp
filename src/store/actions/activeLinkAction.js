import * as actionTypes from '../actionTypes'

export const createActiveLink = (payload) => {
    return {
        type: actionTypes.CREATE_ACTIVE_LINK,
        payload
    }
}

export const hamburgerIconClick = (payload) =>{
    return{
        type: actionTypes.HAMBURGER_ICON_CLICK,
        payload
    }

}