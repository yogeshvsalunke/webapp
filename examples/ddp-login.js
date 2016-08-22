var DDP = require('ddp');
var login = require('ddp-login');
 
token = null;
 
// Assume connected ddpClient, see above... 

var ddpClient = new DDP({
  host: "https://test.kloojj.com/backend",
  port: 443
});
 
 var user = "gTzsGsg9qnfpLZHBk";
 var pass = "anzu@123";
 
// Resume login with valid token from previous login
/*  
login.loginWithToken(ddpClient, token, function (err, userInfo) {
  if (err) throw err;
  token = userInfo.token;
}); */
 
// Login using a username 
/*
login.loginWithUsername(ddpClient, user, pass, function (err, userInfo) {
  if (err) throw err;
  token = userInfo.token;
});
 */
 
// Login using an email address 
/* login.loginWithEmail(ddpClient, email, pass, function (err, userInfo) {
  if (err) throw err;
  token = userInfo.token;
}); */
 
// Login using either a username or email address 
/* login.loginWithAccount(ddpClient, userOrEmail, pass, function (err, userInfo) {
  if (err) throw err;
  token = userInfo.token;
}); */


login.loginWithUsername(ddpClient, user, pass, function (err, userInfo) {
  if (err) throw err;
  token = userInfo.token;
});
 
 
 