import {checkError} from "../../../utils/helper";
import * as actionTypes from "../../actionTypes";
import filter from 'lodash/filter'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    count: 1,
    holidayColumnData: [],
    holidayProfilesData: [],
    searchLoader: false,

}

export const holidayReducer = (state = initialState, action) => {
    const {errorData, isError} = checkError(state, action);
    if (isError) {
        return {...errorData}
    }

    switch (action.type) {

        case actionTypes.COMMON_HOLIDAY_ACTION :
            return {
                ...state, ...action.payload
            };


        case actionTypes.GET_HOLIDAY_TABLE_COLUMN_DATA:
            const columnDataInitial = action.payload.data;
            const columnData = columnDataInitial ? action.payload.data.result : [];
            return {
                ...state,
                holidayColumnData: columnData
            };


        case actionTypes.GET_HOLIDAY_PROFILES_DATA:
            const holidayDataDataInitial = action.payload.data
            const holidayData = holidayDataDataInitial ? holidayDataDataInitial.result : []
            const holidayDataCopy = JSON.parse(JSON.stringify(holidayData))
            const d = map(holidayDataCopy, ele => ({
                ...ele,
                holiday_profile: ele.name,
                people: ele.user_count,
                holidays: ele.holiday_count
            }))
            const totalUsers = holidayDataDataInitial ? holidayDataDataInitial.total_count : 0
            return {
                ...state,
                holidayProfilesData: d,
                totalUsers,
                searchLoader: false,
            };

        case actionTypes.GET_HOLIDAY_TYPE_DATA :
            const holidayTypeDataInitial = action.payload.data;
            const holidayTypeData = holidayTypeDataInitial ? holidayTypeDataInitial.result : [];
            return {
                holidayTypeData : holidayTypeData,
            }



        /*case actionTypes.POST_CREATE_DEPARTMENT_DATA:
        const initialData = action.payload.data;
        const data = initialData ? initialData : {};
        return {
            ...state,
            createdDepartmentData: data,
            commonViewLoader: false,
            viewDecider: 0
        }
    case actionTypes.POST_ADD_SELECTED_USERS_DATA:
        const dataInitial = action.payload.data;
        return {
            ...state,
            dataInitial
        };
    case actionTypes.GET_ADD_SELECTED_USERS_POSTED_DATA:
        const addedUsersInitialData = action.payload.data;
        const allSelectedUserData = addedUsersInitialData ? addedUsersInitialData.result : []
        const allSelectedUserDataCopy = JSON.parse(JSON.stringify(allSelectedUserData))
        const totalAllSelectedUsers = addedUsersInitialData ? addedUsersInitialData.total_count : 0
        let decideView = isEmpty(allSelectedUserData) ? false : true
        return {
            ...state,
            addedUsersData: addedUsersInitialData ? addedUsersInitialData : [],
            viewDecider: decideView,
            commonViewLoader: false,
            allSelectedUsersSearchLoader: false,
            totalAllSelectedUsers
        };

    case actionTypes.GET_ADDABLE_USERS_DATA:
        const userDataIntital = action.payload.data
        const userData = userDataIntital ? userDataIntital.result : []
        const userDataCopy = JSON.parse(JSON.stringify(userData))
        const totalAddableUsers = userDataIntital ? userDataIntital.total_count : 0
        return {
            ...state,
            addableUsersData: userDataCopy,
            totalAddableUsers,
            addUsersSearchLoader: false,
        }

    case actionTypes.GET_COMMON_VIEW_HEADER_NAME:
        let headerInitial = action.payload.data ? action.payload.data.result : {};
        let commonViewHeader = headerInitial.name ? headerInitial.name : '';
        console.log(action.payload.data);
        return {
            headerNameWhenRouted: commonViewHeader
        }

    case actionTypes.GET_DEPARTMENTS_SUGGESTION_DATA:
        const departmentSuggestionDataInitial = action.payload.data.result;
        return {
            ...state,
            departmentSuggestionData: departmentSuggestionDataInitial,
        }
    case actionTypes.EDIT_USER_DATA_FORM:
        const editUserDataFormInitial = action.payload.data ? action.payload.data.result : []
        return {
            ...state,
            editUserDataFormMain: editUserDataFormInitial,
            editUserDataForm: JSON.parse(JSON.stringify(editUserDataFormInitial))
        }*/


    }
    return {...state}
}