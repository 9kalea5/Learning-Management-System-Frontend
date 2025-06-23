import axios from 'axios'
import {getRefreshToken, isAccessTokenExpired, setAuthUser} from './auth'
import Cookies from 'js-cookie'

export default function useAxios(){
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {Authorization: `Bearer ${accessToken}`}
    })
    axiosInstance.interceptors.request.use(async(req)=>{
        if (!isAccessTokenExpired()){
            return req
        }
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
        req.headers.Authorization = `Bearer ${response.data?.access}`
        return req
    })
    return axiosInstance
}