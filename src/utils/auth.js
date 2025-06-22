import {useAuth} from "../store/auth"
import axios from "./axios"
import jwtDecode from "jwt-decode"
import Cookie from "js-cookie"
import Swal from "sweetalert2"

function isAccessTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 < Date.now();
  } catch (e) {
    return true
  }
}

function setAuthUser(accessToken, refreshToken, setUser) {
  Cookie.set("access_token", accessToken);
  Cookie.set("refresh_token", refreshToken);

  const user = jwtDecode(accessToken);
  setUser(user)
}

async function getRefreshedToken(refreshToken) {
  try {
    const { data } = await axios.post("user/token/refresh/", {
      refresh: refreshToken,
    });
    return data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

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

export default function logout(){
    Cookie.remove("access_token")
    Cookie.remove("refresh_token")
    useAuth.getState().setUser(null)
    alert("You have benn logged out")
}

export async function initializeUser(setUser) {
  const accessToken = Cookie.get("access_token");
  const refreshToken = Cookie.get("refresh_token");

  if (!accessToken || !refreshToken) {
    Swal.fire("Tokens do not exist", "", "warning");
    return;
  }

  if (isAccessTokenExpired(accessToken)) {
    const response = await getRefreshedToken(refreshToken);
    if (response) {
      setAuthUser(response.access, response.refresh, setUser);
    }
  } else {
    setAuthUser(accessToken, refreshToken, setUser);
  }
}