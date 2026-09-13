const { timeStamp } = require('console');
const http = require('http');
const os = require('os');
const { uptime } = require('process');
const users = [
  { id: 1, name: 'Youssef' },
  { id: 2, name: 'Ahmed' },
  { id: 3, name: 'Omar' }
];
const server = http.createServer((req, res) => {

    console.log(req.method);
    console.log(req.url);
    
    if (req.method === 'GET' && req.url === '/'){

        res.writeHead(200, {
            'content-type':'application/json'
        });
        res.end(JSON.stringify({message:"hello elevvo"}));
          return;
    }
    if (req.method === 'GET' && req.url === '/api/users'){

        res.writeHead(200, {
            'content-type':'application/json'
        });
        res.end(JSON.stringify(users));
          return;
    }
    if (req.method === 'GET' && req.url === '/api/health'){

        res.writeHead(200, {
            'content-type':'application/json'
        });
        res.end(JSON.stringify({
            uptime: process.uptime(),
            platform: os.platform(),
            timeStamp: new Date().toISOString()
        }));
          return;

    }
    res.writeHead(404, {
        'content-type':'application/json'
    });
    res.end(JSON.stringify({error:'route not found'}));
});

server.listen(3000);
