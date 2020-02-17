import {checkError} from "../../../utils/helper";
import * as actionTypes from "../../actionTypes";
import filter from 'lodash/filter'
import map from 'lodash/map'

const initialState = {
    count: 1,
    departmentColumnData: [],
    departmentsData: [],
    addableUsersData: [],
    tableColumnsData: [],
    viewDecider: false, //populateSelectedUsersView
    commonViewLoader: false,
    headerNameWhenRouted: '',
    addedUsersData: [],
    createdDepartmentData: {},
    departmentImportUsersVisibility: false,
    startUploadStatus: false,
    searchLoader: false,
    allSelectedUsersSearchLoader: false,
    addUsersSearchLoader: false,
    departmentSuggestionData: [],
    editUserDataForm: [],
    editUserDataFormMain: [],
}

export const departmentReducer = (state = initialState, action) => {
    const {errorData, isError} = checkError(state, action);
    if (isError) {
        return {...errorData}
    }


    switch (action.type) {
        case actionTypes.GET_DEPARTMENTS_DATA:
            const departmentsDataDataInitial = action.payload.data
            const departmentsData = departmentsDataDataInitial ? departmentsDataDataInitial.result : []
            const departmentsDataCopy = JSON.parse(JSON.stringify(departmentsData))
            const d = map(departmentsDataCopy, ele => ({...ele, departments: ele.name, people: ele.count}))
            const totalUsers = departmentsDataDataInitial ? departmentsDataDataInitial.total_count : 0
            return {
                ...state,
                departmentsData: d,
                totalUsers,
                searchLoader: false,
            };

        case actionTypes.COMMON_DEPARTMENT_ACTION :
            return {
                ...state, ...action.payload
            };

        case actionTypes.GET_DEPT_TABLE_COLUMN_DATA:
            const columnDataInitial = action.payload.data;
            const columnData = columnDataInitial ? filter(action.payload.data.result, ele => ele._id !== 'designations') : [];
            return {
                ...state,
                departmentColumnData: columnData
            }

        case actionTypes.POST_CREATE_DEPARTMENT_DATA:
            const initialData = action.payload.data;
            const data = initialData ? initialData : {};
            return {
                ...state,
                createdDepartmentData: data,
                commonViewLoader: false,
                newDataCreatedSuccessfully : true,
                viewDecider: 0
            }
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
            }


    }
    return {...state}
}