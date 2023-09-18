import { languageConstants } from './constant'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import axios from 'axios'

export const AddLanguage = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: languageConstants.ADDNEW_LANGUAGE_REQUEST })
            const res = await axios.post('http://localhost:8080/api/languages/insert', data)
            if (res.status === 200) {
                toast.success("New Language Added..!", {
                    id: 'added'
                })
                dispatch({ type: languageConstants.ADDNEW_LANGUAGE_SUCCESS })
            } else {
                toast.error('Adding Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: languageConstants.ADDNEW_LANGUAGE_ERROR })
            }
        } catch (error) {
                toast.error("Server Error..!", {
                    id: "serverErr"
                })
                dispatch({
                    type: languageConstants.ADDNEW_LANGUAGE_ERROR
                })
        }
    }
}

export const getAll = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: languageConstants.GETALL_LANGUAGE_REQUEST })
            const res = await axios.get('http://localhost:8080/api/languages/getAll')
            if (res.status === 200) {
                dispatch({ 
                    type: languageConstants.GETALL_LANGUAGE_SUCCESS,
                    payload:res.data 
                })
            } else {
                toast.error('Retriving Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: languageConstants.GETALL_LANGUAGE_ERROR })
            }
        } catch (error) {
                toast.error("Server Error..!", {
                    id: "serverErr"
                })
                dispatch({
                    type: languageConstants.ADDNEW_LANGUAGE_ERROR
                })
        }
    }
}
export const getById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: languageConstants.GET_BY_ID_LANGUAGE_REQUEST })
            const res = await axios.get(`http://localhost:8080/api/languages/getById/${id}`)
            if (res.status === 200) {
                dispatch({ 
                    type: languageConstants.GET_BY_ID_LANGUAGE_SUCCESS,
                    payload:res.data 
                })
            } else {
                toast.error('Somthing went wrong..!', {
                    id: 'failed'
                })
                dispatch({ type: languageConstants.GET_BY_ID_LANGUAGE_ERROR })
            }
        } catch (error) {
                toast.error("Somthing went wrong..!", {
                    id: "serverErr"
                })
                dispatch({
                    type: languageConstants.GET_BY_ID_LANGUAGE_ERROR
                })
        }
    }
}