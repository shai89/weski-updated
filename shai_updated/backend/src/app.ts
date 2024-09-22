import express from 'express';
import cors from 'cors';
import hotelSearchController from './controllers/hotelSearchController';
import {wss, wsClients} from './websocket';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

wss.on('connection', function connection(ws: any) {
  ws.on('message', function incoming(clientId: string) {
    if (clientId) {
      wsClients[clientId] = ws;
      console.log(`WebSocket connection established for requestId: ${clientId}`);
    }
  });
});


app.use('/hotels', hotelSearchController);

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('upgrade', function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws: any) {
    wss.emit('connection', ws, request);
  });
});