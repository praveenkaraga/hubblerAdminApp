import {checkError} from "../../utils/helper";
import * as actionTypes from "../actionTypes";
import filter from 'lodash/filter'
import map from 'lodash/map'

const initialState = {
    count: 1,
    departmentColumnData: [],
    departmentsData: [],
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
            const d = map(departmentsDataCopy,ele => ({...ele, departments : ele.name , people: ele.count}))
            const totalUsers = departmentsDataDataInitial ? departmentsDataDataInitial.total_count : 0
            return {
                ...state,
                departmentsData: d,
                totalUsers,
            };

        /*return {
            ...state,
            count: 2
        }*/
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
    }

    return {...state}
}