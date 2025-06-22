import {useAuth} from "../store/auth"
import axios from "./axios"
import jwtDecode from "jwt-decode"
import Cookie from "js-cookie"
import Swal from "sweetalert2"

export default async function login(email, password) {
    try {
        const {data, status} = await axios.post(`user/token/`, {
            email,
            password,
        });
        if (status===200){
            setAuthUser(data.access, data.refresh)
            alert("Login Successfull")
        }
        return {data, error:null}
    }
    catch (error){
        console.error("Login failed: ", error)
    }
}