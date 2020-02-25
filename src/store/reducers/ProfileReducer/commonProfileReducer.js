import { checkError } from '../../../utils/helper'
import * as actionTypes from '../../actionTypes'

const initialState = {
    postDeletedDataSuccessfulMessage: "",
    postDeletedDataSuccessfully: false
}

export const commonPeopleReducer = (state = initialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
        case actionTypes.POST_PROFILE_COMMON_DELETE:
            const initialDeleteData = action.payload.data
            return {
                ...state,
                postDeletedDataSuccessfulMessage: initialDeleteData ? (typeof initialDeleteData.result === "string" ? initialDeleteData.result : initialDeleteData.result.message || "Deleted Successfully") : initialDeleteData.message || "Deleted Successfully",
                postDeletedDataSuccessfully: true
            }

    }
    return { ...state }
}