import {combineReducers} from 'redux'
import {firstReducer} from './firstReducer'
import {teamViewReducer} from './teamViewReducer'
import {consoleReducer} from './consoleReducer'
import {departmentReducer} from './departmentReducer'

const rootReducer = combineReducers({
    firstReducer,
    teamViewReducer,
    consoleReducer, departmentReducer
});


export default rootReducer