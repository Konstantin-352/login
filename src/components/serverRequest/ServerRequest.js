// import React from 'react';
// export default async function serverRequest(url ='', method='', data = {}, token = '') {
//
//
//
// }

export default class ServerRequest {
    constructor(url) {
        this.url = url;
        this.data = {
            headers: {'Content-Type': 'application/json',}
        };
    }

    addMethod(method) {
        this.data.method = method;
        return this;
    }

    addAutorization(token) {
        this.data.headers = {
            ...this.data.headers,
            'Authorization': `Bearer ${token}`,
        };
        return this;
    }

    addBody(data) {
        this.data.body = JSON.stringify(data);
        return this;
    }

    async request() {
        const response = await fetch(this.url, {
            ...this.data,
        });
        return await response.json();
    }
}