import { materialConstants } from "../actions/constant";

const initState = {
    loading: false,
    allMaterial: [],
    oneData: {}
}

export default (state = initState, action) => {
    switch (action.type) {
        case materialConstants.GETALL_MATERIAL_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case materialConstants.GETALL_MATERIAL_SUCCESS:
            state = {
                ...state,
                loading: false,
                allMaterial:action.payload
            }
        break;
        case materialConstants.GETALL_MATERIAL_ERROR:
            state = {
                ...state,
                loading: false
            }
        break;
        case materialConstants.ADDNEW_MATERIAL_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case materialConstants.ADDNEW_MATERIAL_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
        break;
        case materialConstants.ADDNEW_MATERIAL_ERROR:
            state = {
                ...state,
                loading: false
            }
        break;
        case materialConstants.GET_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
        break;
        case materialConstants.GET_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
                oneData: action.payload

            }
        break;
        case materialConstants.GET_BY_ID_ERROR:
            state = {
                ...state,
                loading: false
            }
        break;
    }
    return state
}