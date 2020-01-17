import {checkError} from "../../utils/helper";
import * as actionTypes from "../actionTypes";
import filter from 'lodash/filter'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    count: 1,
    departmentColumnData: [],
    departmentsData: [],
    addableUsersData: [],
    tableColumnsData: [],
    viewDecider: false, //populateSelectedUsersView
    commonViewLoader: false,
    headerNameWhenRouted:'',
    addedUsersData:[],
    createdDepartmentData : {},
    departmentImportUsersVisibility:false,
    startUploadStatus:false,
    searchLoader: false,
    allSelectedUsersSearchLoader:false,
    addUsersSearchLoader:false,
    departmentSuggestionData :[],
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
        case actionTypes.GET_TABLE_COLUMN:
            const tableColumnDataInitial = action.payload.data;
            const tableColumnData = tableColumnDataInitial ? action.payload.data.result : [];
            return {
                ...state,
                tableColumnsData: tableColumnData
            }

        case actionTypes.POST_CREATE_DEPARTMENT_DATA:
            const initialData = action.payload.data;
            const data = initialData ? initialData : {};
            return {
                ...state,
                createdDepartmentData: data,
                commonViewLoader: false,
                viewDecider : 0
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
                allSelectedUsersSearchLoader:false,
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
                addUsersSearchLoader:false,
            }

        case actionTypes.GET_COMMON_VIEW_HEADER_NAME:
            let headerInitial = action.payload.data ?   action.payload.data.result : {};
            let commonViewHeader = headerInitial.name ? headerInitial.name : '';
            console.log(action.payload.data);
            return {
                headerNameWhenRouted : commonViewHeader
            }

        case actionTypes.GET_DEPARTMENTS_SUGGESTION_DATA:
            const departmentSuggestionDataInitial = action.payload.data.result;
            return {
                ...state,
                departmentSuggestionData: departmentSuggestionDataInitial,
            }


    }
    return {...state}
}