const axios = require('axios');
const qs = require('qs');


let data = qs.stringify({
    'client_id': '1t0jWImm2YWpTGr8dOvJteMAQa7d5zEn',
    'client_secret': 'DYQmcsWGA6Kfv0PC',
    'grant_type': 'client_credentials' 
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: ' https://api.orange.com/orange-money-webpay/dev/v1',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

  module.exports = async (req,res,next) => {
    axios.request(config)
    .then((responseData) => {
        req.tokenOM =  responseData.data['access_token'];
        console.log(JSON.stringify(responseData.data));
        // return res.json(req.tokenOM)
        next();
    })
    .catch((error) => {
    console.log(error);
    res.json({
        message: 'unauthorized authentication required',
        statusCode: 401,
        data: error,
        status: 'NOT OK'
    });
    });
  }