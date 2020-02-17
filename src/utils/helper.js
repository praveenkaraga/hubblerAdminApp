//getting CSRF token
function getCSRFTokenFromCookie() {
    let cookieValue = null;
    let name = "csrftoken2";
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            cookie = cookie.trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const axiosConfig = {
    headers: {
        "X-CSRFToken": getCSRFTokenFromCookie(),
        "Content-Type": "application/json; charset=utf-8",
        "X-Requested-With": "XMLHttpRequest"
    },
    cache: "no-cache",
    credentials: "same-origin",
    referrer: "no-referrer",
    redirect: "follows" // manual, *follow, error
};









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