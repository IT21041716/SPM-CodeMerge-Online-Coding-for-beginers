import {languageConstants} from './constant'
import {toast} from 'react-hot-toast'
import Swal from 'sweetalert2'
import {axios} from 'axios'

export const AddLanguage = (data) => {
    return async(dispatch) => {
        try {
            dispatch({type:languageConstants.ADDNEW_LANGUAGE_REQUEST})
            const res = await axios.post('http://localhost:8080/api/languages/insert',data)
            console.log(res);
        } catch (error) {
            
        }
    }
}