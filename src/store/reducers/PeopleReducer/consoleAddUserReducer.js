import { checkError } from '../../../utils/helper'
import * as actionTypes from '../../actionTypes'

const intialState = {
    addUserDataForm: [],
    addUserDataFormMain: [],
}

export const consoleAddUserReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
    case actionTypes.ADD_USER_DATA_FORM:
        const addUserDataFormInitial = action.payload.data ? action.payload.data.result : []
        return {
            ...state,
            addUserDataFormMain: addUserDataFormInitial,
            addUserDataForm: JSON.parse(JSON.stringify(addUserDataFormInitial))
        }


    case actionTypes.GET_ADD_USERS_PROFILE_DATA:
        console.log(action.payload.data)
        return {
            ...state,

        }

    default:
        return { ...state }

    }

    
}