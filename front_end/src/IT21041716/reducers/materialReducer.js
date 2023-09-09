import { materialConstants } from "../actions/constant";

const initState = {
    loading: false,
    allMaterial: []
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
    }
    return state
}