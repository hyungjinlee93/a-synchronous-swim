const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQ = require('./messageQueue');
// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

module.exports.router = (req, res, next = ()=>{}) => {
  if (req.method === 'GET'){
    if (req.url === '/' || req.url === '/background.jpg') {
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
      if (req.url === '/') {
        res.writeHead(200, headers);
        dir = messageQ.dequeue();
        res.end(dir);
      } else if (req.url === '/background.jpg') {
        fs.readFile(module.exports.backgroundImageFile, (err, data) => {
          if (err) {
            res.writeHead(404, headers);
          } else {
            res.writeHead(200, headers);
            res.write(data, 'binary');
          }
          res.end();
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    }
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  if (req.method === 'POST') {
    if(req.url === '/background.jpg') {
      let dataFile = Buffer.alloc(0);
      req.on('data', (chunk) => {
        dataFile = Buffer.concat([dataFile, chunk]);
      });
      req.on('end', () => {
        let data = multipart.getFile(dataFile);
        fs.writeFile(module.exports.backgroundImageFile, data.data, (err) => {
          if(err) {
            res.writeHead(404);
          } else {
            res.writeHead(201, headers);
          }
          res.end();
          next();
        })
      })
    } else {
      res.writeHead(404);
      res.end();
    }
  }
  next(); // invoke next() at the end of a request to help with testing!
};
