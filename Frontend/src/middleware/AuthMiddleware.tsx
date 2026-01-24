import { useEffect, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../Redux/store";
import axios from "axios";
import { positive } from "../Redux/LoginUser";

interface Prop {
    children: JSX.Element
}

export function PrivateRoute({ children }: Prop) {

    const userLogin = useSelector((state: RootState) => state.LoginUser.value)
    const dispatch = useDispatch()
    const apiUrl = import.meta.env.VITE_API_URL;
     useEffect(() => {
        if (!userLogin) {
            axios
                .get(`${apiUrl}/api/v1/auth/tokencheck`, { withCredentials: true })
                .then(res => {
                    if (res.data?.data?.success === true) {
                        dispatch(positive());
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userLogin, dispatch, apiUrl]);

    return userLogin ? children : <Navigate to="/login" replace />
}



export function PublicRoute({ children }: Prop) {
    
    const userLogin = useSelector((state: RootState) => state.LoginUser.value)
    const dispatch = useDispatch()
    const apiUrl = import.meta.env.VITE_API_URL;
     useEffect(() => {
        if (!userLogin) {
            axios
                .get(`${apiUrl}/api/v1/auth/tokencheck`, { withCredentials: true })
                .then(res => {
                    if (res.data?.data?.success === true) {
                        dispatch(positive());
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userLogin, dispatch, apiUrl]);

    return userLogin ? <Navigate to="/home" /> : children
}

