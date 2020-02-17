import { combineReducers } from 'redux'
import { firstReducer } from './PeopleReducer/firstReducer'
import { teamViewReducer } from './PeopleReducer/teamViewReducer'
import { consoleReducer } from './PeopleReducer/consoleReducer'
import { departmentReducer } from './PeopleReducer/departmentReducer'
import { designationsReducer } from './PeopleReducer/designationsReducer'
import { userConsoleMainReducer } from './PeopleReducer/userConsoleMainReducer'
import { commonPeopleReducer } from './PeopleReducer/commonPeopleReducer'
import { addUsersFormReducer } from './PeopleReducer/addUsersFormReducer'
import { holidayReducer } from './PeopleReducer/holidayReducer'

const rootReducer = combineReducers({
    firstReducer,
    teamViewReducer,
    consoleReducer,
    departmentReducer,
    designationsReducer,
    userConsoleMainReducer,
    commonReducer: commonPeopleReducer,
    addUsersFormReducer,
    holidayReducer

});


export default rootReducer