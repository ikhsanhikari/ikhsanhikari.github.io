class Core{
    async  postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    }

    async  patchData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    }

    async  deleteData(url = '') {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async getDataById(url=''){
        const response = await fetch(url);
        return response;
    }

    async fetchData(url=''){
        const response = await fetch(url);
        return response;
    }
}