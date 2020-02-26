import { postCommonDeleteApi,patchCommonCreateDataApi,postProfileCreatedDataApi } from "../../../utils/Apis/profileApi";
import * as actionTypes from "../../actionTypes";

export const postProfileCommonDelete = (profileType, data, id) => {
    const payload = postCommonDeleteApi(profileType, data, id)
    return {
        type: actionTypes.POST_PROFILE_COMMON_DELETE,
        payload
    }
};

export const commonActionForCommonProfileReducer = (payload) => {
    return {
        type: actionTypes.COMMON_ACTION_FOR_COMMON_PROFILE_REDUCER,
        payload
    }
}

export const patchCommonCreatedData = (type,subtype, id, data) => { //to patch the edited data from the CreationPopup
    const payload = patchCommonCreateDataApi(type,subtype, id, data)
    return {
        type: actionTypes.PATCH_COMMON_CREATE_DATA,
        payload
    }
}
export const postCommonProfileCreatedData = (type,subtype,data) => { //to patch the edited data from the CreationPopup
    const payload = postProfileCreatedDataApi(type,subtype,data)
    return {
        type: actionTypes.POST_COMMON_PROFILE_CREATED_DATA,
        payload
    }
}

