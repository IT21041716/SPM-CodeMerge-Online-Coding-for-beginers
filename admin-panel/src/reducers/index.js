import { combineReducers } from 'redux'
import languageReducer from './languageReducer'
import materialReducer from './materialReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    language: languageReducer,
    material: materialReducer,
    auth: authReducer
})



export default rootReducer