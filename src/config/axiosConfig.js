import Axios from "axios"
import { configure } from 'axios-hooks'
const axios = Axios.create({
    baseURL: 'https://api-graph.tests.grupoapok.com',
    withCredentials: false
})


axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = {
        Accept: 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

export const setupInterceptors = (history) => {
    axios.interceptors.response.use(res => {
        // success
        return res
    }, error => {
        // const { status } = err.response
        if (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    console.log(error.response.message);
                }
            }
        }

        return Promise.reject(error)
    })
}

const defaultOptions = {
    useCache: false
}

configure({ axios, defaultOptions })

export default axios