import * as createUserAction from './createUserAction'
import * as activeLinkAction from './activeLinkAction'
import * as teamViewActions from './teamViewActions'
import * as consoleActions from './consoleActions'


//------------------------------Create User Action---------------------------
export const { getUserData } = createUserAction


//-----------------------------xxxxxxxxxxxxxxxxx-----------------------------


//------------------------------Console Action-------------------------------//

export const { getTableColumnData, getConsoleUserData, commonConsoleAction, tableColumnSetting } = consoleActions

//------------------------------xxxxxxxxxxxxxx-------------------------------//


//-----------------       -------------------------

export const { createActiveLink, hamburgerIconClick } = activeLinkAction
//-------------------xxxxxxxxxxxxxxxxxxxxxxx------------


//-----------------------------Team View Chart Users---------------------------
export const { getTeamViewUsersData, teamViewUserClick, getClickedTeamUserData, getTeamViewOrgData, storeClickedUserId, changeLoaderStatus, getClickedTeamUserReporteeData, updateRollBackData, importUsersPopUPVisibility, onClickOfDownloadExcel, getImportUserUploadDetails } = teamViewActions


//------------------------------xxxxxxxxxxxxxxxxx--------------------------------
