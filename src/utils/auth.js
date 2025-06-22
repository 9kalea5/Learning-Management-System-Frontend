import {useAuth} from "../store/auth"
import axios from "./axios"
import jwtDecode from "jwt-decode"
import Cookie from "js-cookie"
import Swal from "sweetalert2"

export default async function login(email, password){
    try {
        const {data, status} = await axios.post(`user/token/`, {
            email,
            password,
        })
        if (status===200){
            setAuthUser(data.access, data.refresh)
            alert("Login Successfull")
        }
        return {data, error:null}
    }
    catch (error){
        console.error("Login failed: ", error)
        return {
            data: null,
            error: error.response.data?.detail || "Something Went Wrong"
        }
    }
}

export default async function register(full_name, email, password, password2){
    try {
        const {data} = await axios.post(`user/register`, {
            full_name,
            email,
            password,
            password2,
        })
        await login(email, password)
        alert("Registration Successfull")
        return {data, error:null}
    }
    catch (error){
        console.error("Registration failed: ", error)
        return {
            data: null,
            error: error.response.data?.detail || "Something Went Wrong"
        }
    }
}