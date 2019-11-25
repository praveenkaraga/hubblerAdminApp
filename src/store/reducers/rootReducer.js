import { combineReducers } from 'redux'
import { firstReducer } from './firstReducer'
import { teamViewReducer } from './teamViewReducer'

const rootReducer = combineReducers({
    firstReducer,
    teamViewReducer
});


export default rootReducer