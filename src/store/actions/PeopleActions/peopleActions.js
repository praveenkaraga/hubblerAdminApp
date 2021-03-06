import * as createUserAction from './createUserAction'
import * as activeLinkAction from './activeLinkAction'
import * as teamViewActions from './teamViewActions'
import * as consoleActions from './consoleActions'
import * as departmentActions from './departmentActions'
import * as designationsActions from './designationsAction'
import * as userConsoleMainActions from './userConsoleMainAction'
import * as commonActions from './commonPeopleActions'
import * as addUserFormActions from './addUsersFormAction'


//------------------------------Create User Action---------------------------
export const { getUserData } = createUserAction


//-----------------------------xxxxxxxxxxxxxxxxx-----------------------------


//------------------------------Console Action-------------------------------//

export const {
    getConsoleUserData,
    commonConsoleAction,
    tableColumnSetting,
    postCommonActionOnUser,
    patchTableColumnSetting
} = consoleActions

//------------------------------xxxxxxxxxxxxxx-------------------------------//


//-----------------       -------------------------

export const { createActiveLink,
    hamburgerIconClick } = activeLinkAction
//-------------------xxxxxxxxxxxxxxxxxxxxxxx------------


//-----------------------------Team View Chart Users---------------------------
export const { getTeamViewUsersData,
    getClickedTeamUserData,
    getTeamViewOrgData,
    getClickedTeamUserReporteeData,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    uploadImportUsersPopUPVisibility,
    patchImportUsersData,
    commonTeamReducerAction,searchDropDownData,getAllUsers } = teamViewActions


//------------------------------xxxxxxxxxxxxxxxxx--------------------------------


//------------------------------ Department Action -------------------------------//

export const { getDepartmentData,
    commonDepartmentAction,
    getDeptTableColumnData,
    postCreateDeptData,
    getAddableUsersData,
    getDepartmentSuggestionData,
    editUserDataForm } = departmentActions

//------------------------------xxxxxxxxxxxxxx-------------------------------//


//------------------------------ Designations Action -------------------------------//

export const { designationsData,
    commonDesignationAction } = designationsActions

//------------------------------xxxxxxxxxxxxxxxxxxx-------------------------------//


//----------------------------- User Console Main Action ----------------------------//

export const { getCirclesData,
    getCustomFields,
    getCircleSuggestionData,
    getParentNodeOptionsData, commonUserConsoleAction

} = userConsoleMainActions

//-----------------------------xxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------//



//----------------------------Add User Form Actions---------------------------------//

export const { addUserDataForm, getAddUsersProfileData } = addUserFormActions

//----------------------------End of Add User Form Actions---------------------------------//


//--------------------------------- Common Actions ----------------------------------
export const { getSingleViewData,
    getSingleViewSuggestionData,
    postCommonCreateData,
    commonActionForCommonReducer,
    patchCommonCreateData,
    getLoginSessionData,
    getSingleFieldData,
    postCommonAddSelectedUsersData,
    postCommonRemovePeople,
    postCommonDelete } = commonActions

//------------------------------ xxxxxxxxxxxxxxxxxxxxxxx-----------------------------


