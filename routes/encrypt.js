/**
 * Created by devios on 4/01/17.
 */
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
// var name = 'd';
// var hash = crypto.createHash('md5').update(name).digest('hex');
// console.log(hash);
//
// var sha1 = require('sha1');
// // var hash = sha1("my message");
// var un = sha1(hash);
// console.log(un);
//
// var md5 = require('md5');
//
// var otro = md5(hash);
// console.log(otro);

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}
//
// var hw = encrypt("hello world");
// // outputs hello world
// console.log(decrypt("0c8bd89c2e316f7f2245e0"));
