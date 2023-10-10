import { materialConstants } from "./constant";
import { toast } from "react-hot-toast";
import axios from "axios";
import Swal from 'sweetalert2'

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
            } else {
                toast.error('Adding Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: materialConstants.ADDNEW_MATERIAL_ERROR })
            }

        } catch (error) {
            toast.error("Server Error..!", {
                id: "serverErr"
            })
            dispatch({
                type: materialConstants.ADDNEW_MATERIAL_ERROR
            })
        }
    }
}

export const getByID = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: materialConstants.GETALL_MATERIAL_REQUEST })
            const res = await axios.get(`http://localhost:8080/api/pdf/getById/${id}`)
            if (res.status === 200) {
                dispatch({
                    type: materialConstants.GET_BY_ID_SUCCESS,
                    payload: res.data
                })
            } else {
                toast.error('Retriving Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: materialConstants.GET_BY_ID_ERROR })
            }

        } catch (error) {
            toast.error("Error..!", {
                id: "serverErr"
            })
            dispatch({
                type: materialConstants.GET_BY_ID_ERROR
            })

        }
    }
}


export const updateMaterial = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: materialConstants.UPDATE_MATERIAL_REQUEST })
            const res = await axios.put('http://localhost:8080/api/pdf/update', data)
            if (res.status === 200) {
                dispatch({
                    type: materialConstants.UPDATE_MATERIAL_SUCCESS,
                    // payload: res.data
                })
                toast.success("Update Success..!", {
                    id: 'updt'
                })
            } else {
                toast.error('Update Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: materialConstants.UPDATE_MATERIAL_ERROR })
            }

        } catch (error) {
            toast.error("Somthing went wrong..!", {
                id: "serverErr"
            })
            dispatch({
                type: materialConstants.UPDATE_MATERIAL_ERROR
            })
        }
    }
}


export const DeleteMaterial = (id,language) => {
    return async (dispatch) => {
        try {
            dispatch({ type: materialConstants.DELETE_MATERIAL_REQUEST })
            const res = await axios.delete(`http://localhost:8080/api/pdf/delete/${id}/${language}`)
            console.log(res)
            if (res.status === 200) {
                dispatch({
                    type: materialConstants.DELETE_MATERIAL_SUCCESS,
                    payload: res.data
                })
                Swal.fire(
                    'Deleted!',
                    'Your entry has been deleted.',
                    'success'
                )
            } else {
                toast.error('Delete Failed..!', {
                    id: 'failed'
                })
                dispatch({ type: materialConstants.DELETE_MATERIAL_ERROR })
            }

        } catch (error) {
            toast.error("Somthing went wrong..!", {
                id: "serverErr"
            })
            dispatch({
                type: materialConstants.DELETE_MATERIAL_ERROR
            })
        }
    }
}