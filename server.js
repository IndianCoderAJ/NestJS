const http = require('http');
const app = require('./app');

let server = http.createServer(app);
let PORT = process.env.PORT || 3000
server.listen(PORT, () => {
 console.log(`Server is running on ${PORT} `);
});

