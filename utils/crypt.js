const  crypto = require('crypto');

exports.SHA256Encrypt = (password) =>  {

    
    let sha256 = crypto.createHash('sha256');
    sha256.update(password);
    return sha256.digest('hex');
}
