import * as createUserAction from './createUserAction'
import * as activeLinkAction from './activeLinkAction'
import * as teamViewActions from './teamViewActions'
import * as consoleActions from './consoleActions'
import * as departmentActions from './departmentActions'
import * as designationsActions from './designationsAction'

//------------------------------Create User Action---------------------------
export const { getUserData } = createUserAction


//-----------------------------xxxxxxxxxxxxxxxxx-----------------------------


//------------------------------Console Action-------------------------------//

export const { getTableColumnData, getConsoleUserData, commonConsoleAction, tableColumnSetting, addUserDataForm } = consoleActions

//------------------------------xxxxxxxxxxxxxx-------------------------------//


//-----------------       -------------------------

export const { createActiveLink, hamburgerIconClick } = activeLinkAction
//-------------------xxxxxxxxxxxxxxxxxxxxxxx------------


//-----------------------------Team View Chart Users---------------------------
export const { getTeamViewUsersData, teamViewUserClick, getClickedTeamUserData, getTeamViewOrgData, storeClickedUserId, changeLoaderStatus, getClickedTeamUserReporteeData, updateRollBackData, importUsersPopUPVisibility, onClickOfDownloadExcel, getImportUserUploadDetails, uploadImportUsersPopUPVisibility, patchImportUsersData, commonTeamReducerAction } = teamViewActions


//------------------------------xxxxxxxxxxxxxxxxx--------------------------------


//------------------------------ Department Action -------------------------------//

export const { getDepartmentData, commonDepartmentAction, getDeptTableColumnData, postCreateDeptData, postAddSelectedUsers ,getAddSelectedUsersPostedData,getAddableUsersData,getTableColumnsData} = departmentActions

//------------------------------xxxxxxxxxxxxxx-------------------------------//








//------------------------------ Designations Action -------------------------------//

export const { designationsData, commonDesignationAction } = designationsActions

//------------------------------xxxxxxxxxxxxxx-------------------------------//

