//checking error and update the errorMsg
export function checkError(state, { payload }) {
    const errorPayload = {
        errorData: null,
        isError: false
    };

    if (payload && payload.data) {
        if (!payload.data.success) {
            const { error } = payload.data;
            errorPayload.errorData = { ...state, errorMsg: error }
            errorPayload.isError = true;
        }
    }
    return errorPayload
}


export function validationRules(required, label, minLength, maxLength) { //pre defined rules for validations...using for all fields
    return [{ required: required, message: `Please input ${label}` },
    { min: minLength, message: `Minimum ${minLength} Letters` },
    { max: maxLength, message: `Maximum ${maxLength} Letters` }]
}


export const getNodeId = (history) => {
    return history.location.pathname.split("/")[3]
}

export const getSubNodeId = (history) => {
    return history.location.pathname.split("/")[4]
}


export const capitalFirstLetter = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1)
}