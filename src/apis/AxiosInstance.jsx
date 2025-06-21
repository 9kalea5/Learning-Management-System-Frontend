import axios from 'axios'
import axio from 'axios'

const baseurl = 'http://127.0.0.1:8000/'

export default function AxiosInstance(){
    return axios.create({
        baseURL: baseurl,
        timeout: 5000,
        headers:{
            "Content-Type":"application/json",
            accept: "application/json"
        }
    })
}