import { materialConstants } from "./constant";
import { toast } from "react-hot-toast";
import axios from "axios";

export const getAllMaterial = (language) => {
    return async (dispatch) => {
        try {
            dispatch({ type: materialConstants.GETALL_MATERIAL_REQUEST })
            const res = await axios.get(`http://localhost:8080/api/pdf/getByLanguage/${language}`)
            if (res.status === 200) {
                dispatch({
                    type: materialConstants.GETALL_MATERIAL_SUCCESS,
                    payload: res.data
                })
            } else if (res.status === 400) {
                toast.error('Retriving Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: materialConstants.GETALL_MATERIAL_ERROR })
            }

        } catch (error) {
            if (res.status === 500) {
                toast.error("Server Error..!", {
                    id: "serverErr"
                })
                dispatch({
                    type: materialConstants.GETALL_MATERIAL_ERROR
                })
            }
        }
    }
}

export const AddNew = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: materialConstants.ADDNEW_MATERIAL_REQUEST })
            const res = await axios.post('http://localhost:8080/api/pdf/insert', data)
            console.log(res)
            if (res.status === 200) {
                toast.success("New Material Added..!", {
                    id: 'added'
                })
                dispatch({
                    type: materialConstants.ADDNEW_MATERIAL_SUCCESS,
                })
            } else if (res.status === 400) {
                toast.error('Adding Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: materialConstants.ADDNEW_MATERIAL_ERROR })
            }

        } catch (error) {
            if (res.status === 500) {
                toast.error("Server Error..!", {
                    id: "serverErr"
                })
                dispatch({
                    type: materialConstants.ADDNEW_MATERIAL_ERROR
                })
            }
        }
    }
}