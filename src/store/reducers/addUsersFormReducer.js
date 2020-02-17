import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {

}

export const addUsersFormReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
        case actionTypes.GET_ADD_USERS_PROFILE_DATA:
            console.log(action.payload.data)
            return {
                ...state,

            }

    }


    return { ...state }

}