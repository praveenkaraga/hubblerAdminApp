import { postCommonDeleteApi } from "../../../utils/Apis/profileApi";
import * as actionTypes from "../../actionTypes";

export const postProfileCommonDelete = (viewType, data, id) => {
    const payload = postCommonDeleteApi(viewType, data, id)
    return {
        type: actionTypes.POST_PROFILE_COMMON_DELETE,
        payload
    }
};