const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });
const wsClients:any = {};
export {wss, wsClients};