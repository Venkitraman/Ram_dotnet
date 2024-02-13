import axios, { AxiosResponse } from "axios";
import { Activity } from "../Models/activity";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL='http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

// <T> is a generic type parameter that allows these functions to work with any type of data

const responseBody = <T> (response: AxiosResponse<T>) => response.data; //Define a utility function responseBody that extracts the data from AxiosResponse.

//Define an object requests which contains functions for making different types of HTTP requests (GET, POST, PUT, DELETE).
// Each function uses Axios to make the request and extracts the data from the response using the responseBody function.
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

//instead of creating separate objects for end point url,defining methods inside one object and reusing it.
// 
//Create an object that stores our request
const Activities ={
    list:() => requests.get<Activity[]>('/activities'),
    details:(id: string) => requests.get<Activity>(`activities/${id}`),
    create:(activity: Activity) => requests.post<void>(`/activities`,activity),
    update:(activity: Activity) => axios.put<void>(`/activities/${activity.id}`,activity),
    delete:(id:string) => axios.delete<void>(`/activities/${id}`)
}

const agent ={
    Activities
}

export default agent;   