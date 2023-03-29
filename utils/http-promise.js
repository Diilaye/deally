const https = require('http');
const axios = require('axios').default;

exports.asyncGet = async (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, async (resp) => {
            let body = new Buffer.from([]);
            resp.on('data', (data) => {
                body = Buffer.concat([body, data]);

            });
            resp.on('end', () => {

                resolve({
                    body: JSON.parse(body.toString('utf-8')).data,
                });


            });
        }).on('error', (e) => {
            reject(e)
            console.log(`Got error: ${e.message}`);
        });
    });
}

exports.asyncPost = async (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, async (resp) => {
            let body = new Buffer.from([]);
            resp.on('data', (data) => {
                body = Buffer.concat([body, data]);

            });
            resp.on('end', () => {
                console.log(body.toString('utf-8'));
                resolve({
                    body: JSON.parse(body.toString('utf-8')),
                });


            });
        }).on('error', (e) => {
            reject(e)
            console.log(`Got error: ${e.message}`);
        });
    });
}