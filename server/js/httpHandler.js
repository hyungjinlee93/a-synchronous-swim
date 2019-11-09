const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQ = require('./messageQueue');
// Path for the background image ///////////////////////
module.exports.backgroundImageFile = bgImg = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

module.exports.router = (req, res, next = ()=>{}) => {
  console.log(req.url === '/');
  if (req.url === bgImg || req.url === '/') {
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    res.writeHead(200, headers);
    if(req.method === 'GET') {
      res.end(messageQ.dequeue());
    } else {
      res.end();
    }
  } else {
    res.writeHead(404);
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
