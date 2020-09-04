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

    addAutorization(type, token) {
        this.data.headers = {
            ...this.data.headers,
            'Authorization': `${type} ${token}`,
        };
        return this;
    }

    addBody(data) {
        this.data.body = JSON.stringify(data);

        return this;
    }

    async request() {
        try {
            const response = await fetch(this.url, {
                ...this.data,
            });
            return await response.json();
        } catch (e) {
            console.log(e);
        }

    }
}