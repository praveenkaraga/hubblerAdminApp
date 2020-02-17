import * as createUserAction from './createUserAction'
import * as activeLinkAction from './activeLinkAction'
import * as teamViewActions from './teamViewActions'
import * as consoleActions from './consoleActions'
import * as departmentActions from './departmentActions'
import * as designationsActions from './designationsAction'
import * as userConsoleMainActions from './userConsoleMainAction'
import * as commonActions from './commonPeopleActions'
import * as addUserFormActions from './addUsersFormAction'


import * as holidayActions from './holidayActions'
//------------------------------Create User Action---------------------------
export const { getUserData } = createUserAction


//-----------------------------xxxxxxxxxxxxxxxxx-----------------------------


//------------------------------Console Action-------------------------------//

export const {
    getConsoleUserData,
    commonConsoleAction,
    tableColumnSetting,
    addUserDataForm,
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
    teamViewUserClick,
    getClickedTeamUserData,
    getTeamViewOrgData,
    storeClickedUserId,
    changeLoaderStatus,
    getClickedTeamUserReporteeData,
    updateRollBackData,
    importUsersPopUPVisibility,
    onClickOfDownloadExcel,
    getImportUserUploadDetails,
    uploadImportUsersPopUPVisibility,
    patchImportUsersData,
    commonTeamReducerAction } = teamViewActions


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
    getParentNodeOptionsData,commonUserConsoleAction

} = userConsoleMainActions

//-----------------------------xxxxxxxxxxxxxxxxxxxxxxxxxx----------------------------//



//----------------------------Add User Form Actions---------------------------------//

export const { getAddUsersProfileData } = addUserFormActions

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


//------------------------------ Holiday Profile Actions -------------------------------//

export const { commonHolidayAction, getHolidayTableColumnData, getHolidayProfileData } = holidayActions;

//------------------------------xxxxxxxxxxxxxxxxxxx-------------------------------//
