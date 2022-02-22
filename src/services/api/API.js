import React from 'react';

const url_main = "http://localhost:46824/api/";
const headers_main = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    "withCredentials": "include"
}


export default class API {

    static GET = (url) => {
        return fetch(
            url_main + url,
            {
                method: "GET",
                mode: "cors",
                headers: headers_main,
                credentials: 'include',
                xhrFields: {
                    "withCredentials": 'true',
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    static POST = async (url, data) => {
        return fetch(
            url_main + url,
            {
                method: "POST",
                mode: "cors",
                headers: headers_main,
                credentials: 'include',
                xhrFields: {
                    "withCredentials": true,
                },
                body: JSON.stringify(data)
            })
            .catch(error => {
                console.log(error);
            })

    }
    static PUT = (url, data) => {
        return fetch(
            url_main + url,
            {
                method: "PUT",
                mode: "cors",
                headers: headers_main,
                credentials: 'include',
                xhrFields: {
                    "withCredentials": true,
                },
                body: JSON.stringify(data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    static DELETE = (url) => {
        return fetch(
            url_main + url,
            {
                method: "DELETE",
                mode: "cors",
                headers: headers_main,
                credentials: 'include',
                xhrFields: {
                    "withCredentials": true,
                },
            })
            .catch(error => {
                console.log(error);
            })
    }
}
