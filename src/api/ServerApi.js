class ServerApi {

    static API_URL = "https://localhost:5001/";
    
    static requestUserById (akey, id) {
        return fetch(ServerApi.API_URL + "Payment/" + akey + "/id/" + id )
            .then(res => res.json())
            .then(
            (result) => {
                let rt = null;
                if(result.status !== 403) {
                    rt = result;
                }
                return rt;
            },
            (error) => {
                // Nothing yet...
            }
        );
    };

    static requestPaymentsTableByUser (akey, user) {
        return fetch(ServerApi.API_URL + "Payment/" + akey + "/name/" + user )
            .then(res => res.json())
            .then(
            (result) => {
                if(result.status !== 403) {
                    return result;
                }
                else {
                    return null;
                }
            },
            (error) => {
                // Nothing yet...
            }
            );
    };

    static requestPaymentTable(akey, npage, pgn) {
        return fetch(ServerApi.API_URL + "Payment/" + akey + "/show/" + npage + "/page/" + pgn.toString())
            .then(res => res.json())
            .then(
            (result) => {                
                if(result.status !== 403) {
                    return result;
                }
                else {
                    return null;
                }
            },
            (error) => {
                // Nothing yet...
            }
            );
    };

    static requestServers(akey) {
        return fetch(ServerApi.API_URL + "Servers/" + akey + "/list")
            .then(res => res.json())
            .then(
            (result) => {
                let rt = null;
                if(result.status !== 403) {
                    rt = result;
                }
                return rt;
            },
            (error) => {
                // Nothing yet...
            }
        );
    };

    static requestServerById(akey, id) {
        return fetch(ServerApi.API_URL + "Servers/" + akey + "/id/" + id)
            .then(res => res.json())
            .then(
            (result) => {
                let rt = null;
                if(result.status !== 403) {
                    rt = result;
                }
                return rt;
            },
            (error) => {
                // Nothing yet...
            }
        );
    };

    static requestProductsByServerId(akey, id) {
        return fetch(ServerApi.API_URL + "Products/" + akey + "/server/" + id)
            .then(res => res.json())
            .then(
            (result) => {
                let rt = null;
                if(result.status !== 403) {
                    rt = result;
                }
                return rt;
            },
            (error) => {
                // Nothing yet...
            }
        );
    };

    static createServer(akey, srv) {
        return fetch(ServerApi.API_URL + "Servers/" + akey + "/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(srv)
        })
            .then(res => res.json())
            .then(
            (result) => {
                let rt = null;
                if(result.status !== 403) {
                    rt = result;
                }
                return rt;
            },
            (error) => {
                // Nothing yet...
            }
        );
    }

    static updateServerById(akey, updates) {
        return fetch(ServerApi.API_URL + "Servers/" + akey + "/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        })
            .then(res => res.json())
            .then(
            (result) => {
                let rt = null;
                if(result.status !== 403) {
                    rt = result;
                }
                return rt;
            },
            (error) => {
                // Nothing yet...
            }
        );
    };

    static deleteServerById(akey, id) {
        return fetch(ServerApi.API_URL + "Servers/" + akey + "/delete/" + id, {
            method: 'DELETE',
        }).then(
            (result) => {
                if(result.status !== 204) {
                    return false;
                }
                return true;
            },
            (error) => {
                // Nothing yet...
            }
        );
    }


}

export default ServerApi;