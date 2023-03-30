import axios from 'axios';
import { API_NOTIFICATION_MESSAGES } from '../constants/config';
import { SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    hreaders: {
        'content-type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    // stop global loader here
    function (response) {
        return processResponse(response);
    }, function (error) {
        return Promise.reject(processError(error));
    }
)

//////////////////
//if success -> return{isSuccess:true,data:Object}
//if failure -> return{isFailure:true,status:strinmg,msg:string,code:int}
//////////////////
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }

    }
}

//////////////////
//if success -> return{isSuccess:true,data:Object}
//if failure -> return{isFailure:true,status:strinmg,msg:string,code:int}
//////////////////
const processError = (error) => {
    if (error.response) {
        //req made and server responded with status other
        //that falls out the range 2.x.x
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }

    }
    else if (error.request) {
        //req made but no response was recieved
        console.log("ERROR IN REQUEST: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailue,
            code: ""
        }
    } else {
        //something happened in the setting up the request that triggers an error
        console.log("ERROR IN NETWORK: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.resoponseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
}

export { API };