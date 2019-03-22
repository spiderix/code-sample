import * as http from 'http';
import app from './app'

const port = 8000;
const server = http.createServer(app);

server.listen(port);
server.on('listening', ()=>{
  console.log(`Listening on port ${port}`)
})