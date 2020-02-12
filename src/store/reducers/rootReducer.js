import { combineReducers } from 'redux'
import { firstReducer } from './firstReducer'
import { teamViewReducer } from './teamViewReducer'
import { consoleReducer } from './consoleReducer'
import { departmentReducer } from './departmentReducer'
import { designationsReducer } from './designationsReducer'
import { userConsoleMainReducer } from './userConsoleMainReducer'
import { commonReducer } from './commonReducer'
import { addUsersFormReducer } from './addUsersFormReducer'
import { holidayReducer } from './holidayReducer'

const rootReducer = combineReducers({
    firstReducer,
    teamViewReducer,
    consoleReducer,
    departmentReducer,
    designationsReducer,
    userConsoleMainReducer,
    commonReducer,
    addUsersFormReducer,
    holidayReducer

});


export default rootReducer