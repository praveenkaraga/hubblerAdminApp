import { combineReducers } from 'redux'
import { firstReducer } from './firstReducer'
import { teamViewReducer } from './teamViewReducer'
import { consoleReducer } from './consoleReducer'

const rootReducer = combineReducers({
    firstReducer,
    teamViewReducer,
    consoleReducer
});


export default rootReducer