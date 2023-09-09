import { languageConstants } from './constant'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import axios from 'axios'

export const AddLanguage = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: languageConstants.ADDNEW_LANGUAGE_REQUEST })
            const res = await axios.post('http://localhost:8080/api/languages/insert', data)
            console.log(res.status)
            if (res.status === 200) {
                toast.success("New Language Added..!", {
                    id: 'added'
                })
                dispatch({ type: languageConstants.ADDNEW_LANGUAGE_SUCCESS })
            } else if (res.status === 400) {
                toast.error('Adding Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: languageConstants.ADDNEW_LANGUAGE_ERROR })
            }
        } catch (error) {
            if (res.status === 500) {
                toast.error("Server Error..!", {
                    id: "serverErr"
                })
                dispatch({
                    type: languageConstants.ADDNEW_LANGUAGE_ERROR
                })
            }
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
            } else if (res.status === 400) {
                toast.error('Retriving Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: languageConstants.GETALL_LANGUAGE_ERROR })
            }
        } catch (error) {
            if (res.status === 500) {
                toast.error("Server Error..!", {
                    id: "serverErr"
                })
                dispatch({
                    type: languageConstants.ADDNEW_LANGUAGE_ERROR
                })
            }
        }
    }
}