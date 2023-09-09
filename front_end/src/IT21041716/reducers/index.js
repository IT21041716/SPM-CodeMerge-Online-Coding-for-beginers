import { combineReducers } from 'redux'
import languageReducer from './languageReducer'
import materialReducer from './materialReducer'

const rootReducer = combineReducers({
    language: languageReducer,
    material:materialReducer
})



export default rootReducer