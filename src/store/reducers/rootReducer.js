import { combineReducers } from 'redux'
import { firstReducer } from './PeopleReducer/firstReducer'
import { teamViewReducer } from './PeopleReducer/teamViewReducer'
import { consoleReducer } from './PeopleReducer/consoleReducer'
import { departmentReducer } from './PeopleReducer/departmentReducer'
import { designationsReducer } from './PeopleReducer/designationsReducer'
import { userConsoleMainReducer } from './PeopleReducer/userConsoleMainReducer'
import { commonPeopleReducer } from './PeopleReducer/commonPeopleReducer'
import { consoleAddUserReducer } from './PeopleReducer/consoleAddUserReducer'

import { holidayReducer } from './ProfileReducer/holidayReducer'
import { commonProfileReducer } from './ProfileReducer/commonProfileReducer'

const rootReducer = combineReducers({
    firstReducer,
    teamViewReducer,
    consoleReducer,
    departmentReducer,
    designationsReducer,
    userConsoleMainReducer,
    commonReducer: commonPeopleReducer,
    consoleAddUserReducer,

    holidayReducer,
    commonProfileReducer

});


export default rootReducer