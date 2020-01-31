import { checkError } from '../../utils/helper'
import * as actionTypes from '../actionTypes'

const intialState = {
    initial: 0,
    consoleColumnData: [],
    consoleUserData: [],
    totalUsers: 0,
    rowsPerPage: 30,
    currentPageNumber: 1,
    searchData: "",
    searchLoader: false,
    activeheading: "",
    sortingType: "",
    columnSettingData: {},
    columnSettingDataOriginal: {},
    addUserDataForm: [],
    addUserDataFormMain: [],
    actionSuccessMessage: "",
    actionOnUserSuccess: false,

}

export const consoleReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {

        case actionTypes.GET_CONSOLE_USER_DATA:
            const consoleUserDataIntital = action.payload.data
            const consoleUserData = consoleUserDataIntital ? consoleUserDataIntital.result : []
            const consoleUserDataCopy = JSON.parse(JSON.stringify(consoleUserData))
            const totalUsers = consoleUserDataIntital ? consoleUserDataIntital.total_count : 0
            return {
                ...state,
                consoleUserData: consoleUserDataCopy,
                totalUsers,
                searchLoader: false
            }

        case actionTypes.COMMON_CONSOLE_ACTION:
            return {
                ...state,
                ...action.payload
            }

        case actionTypes.TABLE_COLUMN_SETTING_DATA:
            const intialcolumnSettingData = action.payload.data.result
            const columnSettingCategories = intialcolumnSettingData ? intialcolumnSettingData.categories : []
            const columnSettingFields = intialcolumnSettingData ? intialcolumnSettingData.fields : []
            const finalColumnSettingData = {
                columnSettingCategories,
                columnSettingFields
            }
            // console.log(finalColumnSettingData, "intialcolumnSettingData")
            const columnSettingData = {
                "basic fields": [
                    {
                        "_id": "name",
                        "lbl": "Name",
                        "type": "text",
                        "isDraggable": false
                    },
                    {
                        "_id": "email",
                        "lbl": "Email",
                        "type": "text",
                        "isDraggable": true
                    },
                    {
                        "_id": "departments",
                        "lbl": "Departments",
                        "type": "object",
                        "isDraggable": true
                    },
                    {
                        "_id": "employee_id",
                        "lbl": "Employee ID",
                        "type": "text",
                        "isDraggable": true
                    },
                    {
                        "_id": "manager",
                        "lbl": "Manager",
                        "type": "object",
                        "isDraggable": true
                    },
                    {
                        "_id": "designations",
                        "lbl": "Designations",
                        "type": "object",
                        "isDraggable": true
                    }
                ],

                "category": [
                    {
                        "_id": "location",
                        "lbl": "Location",
                        "type": "string",
                        "isDraggable": true
                    },
                    {
                        "_id": "mobile",
                        "lbl": "Mobile",
                        "type": "number",
                        "isDraggable": true
                    }
                ]
            }
            return {
                ...state,
                columnSettingDataOriginal: finalColumnSettingData,
                columnSettingData: JSON.parse(JSON.stringify(finalColumnSettingData)),
                // columnSettingCategories: intialcolumnSettingCategories,
                // columnSettingFields: intialcolumnSettingField
            }

        case actionTypes.ADD_USER_DATA_FORM:
            const addUserDataFormInitial = action.payload.data ? action.payload.data.result : []
            return {
                ...state,
                addUserDataFormMain: addUserDataFormInitial,
                addUserDataForm: JSON.parse(JSON.stringify(addUserDataFormInitial))
            }

        case actionTypes.POST_COMMON_ACTION_ON_USER:
            const actionOnUserDataInitial = action.payload.data.result
            return {
                ...state,
                actionOnUserSuccess: true,
                actionSuccessMessage: actionOnUserDataInitial.message || (actionOnUserDataInitial.deactivated ? `${actionOnUserDataInitial.deactivated} User(s) Succefully Deactivated` : "Not Deactivated")
            }

    }


    return { ...state }


}