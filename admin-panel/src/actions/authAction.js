import { authConstants } from "../actions/constant";
import { toast } from 'react-hot-toast'
import axios from 'axios'


export const Login = (data) => {
    return async (dispatch) => {
        try {

            dispatch({ type: authConstants.LOGIN_REQUEST })
            const res = await axios.post('http://localhost:8080/api/admin/login', data)
            if (res.status === 200) {

                const user = res.data;
                const currentTime = new Date().getTime();
                const sessionTimeout = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
                const expiryTime = currentTime + sessionTimeout;

                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("expiryTime", expiryTime);
                toast.success(`Loging success, welcome ${user.name}`, {
                    id: 'login'
                })

                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        user
                    }
                })
            } else {
                toast.error('Login Failed..!', {
                    id: 'faild'
                })
                dispatch({ type: authConstants.LOGIN_ERROR })
            }


        } catch (error) {
            toast.error("somthing went wrong.!")
            dispatch({ type: authConstants.LOGIN_ERROR })
        }
    }
}

export const Signup = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.SIGNUP_REQUEST })
            const res = await axios.post('http://localhost:8080/api/admin/signup', data)
            if (res.status === 201) {
                dispatch({
                    type: authConstants.SIGNUP_SUCCESS,
                    payload: res.data.payload
                })

                toast.success("Registration successfull..!");
                window.location.href = '/login';
            }else if(res.status === 400){
                dispatch({
                    type:authConstants.SIGNUP_ERROR
                })
                toast.error("User already exist..!");
            }
        } catch (error) {
            toast.error("somthing went wrong..!");
            dispatch({ type: authConstants.SIGNUP_ERROR })
        }
    }
}

export const isLoggedIn = () => {
    return async (dispatch) => {
        const storedUser = localStorage.getItem("user");
        const storedTime = localStorage.getItem("expiryTime");

        if (storedUser && storedTime) {
            const user = JSON.parse(storedUser);
            const currentTime = new Date().getTime();
            const expiryTime = parseInt(storedTime, 10);

            if (currentTime < expiryTime) {
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: user,
                });
            } else {
                dispatch({
                    type: authConstants.LOGIN_ERROR,
                });
            }
        } else {
            dispatch({
                type: authConstants.LOGIN_ERROR,
            });
        }
    };
}


export const signout = () => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        localStorage.removeItem("user");
        localStorage.removeItem("expiryTime");
        toast.success("Logout successfull..!", {
            id: "logout"
        })
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        })


    }
}