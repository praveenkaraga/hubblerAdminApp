import * as actionTypes from '../../actionTypes'
import { getDesignationsData } from '../../../utils/Apis/peopleApi'

export const designationsData = (perPageRows, currentPage, searchData, headingData, sortingType) => {
    const payload = getDesignationsData(perPageRows, currentPage, searchData, headingData, sortingType)
    return {
        type: actionTypes.GET_DESIGNATIONS_DATA,
        payload
    }

}

export const commonDesignationAction = (payload) => {
    return {
        type: actionTypes.COMMON_DESIGNATION_ACTION,
        payload
    }
}