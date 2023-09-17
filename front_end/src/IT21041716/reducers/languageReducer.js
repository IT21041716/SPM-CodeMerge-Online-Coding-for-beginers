import { languageConstants } from "../actions/constant";

const initState = {
    loading: false,
    allLanguages: [],
    oneData : {}
}

export default (state = initState, action) => {
    switch (action.type) {
        case languageConstants.ADDNEW_LANGUAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case languageConstants.ADDNEW_LANGUAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
        break;
        case languageConstants.ADDNEW_LANGUAGE_ERROR:
            state = {
                ...state,
                loading: false
            }
        break;
        case languageConstants.GETALL_LANGUAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case languageConstants.GETALL_LANGUAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
                allLanguages: action.payload
            }
        break;
        case languageConstants.GETALL_LANGUAGE_ERROR:
            state = {
                ...state,
                loading: false, 
            }
        break;
        case languageConstants.DELETE_LANGUAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case languageConstants.DELETE_LANGUAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
                allLanguages:action.payload
            }
        break;
        case languageConstants.DELETE_LANGUAGE_ERROR:
            state = {
                ...state,
                loading: false
            }
        break;
        case languageConstants.GET_BY_ID_LANGUAGE_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case languageConstants.GET_BY_ID_LANGUAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
                oneData:action.payload
            }
        break;
        case languageConstants.GET_BY_ID_LANGUAGE_ERROR:
            state = {
                ...state,
                loading: false
            }
        break;
    }
    return state
}