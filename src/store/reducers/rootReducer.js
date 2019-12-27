import { combineReducers } from 'redux'
import { firstReducer } from './firstReducer'
import { teamViewReducer } from './teamViewReducer'
import { consoleReducer } from './consoleReducer'
import { departmentReducer } from './departmentReducer'
import { designationsReducer } from './designationsReducer'

const rootReducer = combineReducers({
    firstReducer,
    teamViewReducer,
    consoleReducer,
    departmentReducer,
    designationsReducer
});


export default rootReducer