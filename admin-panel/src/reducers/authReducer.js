import { authConstants } from "../actions/constant";

const initState = {
    loading: false,
    authenticated:false,
    user: {}
}

export default (state = initState, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                loading: true,
                authenticated:false
            }
        break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                loading: false,
                authenticated:true,
                user:action.payload
            }
        break;
        case authConstants.LOGIN_ERROR:
            state = {
                ...state,
                loading: false,
                authenticated:false
            }
        break;
        case authConstants.SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case authConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                loading: false
            }
        break;
        case authConstants.SIGNUP_ERROR:
            state = {
                ...state,
                loading: false
            }
        break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
        break;
        case authConstants.LOGOUT_ERROR:
            state = {
                ...state,
                loading: false
            }
        break;
    }
    return state;
}