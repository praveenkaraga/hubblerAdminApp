//checking error and updatinf the errorMsg
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