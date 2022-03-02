require('dotenv').config();

const port = process.env.PORT || 3000;
const server = require('./app');

server.listen(port);
console.log(`Òn port ${port} !`);