import { checkError } from '../../../utils/helper'
import * as actionTypes from '../../actionTypes'

const intialState = {
    designationData: [],
    designationDataOriginal: [],
    totalDesignationsCount: 0,
    currentPageNumber: 1,
    tableLoading: true
}

export const designationsReducer = (state = intialState, action) => {
    const { errorData, isError } = checkError(state, action);
    if (isError) {
        return { ...errorData }
    }

    switch (action.type) {
    case actionTypes.GET_DESIGNATIONS_DATA:
        const designationDataIntial = action.payload.data ? action.payload.data.result : []
        const totalDesignationsCount = action.payload.data ? action.payload.data.total_count : 0
        designationDataIntial.forEach(data => {
            data["designations"] = data.name
            data["people"] = data.count
        });

        return {
            ...state,
            designationDataOriginal: JSON.parse(JSON.stringify(designationDataIntial)),
            designationData: JSON.parse(JSON.stringify(designationDataIntial)),
            totalDesignationsCount,
            tableLoading: false
        }


    case actionTypes.COMMON_DESIGNATION_ACTION:
        return {
            ...state,
            ...action.payload
        }

    default:    
        return { ...state }
    }


    

}