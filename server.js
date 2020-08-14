const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 6789

const server = http.createServer(app);

server.listen(PORT);
